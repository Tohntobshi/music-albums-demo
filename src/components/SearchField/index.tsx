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
  <form
    className={classnames([styles.container, props.className])}
    onSubmit={(e) => {
      e.preventDefault();
      props.onSubmit();
    }}
  >
    <input
      type="text"
      value={props.value}
      onChange={(e) => props.onChange(e.target.value)}
      className={styles.input}
    />
    <button
      type="submit"
      className={styles.submitButton}
    />
  </form>
);
