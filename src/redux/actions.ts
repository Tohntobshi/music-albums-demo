import { Album } from ":types";

export const Actions = {
  CHANGE_TEXT_TO_SEARCH: "CHANGE_TEXT_TO_SEARCH",
  CHANGE_ERROR_TEXT: "CHANGE_ERROR_TEXT",
  SWITCH_PENDING: "SWITCH_PENDING",
  REQUEST_ALBUMS: "REQUEST_ALBUMS",
  SAVE_ALBUM: "SAVE_ALBUM",
  REMOVE_ALBUM: "REMOVE_ALBUM",
  PUT_FOUND_ALBUMS: "PUT_FOUND_ALBUMS",
};

export const ActionCreators = {
  requestAlbums: () => ({ type: Actions.REQUEST_ALBUMS }),
  saveAlbum: (id: string) => ({ type: Actions.SAVE_ALBUM, id }),
  removeAlbum: (id: string) => ({ type: Actions.REMOVE_ALBUM, id }),
  changeTextToSearch: (text: string) => ({ type: Actions.CHANGE_TEXT_TO_SEARCH, text }),
  changeErrorText: (text: string) => ({ type: Actions.CHANGE_ERROR_TEXT, text }),
  switchPending: (state: boolean) => ({ type: Actions.SWITCH_PENDING, state }),
  putFoundAlbums: (albums: Album[]) => ({ type: Actions.PUT_FOUND_ALBUMS, albums }),
};
