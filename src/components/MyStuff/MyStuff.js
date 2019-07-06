import React from 'react';
import Thing from '../Thing/Thing';

import stuffData from '../../helpers/data/stuffData';

import './MyStuff.scss';

class MyStuff extends React.Component {
  state = {
    stuff: [],
    singleThing: {},
  }

  getStuffData = () => {
    stuffData.getStuff()
      .then(stuff => this.setState({ stuff }))
      .catch(err => console.error('can not get stuff', err));
  }

  getSingleThingData = (thingId) => {
    stuffData.getSingleThing(thingId)
      .then(singleThing => this.setState({ singleThing }))
      .catch(err => console.error('trouble with single item', err));
  }

  componentDidMount() {
    this.getStuffData();
  }

  editTheStuff = (e) => {
    e.preventDefault();
    const stuffId = '12345';
    this.props.history.push(`/edit/${stuffId}`);
  }


  viewSinglePage = (thingId) => {
    this.props.history.push(`/stuff/${thingId}`);
    this.getSingleThingData(thingId);
    console.error(this.state.singleThing);
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
      viewSinglePage={this.viewSinglePage}
      />
    ));

    return (
      <div className="MyStuff">
        <h1>My Stuff!</h1>
        {/* <button className="btn btn-success" onClick={this.editTheStuff}>Edit</button>
        <button className="btn btn-info" onClick={this.viewSinglePage}>Single</button> */}
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
