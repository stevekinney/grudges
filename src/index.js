import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Application from './Application';

import Amplify, { Analytics } from 'aws-amplify';
import configuration from './aws-exports';

const appSyncConfiguration = {
  aws_appsync_graphqlEndpoint:
    'https://dzvu6xsqyfg25dqiro5jb2kfu4.appsync-api.us-east-1.amazonaws.com/graphql',
  aws_appsync_region: 'us-east-1',
  aws_appsync_authenticationType: 'API_KEY',
  aws_appsync_apiKey: 'da2-zluis6eslffv5njkfkvpb5ph4a',
};

Amplify.configure({ ...configuration, ...appSyncConfiguration });
Analytics.disable();

ReactDOM.render(<Application />, document.getElementById('root'));
