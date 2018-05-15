import React, { Component } from 'react';
import { withAuthenticator } from 'aws-amplify-react';
import NewGrudge from './NewGrudge';
import Grudges from './Grudges';
import './Application.css';


class Application extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grudges: [],
    };

    this.addGrudge = this.addGrudge.bind(this);
    this.removeGrudge = this.removeGrudge.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  addGrudge(grudge) {
    this.setState({ grudges: [grudge, ...this.state.grudges] });
  }

  removeGrudge(grudge) {
    this.setState({
      grudges: this.state.grudges.filter(other => other.id !== grudge.id),
    });
  }

  toggle(grudge) {
    const othergrudges = this.state.grudges.filter(other => other.id !== grudge.id);
    const updatedGrudge = { ...grudge, avenged: !grudge.avenged };
    this.setState({ grudges: [updatedGrudge, ...othergrudges] });
  }

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
