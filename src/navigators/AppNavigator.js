import React, { PropTypes } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  TouchableItem,
  ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator, DrawerNavigator, DrawerView } from 'react-navigation';

import LoginScreen from '../components/screens/Login';
import MainScreen from '../components/screens/Main';
import ProfileScreen from '../components/screens/Profile';
import MapScreen from '../components/screens/Map';

import { DrawerItem } from '../components/shared';

export const ProfileStack = StackNavigator({
  Profile: { screen: ProfileScreen },
}, {
  navigationOptions: {
  },
  headerMode: 'float',
});

export const LoggedInStack = DrawerNavigator({
  Profile: { screen: ProfileStack },
}, {
  contentComponent: props => (
    <ScrollView>
      <DrawerView.Items {...props} />
      <DrawerItem navigation={props.navigation}/>
    </ScrollView>
  )
});

export const AppNavigator = StackNavigator({
  Login: { screen: LoginScreen },
  Main: { screen: LoggedInStack },
}, {
  headerMode: 'none',
});

const AppWithNavigationState = (params) => {
  console.log('AppWithNavigationState', params);
  const { dispatch, nav } = params;
  return (<AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />);
};

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  console.log('state nav', state.nav);
  return {
    nav: state.nav,
  };
}

export default connect(mapStateToProps)(AppWithNavigationState);
