import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators} from "redux";
import { ActionCreators } from ":actions";
import { RootState } from ":types";
import SearchField from ":components/SearchField";
const styles = require("./styles.scss");

interface Props {
  textToSearch: string;
  requestAlbums: () => void;
  saveAlbum: (id: string) => void;
  removeAlbum: (id: string) => void;
  changeTextToSearch: (newVal: string) => void;
}

const Search = (props: Props) => (
  <div className={styles.container}>
    <SearchField value={props.textToSearch} onChange={props.changeTextToSearch} onSubmit={props.requestAlbums} />
  </div>
);

const mapStateToProps = ({ textToSearch }: RootState) => ({
  textToSearch,
});

const mapDispatchToProps = (dispatch: any) => bindActionCreators({
  requestAlbums: ActionCreators.requestAlbums,
  saveAlbum: ActionCreators.saveAlbum,
  removeAlbum: ActionCreators.removeAlbum,
  changeTextToSearch: ActionCreators.changeTextToSearch,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Search);
