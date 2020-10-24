/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
// Store/Reducers/favoriteReducer.js
import FoodAction from '../actions/food.action';

const initialState = {
    error: null,
    fetchingAll: false,
    foods: [],
    addingToFavorite: false,
    addToFavoriteError: null,
    favorites: [],
};

function FoodReducer(state = initialState, action) {
    let nextState;
    switch (action.type) {
        case FoodAction.getAllFoodRequest:
            nextState = {
                ...state,
                fetchingAll: true,
                error: null,
            };
            return nextState || state;

        case FoodAction.getAllFoodSuccess:
            nextState = {
                ...state,
                foods: state.foods.concat(action.foods),
                fetchingAll: false,
                error: null,
            };
            return nextState || state;

        case FoodAction.getAllFoodFailure:
            nextState = {
                ...state,
                fetchingAll: false,
                error: action.error,
            };
            return nextState || state;

        case FoodAction.addToFavoriteRequest:
            nextState = {
                ...state,
                addingToFavorite: true,
                addToFavoriteError: null,
            };
            return nextState || state;

        case FoodAction.addToFavoriteSuccess:
            nextState = {
                ...state,
                favorites: action.favorites,
                addingToFavorite: false,
                addToFavoriteError: null,
            };
            return nextState || state;

        case FoodAction.addToFavoriteFailure:
            nextState = {
                ...state,
                addingToFavorite: false,
                addToFavoriteError: action.error,
            };
            return nextState || state;

        case FoodAction.FoodReset:
            return initialState;
        default:
            return state;
    }
}
export default FoodReducer;
