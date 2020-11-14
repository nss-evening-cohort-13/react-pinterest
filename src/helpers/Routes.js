import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from '../views/Home';
import BoardForm from '../views/BoardForm';
import Boards from '../views/Boards';
import PinDetails from '../views/PinDetails';
import PinForm from '../views/PinForm';
import Pins from '../views/Pins';
import SingleBoard from '../views/SingleBoard';
import NotFound from '../views/NotFound';

export default function Routes({ authed }) {
  return (
    <Router>
      <Switch>
        <Route
          exact
          path='/'
          component={() => <Home authed={authed} name='Dr. T' />}
        />
        <Route
          exact
          path='/pin-details'
          component={() => <PinDetails authed={authed} name='Dr. T' />}
        />
        <Route
          exact
          path='/pins'
          component={() => <Pins authed={authed} name='Dr. T' />}
        />
        <Route
          exact
          path='/pin-form'
          component={() => <PinForm authed={authed} name='Dr. T' />}
        />
        <Route
          exact
          path='/single-board'
          component={() => <SingleBoard authed={authed} name='Dr. T' />}
        />
        <Route
          exact
          path='/board-form'
          component={() => <BoardForm authed={authed} name='Dr. T' />}
        />
        <Route
          exact
          path='/boards'
          component={() => <Boards authed={authed} name='Dr. T' />}
        />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}
