import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';
import './NewGrudge.css';

class NewGrudge extends Component {
  constructor() {
    super();
    this.state = {
      person: '',
      deed: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { target } = event;
    const { value, name } = target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    const { onSubmit } = this.props;
    const { person, deed } = this.state;

    event.preventDefault();
    onSubmit({
      avenged: false,
      dateAdded: Date.now(),
      deed,
      id: uuid(),
      person,
    });
    this.setState({ person: '', deed: '' });
  }

  render() {
    const { person, deed } = this.state;

    return (
      <form className="NewGrudge" onSubmit={this.handleSubmit}>
        <input
          className="NewGrudge-input"
          name="person"
          placeholder="Person"
          type="text"
          value={person}
          onChange={this.handleChange}
        />
        <input
          className="NewGrudge-input"
          name="deed"
          placeholder="Deed"
          type="text"
          value={deed}
          onChange={this.handleChange}
        />
        <input className="NewGrudge-submit button" type="submit" />
      </form>
    );
  }
}

NewGrudge.propTypes = {
  onSubmit: PropTypes.func,
};

NewGrudge.defaultProps = {
  onSubmit: () => {},
};

export default NewGrudge;
