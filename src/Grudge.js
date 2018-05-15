import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Grudge.css';

class Grudge extends Component {
  render() {
    const {
      avenged, id, value, onCheckOff, onRemove,
    } = this.props;
    return (
      <article className="Grudge">
        <label htmlFor={id}>
          <input type="checkbox" checked={avenged} onChange={onCheckOff} id={id} />
          {value}
        </label>
        <button className="Grudge-remove" onClick={onRemove}>Remove</button>
      </article>
    );
  }
}

Grudge.propTypes = {
  avenged: PropTypes.bool,
  id: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
  onCheckOff: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

Grudge.defaultProps = {
  avenged: false,
};

export default Grudge;
