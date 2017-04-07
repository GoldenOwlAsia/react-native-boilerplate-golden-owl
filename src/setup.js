
import React, { Component } from 'react';
import { Provider } from 'react-redux';

import configureStore from './lib/configureStore';

import AppReducer from './reducers';
import AppWithNavigationState from './navigators/AppNavigator';

function setup():React.Component {
  class Root extends Component {

    constructor() {
      super();
      this.state = {
        isLoading: false,
        store: configureStore(() => this.setState({ isLoading: false })),
      };
    }

    render() {
      return (
        <Provider store={this.state.store}>
          <AppWithNavigationState />
        </Provider>
      );
    }
  }

  return Root;
}

export default setup;
