/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
// Store/Reducers/favoriteReducer.js
import CuisineAction from '../actions/cuisine.action';

const initialState = {
    error: null,
    fetchingAll: false,
    cuisines: [],
};

function CuisineReducer(state = initialState, action) {
    let nextState;
    switch (action.type) {
        case CuisineAction.getAllCuisinesRequest:
            nextState = {
                ...state,
                fetchingAll: true,
                error: null,
            };
            return nextState || state;

        case CuisineAction.getAllCuisinesSuccess:
            nextState = {
                ...state,
                cuisines: state.cuisines.concat(action.cuisines),
                fetchingAll: false,
                error: null,
            };
            return nextState || state;

        case CuisineAction.getAllCuisinesFailure:
            nextState = {
                ...state,
                fetchingAll: false,
                error: action.error,
            };
            return nextState || state;

        case CuisineAction.cuisineReset:
            return initialState;
        default:
            return state;
    }
}
export default CuisineReducer;
