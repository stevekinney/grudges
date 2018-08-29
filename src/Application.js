import React, { Component } from 'react';
import NewGrudge from './NewGrudge';
import Grudges from './Grudges';
import './Application.css';

import { API, graphqlOperation } from 'aws-amplify';
import { ListGrudges, CreateGrudge, SubscribeToNewGrudges } from './graphql';

class Application extends Component {
  state = {
    grudges: [],
  };

  componentDidMount() {
    API.graphql(graphqlOperation(ListGrudges))
      .then(response => {
        const grudges = response.data.listGrudges.items;
        this.setState({ grudges });
      })
      .catch(console.error);

    API.graphql(graphqlOperation(SubscribeToNewGrudges)).subscribe({
      next: response => {
        const grudge = response.value.data.onCreateGrudge;
        this.setState({ grudges: [...this.state.grudges, grudge] });
      },
    });
  }

  addGrudge = grudge => {
    API.graphql(graphqlOperation(CreateGrudge, grudge)).then(response => {
      console.log('Added', grudge);
    });
  };

  removeGrudge = grudge => {
    this.setState({
      grudges: this.state.grudges.filter(other => other.id !== grudge.id),
    });
  };

  toggle = grudge => {
    const othergrudges = this.state.grudges.filter(
      other => other.id !== grudge.id,
    );
    const updatedGrudge = { ...grudge, avenged: !grudge.avenged };
    this.setState({ grudges: [updatedGrudge, ...othergrudges] });
  };

  render() {
    const { grudges } = this.state;
    const unavengedgrudges = grudges.filter(grudge => !grudge.avenged);
    const avengedgrudges = grudges.filter(grudge => grudge.avenged);

    return (
      <div className="Application">
        <NewGrudge onSubmit={this.addGrudge} />
        <Grudges
          title="Unavenged Grudges"
          grudges={unavengedgrudges}
          onCheckOff={this.toggle}
          onRemove={this.removeGrudge}
        />
        <Grudges
          title="Avenged Grudges"
          grudges={avengedgrudges}
          onCheckOff={this.toggle}
          onRemove={this.removeGrudge}
        />
      </div>
    );
  }
}

export default Application;
