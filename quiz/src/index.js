import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

function render (config) {
  ReactDOM.render(
    <React.StrictMode>
      <App questions={config.questions} />
    </React.StrictMode>,
    document.getElementById(config.appendId)
  );
}

window.Quiz = {
  render
};

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
