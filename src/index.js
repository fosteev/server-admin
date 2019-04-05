import React from 'react';
import ReactDOM from 'react-dom';

//import './index.css';
import Root from './Root';
//import * as serviceWorker from './serviceWorker';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fab, fas);
import './i18n';


ReactDOM.render(<Root />, document.getElementById('app'));


module.hot.accept();