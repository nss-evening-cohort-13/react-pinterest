import React from 'react';
import firebase from 'firebase/app';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import fbConnection from '../helpers/data/connection';

import MyNavbar from '../components/MyNavbar';

import Home from '../views/Home';
import BoardForm from '../views/BoardForm';
import Boards from '../views/Boards';
import PinDetails from '../views/PinDetails';
import PinForm from '../views/PinForm';
import Pins from '../views/Pins';
import SingleBoard from '../views/SingleBoard';
import NotFound from '../views/NotFound';

fbConnection();

class App extends React.Component {
  state = {
    authed: false,
  };

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const { authed } = this.state;

    return (
      <div className='App'>
        <MyNavbar authed={authed} />
        <Router>
          <Switch>
            <Route exact path='/' component={() => <Home authed={authed} name='Dr. T' />} />
            <Route exact path='/pin-details' component={() => <PinDetails authed={authed} name='Dr. T' />} />
            <Route exact path='/pins' component={() => <Pins authed={authed} name='Dr. T' />} />
            <Route exact path='/pin-form' component={() => <PinForm authed={authed} name='Dr. T' />} />
            <Route exact path='/single-board' component={() => <SingleBoard authed={authed} name='Dr. T' />} />
            <Route exact path='/board-form' component={() => <BoardForm authed={authed} name='Dr. T' />} />
            <Route exact path='/boards' component={() => <Boards authed={authed} name='Dr. T' />} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
