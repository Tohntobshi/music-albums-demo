import { Observable, of, timer, asyncScheduler } from "rxjs";
import {
  pluck,
  mapTo,
  debounceTime,
  skip,
  distinctUntilChanged,
} from "rxjs/operators";
import { StateObservable } from "redux-observable";
import { Action } from "redux";
import { RootState, Album } from ":types";
import { ActionCreators } from ":actions";

function getSavedAlbums(): Album[] {
  try {
    return JSON.parse(localStorage.getItem("savedAlbums"));
  } catch (e) {
    return [];
  }
}

export const persistSavedAlbums = (
  action$: Observable<Action>,
  state$: StateObservable<RootState>,
): Observable<Action> => {
  // subscribe to saved albums changes and save it to local storage every time
  state$.pipe(
    pluck("savedAlbums"),
    debounceTime(1500),
    distinctUntilChanged(),
    skip(1),
  ).subscribe((data: Album[]) => {
    try {
      localStorage.setItem("savedAlbums", JSON.stringify(data));
    } catch (e) {
      // nothing to do then
    }
  });
  // dispatch saved albums once in the beginning
  const savedAlbums = getSavedAlbums();
  return of(ActionCreators.putSavedAlbums(savedAlbums), asyncScheduler);
};
