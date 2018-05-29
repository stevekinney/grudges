import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grudge from './Grudge';
import './Grudges.css';

const contentFor = ({ person, deed }) => (person + deed).toLowerCase();

class Grudges extends Component {
  state = {
    searchTerm: '',
  };

  updateSearchTerm = event => {
    const searchTerm = event.target.value.toLowerCase();
    this.setState({
      searchTerm,
    });
  };

  render() {
    const { title, grudges, onCheckOff, onRemove } = this.props;
    const { searchTerm } = this.state;
    return (
      <section className="Grudges">
        <h2>
          {title} ({grudges.length})
        </h2>
        <input
          className="Grudges-searchTerm"
          value={searchTerm}
          placeholder="Filter…"
          onChange={this.updateSearchTerm}
        />
        {grudges
          .filter(grudge => contentFor(grudge).includes(searchTerm))
          .sort((a, b) => a.id - b.id)
          .map(grudge => (
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
  grudges: PropTypes.arrayOf(
    PropTypes.shape({
      person: PropTypes.string.isRequired,
      deed: PropTypes.string.isRequired,
      avenged: PropTypes.bool.isRequired,
      id: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onCheckOff: PropTypes.func,
  onRemove: PropTypes.func,
};

Grudges.defaultProps = {
  onCheckOff: () => {},
  onRemove: () => {},
};

export default Grudges;
