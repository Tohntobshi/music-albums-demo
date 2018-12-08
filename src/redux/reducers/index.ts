import { createReducer } from "reduxsauce";
import { RootState } from ":types";
import { Actions } from ":actions";
import {
  changeTextToSearch,
  putFoundAlbums,
  switchPending,
  changeErrorText,
  saveAlbum,
  removeAlbum,
} from "./reducers";

export const INITIAL_STATE: RootState = {
  textToSearch: "",
  searchPending: false,
  errorText: "Search something",
  foundAlbums: [],
  savedAlbums: [],
};

const HANDLERS = {
  [Actions.CHANGE_TEXT_TO_SEARCH]: changeTextToSearch,
  [Actions.PUT_FOUND_ALBUMS]: putFoundAlbums,
  [Actions.SWITCH_PENDING]: switchPending,
  [Actions.CHANGE_ERROR_TEXT]: changeErrorText,
  [Actions.SAVE_ALBUM]: saveAlbum,
  [Actions.REMOVE_ALBUM]: removeAlbum,
};

export default createReducer(INITIAL_STATE, HANDLERS);
