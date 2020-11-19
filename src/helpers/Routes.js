import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from '../views/Home';
import Boards from '../views/Boards';
import PinDetails from '../views/PinDetails';
import PinForm from '../views/PinForm';
import Pins from '../views/Pins';
import SingleBoard from '../views/SingleBoard';
import NotFound from '../views/NotFound';
import SearchResults from '../views/SearchResults';

const PrivateRoute = ({ component: Component, user, ...rest }) => {
  const routeChecker = (props) => (user
    ? (<Component {...props} />)
    : (<Redirect to={{ pathname: '/', state: { from: props.location } }} />));
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

export default function Routes({ user }) {
  return (
      <Switch>
        <Route
          exact
          path='/'
          component={() => <Home user={user} />}
        />
        <PrivateRoute
          exact
          path='/pin-details'
          component={() => <PinDetails user={user} />}
          user={user}
        />
        <PrivateRoute
          exact
          path='/pins'
          component={() => <Pins user={user} />}
          user={user}
        />
        <PrivateRoute
          exact
          path='/pin-form'
          component={() => <PinForm user={user} />}
          user={user}
        />
        <PrivateRoute
          exact
          path='/boards/:id'
          component={(props) => <SingleBoard user={user} {...props} />}
          user={user}
        />
        <PrivateRoute
          exact
          path='/search/:term/:type'
          component={(props) => <SearchResults {...props} />}
          user={user}
        />
        <PrivateRoute
          exact
          path='/boards'
          component={() => <Boards user={user} />}
          user={user}
        />
        <Route component={NotFound} />
      </Switch>
  );
}
