import React from 'react';
import ReactDOM from 'react-dom';
import Amplify from 'aws-amplify';

import awsExports from './aws-exports';

import './index.css';
import Application from './Application';

Amplify.configure(awsExports);

ReactDOM.render(<Application />, document.getElementById('root'));
