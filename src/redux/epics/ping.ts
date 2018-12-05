import { Observable, of, never } from "rxjs";
import { pluck, debounceTime, distinctUntilChanged, switchMap, tap, takeUntil, catchError } from "rxjs/operators";
import { StateObservable, ofType } from "redux-observable";
import { Action } from "redux";
import { Actions, ActionCreators } from ":actions";
import { RootState } from ":types";

export const epic = (action$: Observable<Action>, store$: StateObservable<RootState>): Observable<Action> => {
  return of();
};
