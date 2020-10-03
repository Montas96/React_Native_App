/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
// Store/Reducers/favoriteReducer.js

const initialState = {user: {}};

function userReducer(state = initialState, action) {
  let nextState;
  switch (action.type) {
    case 'GET_USER':
      nextState = {
        userName: 'Montassar',
      };
      return nextState || state;
    default:
      return state;
  }
}
export default userReducer;
