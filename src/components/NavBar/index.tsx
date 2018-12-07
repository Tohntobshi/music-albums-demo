import * as React from "react";
import { NavLink } from "react-router-dom";
const styles = require("./styles.scss");

export default () => (
  <div className={styles.container}>
    <NavLink className={styles.button} to="/" exact activeClassName={styles.active}>SEARCH</NavLink>
    <NavLink className={styles.button} to="/saved" activeClassName={styles.active}>SAVED</NavLink>
  </div>
);
