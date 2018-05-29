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
    API.get('GrudgesCRUD', '/Grudges')
      .then(grudges => {
        this.setState({ grudges });
      })
      .catch(console.error);
  }

  addGrudge = grudge => {
    API.post('GrudgesCRUD', '/Grudges', { body: grudge })
      .then(response => {
        console.log({ response });
        grudge.id = response.id;
        this.setState({ grudges: [grudge, ...this.state.grudges] });
      })
      .catch(console.error);
  };

  removeGrudge = grudge => {
    API.del('GrudgesCRUD', `/Grudges/object/${grudge.id}`)
      .then(response => {
        console.log({ response });
        this.setState({
          grudges: this.state.grudges.filter(other => other.id !== response.id),
        });
      })
      .catch(console.error);
  };

  toggle = grudge => {
    const updatedGrudge = { ...grudge, avenged: !grudge.avenged };
    API.put('GrudgesCRUD', '/Grudges', { body: updatedGrudge }).then(response => {
      console.log({ response });
      const othergrudges = this.state.grudges.filter(
        other => other.id !== response.id,
      );
      this.setState({ grudges: [updatedGrudge, ...othergrudges] });
    }).catch(console.error);
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

export default withAuthenticator(Application, { includeGreetings: true });
