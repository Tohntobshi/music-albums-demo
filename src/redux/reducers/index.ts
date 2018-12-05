import { createReducer } from "reduxsauce";
import { RootState } from ":types";
import { Actions } from ":actions";

export const INITIAL_STATE: RootState = {
  textToSearch: "",
  errorText: "",
  foundAlbums: [],
  savedAlbums: [],
};

const HANDLERS = {
};

export default createReducer(INITIAL_STATE, HANDLERS);
