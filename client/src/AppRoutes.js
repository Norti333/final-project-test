import React from "react";
import { Switch, Route } from "react-router-dom";
import FinalProject from "./FinalProject";

const AppRoutes = props => {
  return (
    <div className="container">
      <Switch>
        <Route name="home" exact path="/" component={FinalProject} />
      </Switch>
    </div>
  );
};

export default AppRoutes;
