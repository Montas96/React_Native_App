/* eslint-disable prettier/prettier */
const initialState = {
  rehydrationComplete: false,
};
export default function AppStateReducer(state = initialState, action) {
  let nextState;
  switch (action.type) {
    case 'SET_REHYDRATION_COMPLETE':
      console.log('7-' + 'rehydration comlete');
      nextState = {
        ...state,
        rehydrationComplete: true,
      };
      return nextState || state;
      default:
      return state;
  }
}
