import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import PlantsPage from "./components/PlantsPage";
import { PrivateRoute } from "./components/PrivateRoute";
import Login from "./components/Login";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/login" component={Login} />
          <PrivateRoute path="/plants" component={PlantsPage} />
          <Route path="/" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
