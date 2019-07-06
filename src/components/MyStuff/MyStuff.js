import React from 'react';

import './MyStuff.scss';

class MyStuff extends React.Component {
  editTheStuff = (e) => {
    e.preventDefault();
    const stuffId = '12345';
    this.props.history.push(`/edit/${stuffId}`);
  }

  viewSinglePage = (e) => {
    e.preventDefault();
    const stuffId = '12345';
    this.props.history.push(`/stuff/${stuffId}`);
  }

  render() {
    return (
      <div className="MyStuff">
        <h1>My Stuff!</h1>
        <button className="btn btn-success" onClick={this.editTheStuff}>Edit</button>
        <button className="btn btn-info" onClick={this.viewSinglePage}>Single</button>
      </div>
    );
  }
}

export default MyStuff;
