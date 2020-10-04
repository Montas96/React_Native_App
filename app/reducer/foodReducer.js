/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
// Store/Reducers/favoriteReducer.js

const initialState = { foods: [] };

function foodReducer(state = initialState, action) {
    let nextState;

    switch (action.type) {
        case 'ADD_To_FAVORITE':

            let list = [...state.foods];
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
                foods: list,
            };
            return nextState || state;
        default:
            return state;
    }
}
export default foodReducer;
