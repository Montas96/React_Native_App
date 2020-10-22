/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
// Store/Reducers/favoriteReducer.js
import CategoryActions from '../actions/category.action';

const initialState = {
    error: null,
    fetchingAll: false,
    categories: [],
};

function CategoryReducer(state = initialState, action) {
    let nextState;
    switch (action.type) {
        case CategoryActions.getAllCategoriesRequest:
            nextState = {
                ...state,
                fetchingAll: true,
                error: null,
            };
            return nextState || state;

        case CategoryActions.getAllCategoriesSuccess:
            nextState = {
                ...state,
                categories: state.categories.concat(action.categories),
                fetchingAll: false,
                error: null,
            };
            return nextState || state;

        case CategoryActions.getAllCategoriesRequest:
            nextState = {
                ...state,
                fetchingAll: false,
                error: action.error,
            };
            return nextState || state;

        case CategoryActions.categoryReset:
            return initialState;
        default:
            return state;
    }
}
export default CategoryReducer;
