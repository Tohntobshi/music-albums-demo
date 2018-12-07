import * as React from "react";
import { NavLink } from "react-router-dom";
import classnames from "classnames";
const styles = require("./styles.scss");

interface Props {
  className?: object;
}

export default (props: Props) => (
  <div className={classnames([styles.container, props.className])}>
  </div>
);
