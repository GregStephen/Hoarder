import React from 'react';
import {
  Form, FormGroup, Label, Input, Button, InputGroup, InputGroupAddon,
} from 'reactstrap';
import stuffData from '../../helpers/data/stuffData';
import './NewStuff.scss';

class NewStuff extends React.Component {
  state = {
    itemName: '',
    itemImage: '',
    itemDescription: '',
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleNewItemSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      itemName: this.state.itemName,
      itemImage: this.state.itemImage,
      itemDescription: this.state.itemDescription,
    };
    stuffData.addThingToDatabase(newItem)
      .then(() => this.props.history.push('/stuff'))
      .catch(err => console.error('can not add a thing', err));
  }

  render() {
    return (
      <div className="NewStuff col-6">
        <h1>New Stuff</h1>
        <Form onSubmit={this.handleNewItemSubmit}>
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
                placeholder="Url Link To A Pic Of The Item"
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
            placeholder="Some text about it"
            onChange={this.handleChange}
            required
            />
          </FormGroup>
          <Button type="submit" color="primary">Add Item!</Button>
        </Form>
      </div>
    );
  }
}

export default NewStuff;
