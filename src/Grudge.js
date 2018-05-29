import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Grudge.css';

class Grudge extends Component {
  render() {
    const { avenged, id, person, deed, onCheckOff, onRemove } = this.props;
    return (
      <article className="Grudge">
        <label htmlFor={id}>
          <input
            type="checkbox"
            checked={avenged}
            onChange={onCheckOff}
            id={id}
          />
          <strong>{person}</strong>:{' '}
          {deed}
        </label>
        <button className="Grudge-remove" onClick={onRemove}>
          Remove
        </button>
      </article>
    );
  }
}

Grudge.propTypes = {
  avenged: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  person: PropTypes.string.isRequired,
  deed: PropTypes.string.isRequired,
  onCheckOff: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default Grudge;
