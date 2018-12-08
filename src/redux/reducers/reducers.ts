import { RootState, Album } from ":types";
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

export const saveAlbum = (
  state: RootState,
  action: ReturnType<typeof ActionCreators.saveAlbum>,
): RootState => {
  const albumToSave = state.foundAlbums.find((el: Album) => el.id === action.id);
  if (!albumToSave) { return state; }
  if (state.savedAlbums.findIndex((el: Album) => el.id === action.id) > -1) { return state; }
  return {
    ...state,
    savedAlbums: [ ...state.savedAlbums, albumToSave ],
  };
};

export const removeAlbum = (
  state: RootState,
  action: ReturnType<typeof ActionCreators.saveAlbum>,
): RootState => ({
  ...state,
  savedAlbums: state.savedAlbums.filter((el: Album) => el.id !== action.id),
});
