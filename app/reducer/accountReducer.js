/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
// Store/Reducers/favoriteReducer.js
import AccountActions from '../actions/accountActions';

const initialState = {
  error: null,
  fetching: false,
  registerSuccess: null,
  errorAccount: null,
  fetchingAccount: false,
  account: null,
};

function accountReducer(state = initialState, action) {
  let nextState;
  switch (action.type) {
    case AccountActions.signupRequest:
      nextState = {
        ...initialState,
        registerSuccess: false,
        fetching: true,
        error: null,
      };
      return nextState || state;

    case AccountActions.signupSuccess:
      nextState = {
        ...initialState,
        registerSuccess: true,
        fetching: false,
        error: null,
      };
      return nextState || state;

    case AccountActions.signupFailure:
      nextState = {
        ...initialState,
        registerSuccess: false,
        fetching: false,
        error: action.error,
      };
      return nextState || state;


    case AccountActions.getAccountRequest:
      nextState = {
        ...initialState,
        errorAccount: null,
        fetchingAccount: true,
      };
      return nextState || state;

    case AccountActions.getAccountSuccess:
      nextState = {
        ...initialState,
        errorAccount: null,
        fetchingAccount: false,
        account: action.account,
      };
      return nextState || state;

    case AccountActions.getAccountFailure:
      nextState = {
        ...initialState,
        errorAccount: action.error,
        fetchingAccount: false,
      };
      return nextState || state;

    case AccountActions.accountReset:
      return initialState;
    default:
      return state;
  }
}
export default accountReducer;
