
import type { Action } from '../actions/types';
import { SET_USER, UNSET_USER } from '../actions/user';

export type State = {
  provider: string,
  name: string,
  email: string,

}

const initialState = {
  provider: null,
  name: '',
  email: null,
};

export default function (state:State = initialState, action:Action): State {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        ...action.payload,
      };
    case UNSET_USER:
      return {
        ...initialState,
      };
  }
  return state;
}
