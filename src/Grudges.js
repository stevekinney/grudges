import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grudge from './Grudge';
import './Grudges.css';

class Grudges extends Component {
  constructor() {
    super();
    this.state = {
      searchTerm: '',
    };

    this.updateSearchTerm = this.updateSearchTerm.bind(this);
  }

  updateSearchTerm(event) {
    const searchTerm = event.target.value.toLowerCase();
    this.setState({
      searchTerm,
    });
  }

  render() {
    const {
      title, grudges, onCheckOff, onRemove,
    } = this.props;
    const { searchTerm } = this.state;
    return (
      <section className="Grudges">
        <h2>{ title } ({grudges.length})</h2>
        <input className="Grudges-searchTerm" value={searchTerm} onChange={this.updateSearchTerm} />
        {grudges.filter(grudge => grudge.value.toLowerCase().includes(searchTerm)).map(grudge => (
          <Grudge
            key={grudge.id}
            onCheckOff={() => onCheckOff(grudge)}
            onRemove={() => onRemove(grudge)}
            {...grudge}
          />
        ))}
      </section>
    );
  }
}

Grudges.propTypes = {
  title: PropTypes.string.isRequired,
  grudges: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    packed: PropTypes.bool,
    id: PropTypes.number,
  })).isRequired,
  onCheckOff: PropTypes.func,
  onRemove: PropTypes.func,
};

Grudges.defaultProps = {
  onCheckOff: () => {},
  onRemove: () => {},
};

export default Grudges;
