import * as React from "react";
const styles = require("./styles.scss");

export const TemplateComponent = () => (
  <div className={styles.container}>
    <p>hello world</p>
    <img src={require(":images/cat.jpg")} />
  </div>
);
