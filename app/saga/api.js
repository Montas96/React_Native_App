/* eslint-disable prettier/prettier */
/* eslint-disable eqeqeq */
const app_id = '4f9c8aac';
const app_key = '233a08758152d09c1ccf8ab2320b2eb2';
import apisauce from 'apisauce';


function* searchFoodApi(text) {
    const url = `https://api.edamam.com/search?q=${text}&app_id=${app_id}&app_key=${app_key}`;

    const apiCall = apisauce.create({
        baseUrl: undefined,
        headers: {
            'Cach-Controle': 'no-cache',
        },
    }).get(url);
    const response = yield apiCall;

    const foods = yield response.ok
        ? response.data
        : [];
    return foods;
}

export const Api = {
    searchFoodApi,
};
