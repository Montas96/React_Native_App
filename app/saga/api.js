/* eslint-disable prettier/prettier */
/* eslint-disable eqeqeq */
const app_id = '4f9c8aac';
const app_key = '233a08758152d09c1ccf8ab2320b2eb2';
import apisauce from 'apisauce';
const baseUrl = 'http://192.168.137.1:8080/api/';
const api =   apisauce.create({
    baseURL: baseUrl,
    headers: {
        'Cach-Controle': 'no-cache',
    },
    timeout: 10000,
  });

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
function* login(loginVM) {
    const response = yield api.post( 'authenticate',loginVM );
    return response.ok ? response.data : [];
}
export const Api = {
    searchFoodApi,
    login,
};
