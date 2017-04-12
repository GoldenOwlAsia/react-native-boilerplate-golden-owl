
import type { Action } from './types';

import { GoogleSignin } from 'react-native-google-signin';

export const SET_USER = 'SET_USER';
export const UNSET_USER = 'UNSET_USER';

export function setUser(user):Action {
  return {
    type: SET_USER,
    payload: user,
  };
}

export function unsetUser():Action {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      const user = getState().user;
      console.log('user', user);
      if (user.provider === 'google') {
        GoogleSignin.signOut()
          .then(() => {
            console.log('done signout');
            dispatch({
              type: UNSET_USER,
            });
            resolve();
          })
          .catch((err) => {
            console.log('unable to signout', err);
            dispatch({
              type: UNSET_USER,
            });
            resolve();
          });
      } else {
        // / unused
        resolve();
      }
    });
  };
}

