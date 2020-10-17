import LoginActions from "../actions/loginAction";

/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
// Store/Reducers/favoriteReducer.js

const initialState = {
  authToken: null,
  error: null,
  fetching: false,
  loading: true,
  isAuthenticated: false,
};

function loginReducer(state = initialState, action) {
  let nextState;
  switch (action.type) {
    case LoginActions.loginRequest:
      nextState = {
        ...initialState,
        fetching: true,
        error: null,
      };
      return nextState || state;

    case LoginActions.loginSuccess:
      nextState = {
        ...initialState,
        authToken: action.id_token,
        fetching: false,
        error: null,
        isAuthenticated: true,
      };
      return nextState || state;

    case LoginActions.loginFailure:
      nextState = {
        ...initialState,
        authToken: null,
        fetching: false,
        error: action.error,
        isAuthenticated: false,
      };
      return nextState || state;
    default:
      return state;
  }
}
export default loginReducer;
