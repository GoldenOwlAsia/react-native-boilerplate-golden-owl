import { combineReducers } from 'redux';

import user from './user';
import youtube from './youtube';

import { NavigationActions } from 'react-navigation';

import { AppNavigator, LoggedInStack } from '../navigators/AppNavigator';

const initialNavState = {
  index: 0,
  routes: [
    { key: 'login', routeName: 'Login' },
  ],
};

const initialAuthState = { isLoggedIn: false };

function nav(state = initialNavState, action) {
  switch (action.type) {
    case 'Videos':
      console.log('action', action);
      return AppNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'Videos', params: action.payload }), state);
    case 'Map':
      return AppNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'Map' }), state);
    case 'Login':
      return LoggedInStack.router.getStateForAction(NavigationActions.navigate({ routeName: 'Profile' }), state);
    case 'Logout':
      return AppNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'Login' }), state);
    case 'Main':
      return AppNavigator.router.getStateForAction(NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'Main' }),
        ],
      }), state);
    default:
      return AppNavigator.router.getStateForAction(action, state);
  }
}

function auth(state = initialAuthState, action) {
  switch (action.type) {
    case 'Login':
      return { ...state, isLoggedIn: true };
    case 'Logout':
      return { ...state, isLoggedIn: false };
    default:
      return state;
  }
}

const AppReducer = combineReducers({
  user,
  youtube,
  nav,
  auth,
});

export default AppReducer;
