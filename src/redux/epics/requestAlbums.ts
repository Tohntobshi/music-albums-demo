import { Observable, of, never, concat, from } from "rxjs";
import {
  pluck,
  switchMap,
  tap,
  takeUntil,
  catchError,
  withLatestFrom,
  mergeMap,
  mapTo,
  map,
  take,
  reduce,
} from "rxjs/operators";
import { StateObservable, ofType } from "redux-observable";
import * as R from "ramda";
import { Action } from "redux";
import { Actions, ActionCreators } from ":actions";
import { RootState, Album } from ":types";
import { getAlbums, getCover } from "../../api";

export const requestAlbums = (
  action$: Observable<Action>,
  state$: StateObservable<RootState>,
): Observable<Action> => action$.pipe(
  // take action REQUEST_ALBUMS and transform it to textToSearch from the store
  ofType(Actions.REQUEST_ALBUMS),
  withLatestFrom(state$),
  pluck("1", "textToSearch"),
  // transform observable of text to observable of actions
  switchMap((textToSearch: string) => {
    return concat(
      // clear old results and switch pending flag to true
      of(ActionCreators.switchPending(true), ActionCreators.putFoundAlbums([])),
      // request albums
      getAlbums(textToSearch).pipe(
        switchMap((albums: Album[]) => {
          return from(albums).pipe(
            // request cover for each album
            mergeMap((album: Album) => {
              return getCover(album.id).pipe(
                map((cover: string) => ({ ...album, cover })),
                catchError((e: any) => of(album)),
              );
            }),
            // gather asyncronous values back to an array
            take(albums.length),
            reduce((acc: Album[], cur: Album) => [...acc, cur], []),
          );
        }),
        // sort albums according to search score
        map(R.sort((a: Album, b: Album) => a.searchScore < b.searchScore ? 1 : -1)),
        // transform albums to action
        map((albums: Album[]) => {
          if (albums.length > 0) {
            return ActionCreators.putFoundAlbums(albums);
          } else {
            return ActionCreators.changeErrorText("Nothing was found");
          }
        }),
        // dispatch error action if request failed
        catchError((e) => of(ActionCreators.changeErrorText("Something went wrong"))),
      ),
      // switch pending flag to false
      of(ActionCreators.switchPending(false)),
    );
  }),
);
