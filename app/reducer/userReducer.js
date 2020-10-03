/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
// Store/Reducers/favoriteReducer.js

const initialState = {user: {}};

function userReducer(state = initialState, action) {
  let nextState;
  switch (action.type) {
    case 'SET_USER_NAME':
      nextState = {
          ...initialState,
        user: {userName : action.value},
      };
      return nextState || state;
    default:
      return state;
  }
}
export default userReducer;
