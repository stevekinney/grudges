import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Application from './Application';

import Amplify from 'aws-amplify';
import config from './aws-exports';

Amplify.configure({
  ...config,
  aws_appsync_graphqlEndpoint: 'https://kukfsktgdfbgvgle5sh76uykly.appsync-api.us-east-1.amazonaws.com/graphql',
  aws_appsync_region: 'us-east-1',
  aws_appsync_authenticationType: 'API_KEY',
  aws_appsync_apiKey: 'da2-e3ze4unwbnbi7i3hka4c5fdcqa',
});

ReactDOM.render(<Application />, document.getElementById('root'));
