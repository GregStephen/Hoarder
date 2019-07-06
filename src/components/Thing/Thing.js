import React from 'react';

import './Thing.scss';

class Thing extends React.Component {
  viewSingleThing = (e) => {
    e.preventDefault();
    const { thing, viewSinglePage } = this.props;
    viewSinglePage(thing.id);
  }

  deleteThisThing = (e) => {
    e.preventDefault();
    const { thing, deleteThisThingFromDB } = this.props;
    deleteThisThingFromDB(thing.id);
  }

  render() {
    const { thing } = this.props;
    return (
      <div className="Thing col-12 col-md-6 mb-2">
        <div className="card">
          <div className="row no-gutters">
            <div className="col-md-4">
              <img className="thing-image img-fluid" src={thing.itemImage} alt="of a thing"></img>
              <button className="btn btn-outline-danger delete-btn" onClick={this.deleteThisThing}>Delete this thing</button>
              <button className="btn btn-outline-success single-btn" onClick={this.viewSingleThing}>View</button>
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h2 className="card-title">{thing.itemName}</h2>
                <p>{thing.itemDescription}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Thing;
