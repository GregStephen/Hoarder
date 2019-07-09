import React from 'react';
import { Link } from 'react-router-dom';
import './Home.scss';


class Home extends React.Component {
  render() {
    return (
      <div className="Home">
        <h1>HOME</h1>
        <Link className="btn btn-info" to={'/stuff'}>My Stuff</Link>
        <Link className="btn btn-info ml-5" to={'/new'}>New Stuff</Link>
      </div>
    );
  }
}

export default Home;
