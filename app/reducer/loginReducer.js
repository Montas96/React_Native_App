import LoginActions from "../actions/loginAction";

/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
// Store/Reducers/favoriteReducer.js

const initialState = {
  authToken: null,
  error: null,
  fetching: false,
  loading: false,
  isAuthenticated: false,
};

function loginReducer(state = initialState, action) {
  let nextState;
  switch (action.type) {
    case LoginActions.loginRequest:
      nextState = {
        ...state,
        fetching: true,
        error: null,
      };
      return nextState || state;

    case LoginActions.loginSuccess:
      nextState = {
        ...state,
        authToken: action.id_token,
        fetching: false,
        error: null,
        isAuthenticated: true,
      };
      return nextState || state;

    case LoginActions.loginFailure:
      nextState = {
        ...state,
        authToken: null,
        fetching: false,
        error: action.error,
        isAuthenticated: false,
      };
      return nextState || state;
    case LoginActions.logoutRequest:
      return initialState;

    case LoginActions.loginLoad:
      nextState = {
        ...state,
        loading: true,
      };
      return nextState || state;
    case LoginActions.loginLoadSuccess:
      nextState = {
        ...state,
        loading: false,
      };
      return nextState || state;
    default:
      return state;
  }
}
export default loginReducer;
