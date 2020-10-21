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
        ...state,
        registerSuccess: false,
        fetching: true,
        error: null,
      };
      return nextState || state;

    case AccountActions.signupSuccess:
      nextState = {
        ...state,
        registerSuccess: true,
        fetching: false,
        error: null,
      };
      return nextState || state;

    case AccountActions.signupFailure:
      nextState = {
        ...state,
        registerSuccess: false,
        fetching: false,
        error: action.error,
      };
      return nextState || state;


    case AccountActions.getAccountRequest:
      // console.log('5-get Account');
      nextState = {
        ...state,
        errorAccount: null,
        fetchingAccount: true,
      };
      return nextState || state;

    case AccountActions.getAccountSuccess:
      nextState = {
        ...state,
        errorAccount: null,
        fetchingAccount: false,
        account: action.account,
      };
      return nextState || state;

    case AccountActions.getAccountFailure:
      nextState = {
        ...state,
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
