import { combineEpics } from "redux-observable";
import { requestAlbums } from "./requestAlbums";

export default combineEpics(
  requestAlbums,
);
