import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators} from "redux";
import { ActionCreators } from ":actions";
import { RootState, Album } from ":types";
import SearchField from ":components/SearchField";
import SearchList from ":components/SearchList";
const styles = require("./styles.scss");

interface Props extends RootState {
  requestAlbums: () => void;
  saveAlbum: (id: string) => void;
  removeAlbum: (id: string) => void;
  changeTextToSearch: (newVal: string) => void;
}

const Search = ({
  textToSearch,
  changeTextToSearch,
  requestAlbums,
  savedAlbums,
  foundAlbums,
  saveAlbum,
  removeAlbum,
  searchPending,
  errorText,
}: Props) => (
  <div className={styles.container}>
    <SearchField value={textToSearch} onChange={changeTextToSearch} onSubmit={requestAlbums} />
    {
      (errorText || searchPending) &&
      <div className={styles.statusContainer}>
        { searchPending && <img className={styles.searchPending} src={require(":images/oval.svg")} />}
        { errorText && <p className={styles.alertText}>{errorText}</p>}
      </div>
    }
    <SearchList
      className={styles.searchList}
      foundAlbums={foundAlbums} savedAlbums={savedAlbums}
      onSave={saveAlbum} onRemove={removeAlbum}
    />
  </div>
);

const mapStateToProps = (state: RootState) => state;

const mapDispatchToProps = (dispatch: any) => bindActionCreators({
  requestAlbums: ActionCreators.requestAlbums,
  saveAlbum: ActionCreators.saveAlbum,
  removeAlbum: ActionCreators.removeAlbum,
  changeTextToSearch: ActionCreators.changeTextToSearch,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Search);
