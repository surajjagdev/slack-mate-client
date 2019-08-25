import React from 'react';
import Home from './home';
import Register from './register.js';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
      </Switch>
    </Router>
  );
};
export default Routes;
