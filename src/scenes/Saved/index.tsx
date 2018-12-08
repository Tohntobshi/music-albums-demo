import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators} from "redux";
import { ActionCreators } from ":actions";
import { RootState, Album } from ":types";
import Gallery, { Position } from ":components/Gallery";
import { Subject, Subscription } from "rxjs";
import { debounceTime, throttleTime, tap } from "rxjs/operators";
const styles = require("./styles.scss");

interface Props {
  savedAlbums: Album[];
  removeAlbum: (id: string) => void;
}

class Saved extends React.PureComponent<Props, Position> {
  private postitionSubscription: Subscription;
  private positionUpdates$ = new Subject<Position>();
  public state = {
    position: 0,
    maxPosition: 0,
  };
  public componentDidMount() {
    this.postitionSubscription = this.positionUpdates$.pipe(
      throttleTime(300),
    ).subscribe((position) => this.setState(position));
  }
  public componentWillUnmount() {
    this.postitionSubscription.unsubscribe();
  }
  public render() {
    return (
      <div className={styles.container}>
        <Gallery savedAlbums={this.props.savedAlbums} onMove={(position) => this.positionUpdates$.next(position)} />
      </div>
    );
  }
}

const mapStateToProps = ({ savedAlbums }: RootState) => ({
  savedAlbums,
});

const mapDispatchToProps = (dispatch: any) => bindActionCreators({
  removeAlbum: ActionCreators.removeAlbum,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Saved);
