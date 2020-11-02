/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
// Store/Reducers/favoriteReducer.js
import DeviceAction from '../actions/device.action';

const initialState = {
  error: null,
  fetching: false,
  device: null,
};

function DeviceReducer(state = initialState, action) {
  let nextState;
  switch (action.type) {
    case DeviceAction.saveDeviceRequest:
      nextState = {
        ...state,
        fetching: true,
        error: null,
      };
      return nextState || state;

    case DeviceAction.saveDeviceSuccess:
      nextState = {
        ...state,
        device: action.device,
        fetching: false,
        error: null,
      };
      return nextState || state;

    case DeviceAction.saveDeviceFailure:
      nextState = {
        ...state,
        fetching: false,
        error: action.error,
      };
      return nextState || state;
    default:
      return state;
  }
}
export default DeviceReducer;
