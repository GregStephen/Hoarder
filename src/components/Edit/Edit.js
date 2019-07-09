import React from 'react';
import {
  Form, FormGroup, Label, Input, Button, InputGroup, InputGroupAddon,
} from 'reactstrap';
import stuffData from '../../helpers/data/stuffData';
import './Edit.scss';

class Edit extends React.Component {
  state = {
    itemName: '',
    itemImage: '',
    itemDescription: '',
  }

  componentDidMount() {
    const thingId = this.props.match.params.id;
    stuffData.getSingleThing(thingId)
      .then(thing => this.setState({
        itemName: thing.itemName,
        itemImage: thing.itemImage,
        itemDescription: thing.itemDescription,
      }))
      .catch(err => console.error('can not get single thing', err));
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleEditedItemSubmit = (e) => {
    const thingId = this.props.match.params.id;
    e.preventDefault();
    const editedItem = {
      itemName: this.state.itemName,
      itemImage: this.state.itemImage,
      itemDescription: this.state.itemDescription,
    };
    stuffData.editThingOnDatabase(thingId, editedItem)
      .then(() => this.props.history.push('/stuff'))
      .catch(err => console.error('can not edit a thing', err));
  }

  render() {
    return (
      <div className="Edit col-6">
        <h1>Edit Stuff</h1>
        <Form onSubmit={this.handleEditedItemSubmit}>
          <FormGroup>
            <InputGroup>
              <InputGroupAddon addonType="prepend">Item Name:</InputGroupAddon>
              <Input
              type="input"
              name="itemName"
              placeholder="Thing a ma bobber"
              id="itemName"
              value={this.state.itemName}
              onChange={this.handleChange}
              required>
              </Input>
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <InputGroup>
            <InputGroupAddon addonType="prepend">Image:</InputGroupAddon>
              <Input
                type="Url"
                name="itemImage"
                id="itemImage"
                value={this.state.itemImage}
                onChange={this.handleChange}
                required
              />
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <Label for="itemDescription">Description: </Label>
            <Input
            type="textarea"
            name="itemDescription"
            id="itemDescription"
            value={this.state.itemDescription}
            onChange={this.handleChange}
            required
            />
          </FormGroup>
          <Button type="submit" color="primary">Edit Item!</Button>
        </Form>
      </div>
    );
  }
}

export default Edit;
