import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import LoginScreen from '../components/screens/Login';
import MainScreen from '../components/screens/Main';
import ProfileScreen from '../components/screens/Profile';
import MapScreen from '../components/screens/Map';

export const AppNavigator = StackNavigator({
  Login: { screen: LoginScreen },
  Main: { screen: MainScreen },
  Profile: { screen: ProfileScreen },
  Map: { screen: MapScreen },
});

const AppWithNavigationState = ({ dispatch, nav }) => (
  <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
);

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);
