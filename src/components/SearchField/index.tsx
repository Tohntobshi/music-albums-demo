import * as React from "react";
import { NavLink } from "react-router-dom";
import classnames from "classnames";
const styles = require("./styles.scss");

interface Props {
  value: string;
  onChange: (newVal: string) => void;
  onSubmit: () => void;
  className?: object;
}

export default (props: Props) => (
  <div className={classnames([styles.container, props.className])}>
    <input
      type="text"
      value={props.value}
      onChange={(e) => props.onChange(e.target.value)}
      className={styles.input}
    />
    <button
      className={styles.submitButton}
      onClick={props.onSubmit}
    ></button>
  </div>
);
