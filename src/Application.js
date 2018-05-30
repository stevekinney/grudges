import React, { Component } from 'react';
import NewGrudge from './NewGrudge';
import Grudges from './Grudges';
import './Application.css';

import { API } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react';

class Application extends Component {
  state = {
    grudges: [],
  };

  componentDidMount() {
    API.get('grdugesCRUD', '/grduges').then(grudges => {
      this.setState({ grudges });
    });
  }

  addGrudge = grudge => {
    API.post('grdugesCRUD', '/grduges', { body: grudge }).then(response => {
      this.setState({ grudges: [grudge, ...this.state.grudges] });
    });
  };

  removeGrudge = grudge => {
    API.del('grdugesCRUD', `/grduges/object/${grudge.id}`).then(() => {
      this.setState({
        grudges: this.state.grudges.filter(other => other.id !== grudge.id),
      });
    });
  };

  toggle = grudge => {
    const updatedGrudge = { ...grudge, avenged: !grudge.avenged };
    API.put('grdugesCRUD', '/grduges', { body: updatedGrudge }).then(
      ({ response }) => {
        console.log({ response });
        const othergrudges = this.state.grudges.filter(
          other => other.id !== grudge.id,
        );
        this.setState({ grudges: [updatedGrudge, ...othergrudges] });
      },
    );
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

export default withAuthenticator(Application);
