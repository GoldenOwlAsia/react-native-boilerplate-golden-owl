
import React, { Component } from 'react';
import { BackAndroid, StatusBar, NavigationExperimental } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';


import { DrawerNavigator, StackNavigator } from 'react-navigation';

import { closeDrawer } from '../actions/drawer';

import { Examples } from '@shoutem/ui';

import { Drawer, SideBar } from './shared/';
import {
  Login,
  Home,
  Notifications,
  Settings,
} from './screens/';

const {
  popRoute,
} = actions;

const {
  CardStack: NavigationCardStack,
} = NavigationExperimental;

const Stack = StackNavigator({
  Home: {
    screen: Home,
  },
});

const MainNavigator = DrawerNavigator({
  Home: {
    screen: Home,
  },
  Login: {
    screen: Login,
  },
  Notifications: {
    screen: Notifications,
  },
  Settings: {
    screen: Settings,
  }
});

MainNavigator.router = {
  ...MainNavigator.router,
  getStateForAction(action, state) {
    if (state && !state.user) {
      const routes = [
        ...state.routes,
      ];
      return {
        ...state,
        routes,
        index: routes.length - 1,
      };
    }
    return MainNavigator.router.getStateForAction(action, state);
  },
};


export default MainNavigator;
