import React from 'react';
import Home from './home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </Router>
  );
};
export default Routes;
