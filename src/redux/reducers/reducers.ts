import { RootState } from ":types";
import { ActionCreators } from ":actions";

export const changeTextToSearch = (
  state: RootState,
  action: ReturnType<typeof ActionCreators.changeTextToSearch>,
): RootState => ({
  ...state,
  textToSearch: action.text,
});

export const changeErrorText = (
  state: RootState,
  action: ReturnType<typeof ActionCreators.changeErrorText>,
): RootState => ({
  ...state,
  errorText: action.text,
});

export const putFoundAlbums = (
  state: RootState,
  action: ReturnType<typeof ActionCreators.putFoundAlbums>,
): RootState => ({
  ...state,
  foundAlbums: action.albums,
});

export const switchPending = (
  state: RootState,
  action: ReturnType<typeof ActionCreators.switchPending>,
): RootState => ({
  ...state,
  searchPending: action.state,
});
