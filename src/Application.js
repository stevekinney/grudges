import React, { Component } from 'react';
import NewGrudge from './NewGrudge';
import Grudges from './Grudges';
import './Application.css';

import { API, graphqlOperation } from 'aws-amplify';
import {
  listGrudges,
  createGrudge,
  subscribeToNewGrudges,
  subscribeToDeletedGrudges,
  subscribeToUpdatedGrudges,
  deleteGrudge,
  updateGrudge,
} from './graphql';

class Application extends Component {
  state = {
    grudges: [],
  };

  componentDidMount() {
    API.graphql(graphqlOperation(listGrudges))
      .then(({ data }) => {
        const grudges = data.listGrudges.items;
        this.setState({ grudges });
      })
      .catch(console.error);

    API.graphql(graphqlOperation(subscribeToNewGrudges)).subscribe({
      next: ({ value }) => {
        const grudge = value.data.onCreateGrudge;
        this.setState({ grudges: [...this.state.grudges, grudge] });
      },
    });

    API.graphql(graphqlOperation(subscribeToUpdatedGrudges)).subscribe({
      next: ({ value }) => {
        const updatedGrudge = value.data.onUpdateGrudge;
        const grudges = this.state.grudges.map((grudge) => {
          if (grudge.id !== updatedGrudge.id) return grudge;
          return updatedGrudge;
        });
        this.setState({ grudges });
      },
    });

    API.graphql(graphqlOperation(subscribeToDeletedGrudges)).subscribe({
      next: ({ value }) => {
        const deletedGrudge = value.data.onDeleteGrudge;
        const grudges = this.state.grudges.filter(grudge => grudge.id !== deletedGrudge.id);
        this.setState({ grudges });
      },
    });
  }

  addGrudge = (grudge) => {
    API.graphql(graphqlOperation(createGrudge, grudge))
      .then((response) => {
        // const newGrudge = response.data.createGrudge;
        // this.setState({ grudges: [...this.state.grudges, newGrudge] });
      })
      .catch(console.error);
  };

  removeGrudge = (grudge) => {
    API.graphql(graphqlOperation(deleteGrudge, grudge))
      .then(() => {
        this.setState({
          grudges: this.state.grudges.filter(other => other.id !== grudge.id),
        });
      })
      .catch(console.error);
  };

  toggle = (grudge) => {
    const updatedGrudge = { ...grudge, avenged: !grudge.avenged };
    API.graphql(graphqlOperation(updateGrudge, updatedGrudge)).catch(console.error);
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
