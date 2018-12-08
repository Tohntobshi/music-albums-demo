import { combineEpics } from "redux-observable";
import { requestAlbums } from "./requestAlbums";
import { persistSavedAlbums } from "./persistSavedAlbums";

export default combineEpics(
  requestAlbums,
  persistSavedAlbums,
);
