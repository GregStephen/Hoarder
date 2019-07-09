import React from 'react';
import {
  BrowserRouter, Route, Redirect, Switch,
} from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import fbConnection from '../helpers/data/fbConnection';
import Home from '../components/Home/Home';
import Auth from '../components/Auth/Auth';
import NewStuff from '../components/NewStuff/NewStuff';
import MyStuff from '../components/MyStuff/MyStuff';
import Edit from '../components/Edit/Edit';
import SingleStuff from '../components/SingleStuff/SingleStuff';
import MyNavbar from '../components/MyNavbar/MyNavbar';

import './App.scss';

fbConnection();

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (authed === true
    ? (<Component {...props} />)
    : (<Redirect to={{ pathname: '/auth', state: { from: props.location } }}/>)
  );
  return <Route {...rest} render={props => routeChecker(props)}/>;
};

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (authed === false
    ? (<Component {...props} />)
    : (<Redirect to={{ pathname: '/home', state: { from: props.location } }}/>)
  );
  return <Route {...rest} render={props => routeChecker(props)}/>;
};


class App extends React.Component {
  state = {
    authed: false,
  }

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
      <div className="App">
        <BrowserRouter>
          <React.Fragment>
            <MyNavbar authed={authed} />
            <div className="container">
              <div className="row justify-content-center">
                <Switch>
                  <PublicRoute path='/auth' component={Auth} authed={authed}/>
                  <PrivateRoute path='/home' component={Home} authed={authed}/>
                  <PrivateRoute path='/new' component={NewStuff} authed={authed}/>
                  <PrivateRoute path='/stuff' component={MyStuff} authed={authed}/>
                  <PrivateRoute path='/thing/:id' component={SingleStuff} authed={authed}/>
                  <PrivateRoute path='/edit/:id' component={Edit} authed={authed}/>
                  <Redirect from='*' to="/auth" />
                </Switch>
              </div>
            </div>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
