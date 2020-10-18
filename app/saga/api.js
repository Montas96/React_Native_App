/* eslint-disable prettier/prettier */
/* eslint-disable eqeqeq */
import apisauce from 'apisauce';
const baseUrl = 'https://dbc52ee22e33.ngrok.io/';
const create = () => {
    const api =   apisauce.create({
        baseURL: undefined,
        headers: {
            'Cach-Controle': 'no-cache',
        },
        timeout: 10000,
      });
    const setAuthToken = (userAuth) => api.setHeader('Authorization', 'Bearer ' + userAuth);
    const removeAuthToken = () => api.deleteHeader('Authorization');
    const register = (user) => api.post(baseUrl + 'api/account/B2C', user);
    const login = (loginVM) => api.post(baseUrl + 'api/authenticate', loginVM);
    const getAccount = () => api.get(baseUrl + 'api/account');
    return {
        setAuthToken,
        removeAuthToken,
        register,
        login,
        getAccount,
    };
};
export default {
    create,
  };
