/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
// Store/Reducers/favoriteReducer.js
import {UserAction} from '../actions/user.action';

const initialState = {
  error: null,
  fetching: false,
  user: null,
  updating: false,
  updateUserError: null,
};

function UserReducer(state = initialState, action) {
  let nextState;
  switch (action.type) {
    case UserAction.getUserRequest:
      nextState = {
        ...state,
        fetching: true,
        error: null,
      };
      return nextState || state;

    case UserAction.getUserSuccess:
      nextState = {
        ...state,
        fetching: false,
        error: null,
        user: action.user,
      };
      return nextState || state;

    case UserAction.getUserFailure:
      nextState = {
        ...state,
        fetching: false,
        error: action.error,
      };
      return nextState || state;
      /** update user */
      case UserAction.updateUserRequest:
        nextState = {
          ...state,
          user: action.user,
          updating: false,
          updateUserError: null,
        };
        return nextState || state;
      case UserAction.updateUserSuccess:
        nextState = {
          ...state,
          updating: false,
          updateUserError: null,
          user: action.user,
        };
        return nextState || state;
  
      case UserAction.updateUserFailure:
        nextState = {
          ...state,
          updating: false,
          updateUserError: action.error,
        };
        return nextState || state;
        /** reset */
    case UserAction.resetAll:
      return initialState;
    default:
      return state;
  }
}
export default UserReducer;
