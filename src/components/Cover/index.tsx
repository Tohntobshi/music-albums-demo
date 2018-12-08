import * as React from "react";
import classnames from "classnames";
const styles = require("./styles.scss");
const defaultCover = require(":images/default-cover.svg");

interface Props {
  source: string;
  size: number;
}

interface State {
  loaded: boolean;
}

export default class extends React.PureComponent<Props, State> {
  public state = {
    loaded: false,
  };
  public render() {
    const { source, size } = this.props;
    return (
      <div className={styles.container} style={{ width: size, height: size }}>
        <img
          className={styles.defaultCover}
          src={defaultCover}
          style={{ width: size, height: size }}
          draggable={false}
        />
        {
          source &&
          <img
            src={source}
            className={classnames(styles.cover, this.state.loaded && styles.loaded)}
            style={{ width: size, height: size }}
            onLoad={() => this.setState({ loaded: true })}
            draggable={false}
          />
        }
      </div>
    );
  }
}
