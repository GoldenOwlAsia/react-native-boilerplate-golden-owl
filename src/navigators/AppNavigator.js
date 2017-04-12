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
import PlaylistScreen from '../components/screens/Playlist';
import VideosScreen from '../components/screens/Videos';
import MapScreen from '../components/screens/Map';

import { DrawerItem } from '../components/shared';

export const ProfileStack = StackNavigator({
  Profile: { screen: ProfileScreen },
}, {
  navigationOptions: {
  },
  headerMode: 'float',
});

export const PlaylistStack = StackNavigator({
  Playlist: { screen: PlaylistScreen },
  Videos: { screen: VideosScreen },
}, {
  navigationOptions: {
    style: { backgroundColor: '#FFF' },
  },
  headerMode: 'float',
});

export const LoggedInStack = DrawerNavigator({
  Playlist: { screen: PlaylistStack },
  Map: { screen: MapScreen },
  Profile: { screen: ProfileStack },
}, {
  contentComponent: props => (
    <ScrollView>
      <DrawerView.Items {...props} />
      <DrawerItem navigation={props.navigation} />
    </ScrollView>
  ),
});

export const AppNavigator = StackNavigator({
  Login: { screen: LoginScreen },
  Main: { screen: LoggedInStack },
}, {
  headerMode: 'none',
});

const AppWithNavigationState = (params) => {
  const { dispatch, nav } = params;
  return (<AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />);
};

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    nav: state.nav,
  };
};

export default connect(mapStateToProps)(AppWithNavigationState);
