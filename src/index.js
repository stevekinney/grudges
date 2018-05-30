import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Application from './Application';

import Amplify from 'aws-amplify';
import configuration from './aws-exports';

const appSyncConfig = {
  aws_appsync_graphqlEndpoint:
    'https://hudgahnbufbvvb7lano5lvg6wy.appsync-api.us-east-1.amazonaws.com/graphql',
  aws_appsync_region: 'us-east-1',
  aws_appsync_authenticationType: 'API_KEY',
  aws_appsync_apiKey: 'da2-w2ipm2v44rbsba736c3oqse2nm',
};

Amplify.configure({ ...configuration, ...appSyncConfig });

ReactDOM.render(<Application />, document.getElementById('root'));
