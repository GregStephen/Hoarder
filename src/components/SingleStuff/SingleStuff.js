import React from 'react';
import { Link } from 'react-router-dom';
import stuffData from '../../helpers/data/stuffData';

import './SingleStuff.scss';


class SingleStuff extends React.Component {
  state = {
    thing: {},
  }

  componentDidMount() {
    const thingId = this.props.match.params.id;
    stuffData.getSingleThing(thingId)
      .then(thing => this.setState({ thing }))
      .catch(err => console.error('can not get single thing', err));
  }

  deleteThisThingFromDB = () => {
    const thingId = this.props.match.params.id;
    stuffData.deleteThisThingFromDataBase(thingId)
      .then(() => this.props.history.push('/home'))
      .catch(err => console.error('trouble deleting thing', err));
  }

  render() {
    const { thing } = this.state;
    const editLink = `/edit/${this.props.match.params.id}`;
    return (
      <div className="SingleStuff col-6 mt-5">
        <div className="card">
          <img src={thing.itemImage} className="product-image card-img-top" alt="..."></img>
          <h2 className="card-title">{thing.itemName}</h2>
          <p className="card-text">{thing.itemDescription}</p>
          <button className="btn btn-danger" onClick={this.deleteThisThingFromDB}>Delete</button>
          <Link className="btn btn-outline-info single-btn" to={editLink}>Edit</Link>
        </div>
      </div>
    );
  }
}

export default SingleStuff;
