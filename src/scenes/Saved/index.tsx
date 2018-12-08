import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from ":actions";
import { RootState, Album } from ":types";
import Gallery, { Position } from ":components/Gallery";
import Indicator from ":components/Inducator";
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
      // throttleTime(30),
    ).subscribe((position) => this.setState(position));
  }
  public componentWillUnmount() {
    this.postitionSubscription.unsubscribe();
  }
  public render() {
    const { position, maxPosition } = this.state;
    const { savedAlbums, removeAlbum } = this.props;
    const index = Math.round((Math.max(0, (position - 160)) / maxPosition) * savedAlbums.length) || 0;
    const album = savedAlbums[index];
    return (
      <div className={styles.container}>
        {
          savedAlbums.length > 0 ?
            <React.Fragment>
              <Gallery
                savedAlbums={this.props.savedAlbums}
                onMove={(pos) => this.positionUpdates$.next(pos)}
                onRemove={removeAlbum}
              />
              <div className={styles.info}>
                {
                  album &&
                  <React.Fragment>
                    <p>{album.title}</p>
                    <p>{album.artist}</p>
                    <p>{new Date(album.date).getFullYear() || ""}</p>
                    <p>{album.country}</p>
                    <p>Tracks: {album.trackCount}</p>
                  </React.Fragment>
                }
              </div>
              <Indicator className={styles.indicator} position={position} maxPosition={maxPosition} />
            </React.Fragment> :
            <p className={styles.nothing}>Nothing is saved yet</p>
        }
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
