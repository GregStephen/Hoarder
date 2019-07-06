import React from 'react';
import firebase from 'firebase/app';

import './Auth.scss';

class Auth extends React.Component {
  logInClickEvent = (e) => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }

  render() {
    return (
      <div className="Auth">
        <button className="btn btn-outline-info" onClick={this.logInClickEvent}>Log In With GOOGLE</button>
      </div>
    );
  }
}

export default Auth;
