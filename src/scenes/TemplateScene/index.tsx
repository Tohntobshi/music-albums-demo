import * as React from "react";
import { TemplateComponent } from ":components/TemplateComponent";
const styles = require("./styles.scss");

export const TemplateScene = () => (
  <div className={styles.container}>
    <TemplateComponent />
  </div>
);
