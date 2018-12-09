import * as React from "react";
import classnames from "classnames";
const styles = require("./styles.scss");

interface Props {
  className?: string;
  position: number;
  maxPosition: number;
}

export default ({ position, maxPosition, className }: Props) => (
  <div className={classnames([styles.container, className])}>
    <div className={styles.indicator} style={{ left: maxPosition > 0 ? `${position / maxPosition * 92}%` : "46%" }}/>
  </div>
);
