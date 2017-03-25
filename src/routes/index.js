/* eslint-disable no-console */
import React from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import asyncRoute from './async-route';
import Root from '../containers/root';
import Header from '../components/header';

const Routes = () => (
  <Router>
    <Root>
      <Header />
      <Route
        exact
        path="/"
        component={asyncRoute(() => System.import('../components/home'))}
      />
    </Root>
  </Router>
);

export default Routes;
