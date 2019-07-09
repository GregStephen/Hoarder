import React from 'react';
import Thing from '../Thing/Thing';

import stuffData from '../../helpers/data/stuffData';

import './MyStuff.scss';

class MyStuff extends React.Component {
  state = {
    stuff: [],
  }

  getStuffData = () => {
    stuffData.getStuff()
      .then(stuff => this.setState({ stuff }))
      .catch(err => console.error('can not get stuff', err));
  }

  componentDidMount() {
    this.getStuffData();
  }

  editTheStuff = (e) => {
    e.preventDefault();
    const stuffId = '12345';
    this.props.history.push(`/edit/${stuffId}`);
  }

  deleteThisThingFromDB = (thingId) => {
    stuffData.deleteThisThingFromDataBase(thingId)
      .then(() => this.getStuffData())
      .catch(err => console.error('trouble deleting thing', err));
  }

  render() {
    const { stuff } = this.state;
    const showStuff = stuff.map(thing => (
      <Thing
      key={ thing.id }
      thing={ thing }
      deleteThisThingFromDB={this.deleteThisThingFromDB}
      />
    ));

    return (
      <div className="MyStuff">
        <h1>My Stuff!</h1>
        <div className="container">
          <div className="row">
            {showStuff}
          </div>
        </div>
      </div>
    );
  }
}

export default MyStuff;
