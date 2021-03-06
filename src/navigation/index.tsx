import * as React from "react";
import { Router, Route, Link } from "react-router-dom";
import { createBrowserHistory } from "history";
import Search from ":scenes/Search";
import Saved from ":scenes/Saved";
import NavBar from ":components/NavBar";
import VerticalAdjuster from ":components/VerticalAdjuster";

export const history = createBrowserHistory();

export const Navigator = () => (
  <VerticalAdjuster>
    <Router history={history}>
      <div>
        <NavBar />
        <Route path="/" exact component={Search} />
        <Route path="/saved" exact component={Saved} />
      </div>
    </Router>
  </VerticalAdjuster>
);
