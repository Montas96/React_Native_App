/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
// Store/Reducers/favoriteReducer.js

const initialState = { foods: [], searching: false, error: null, favorite: [] };

function foodReducer(state = initialState, action) {
    let nextState;

    switch (action.type) {
        case 'SEARCH_FOOD_REQUEST':
            nextState = {
                ...state,
                searching: true,
            };
        return nextState || state;

        case 'SEARCH_SUCCESS':
            nextState = {
                ...state,
                searching: false,
                foods: action.reciededFood,
                error: null,
            };
        return nextState || state;

        case 'SEARCH_FAILED':
            nextState = {
                ...state,
                searching: false,
                error: action.error,
            };
        return nextState || state;

        case 'ADD_To_FAVORITE':

            let list = [...state.favorite];
            const index = list.findIndex(element => {
                return element.label === action.value.label;
            });
            if (index === -1) {
                list.push(action.value);
            } else {
                list.splice(index, 1);
            }
            nextState = {
                ...initialState,
                favorite: list,
            };
            return nextState || state;
        default:
            return state;
    }
}
export default foodReducer;
