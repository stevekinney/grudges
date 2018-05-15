import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './NewGrudge.css';

class NewGrudge extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { target } = event;
    if (target instanceof HTMLInputElement) {
      const { value } = target;
      this.setState({ value });
    }
  }

  handleSubmit(event) {
    const { onSubmit } = this.props;
    const { value } = this.state;

    event.preventDefault();
    onSubmit({ value, avenged: false, id: Date.now() });
    this.setState({ value: '' });
  }

  render() {
    const { value } = this.state;

    return (
      <form className="NewGrudge" onSubmit={this.handleSubmit}>
        <input className="NewGrudge-input" type="text" value={value} onChange={this.handleChange} />
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
