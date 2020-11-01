/* eslint-disable prettier/prettier */
/* eslint-disable eqeqeq */
import apisauce from 'apisauce';
const baseUrl = 'https://ceb2aeb9a71f.ngrok.io/';
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
    const getCategories = (options) => api.get(baseUrl + 'api/categories', options);
    const getCuisines = (options) => api.get(baseUrl + 'api/cuisines', options);
    const getFoods = (options) => api.get(baseUrl + 'api/foods', options);
    const addToFavorite = (food) => api.put(baseUrl + 'api/foods/favorites', food);
    const getAllFavoriteFoods = () => api.get(baseUrl + 'api/foods/favorites');
    const addToOrderList = (order) => api.post(baseUrl + 'api/orders',order);
    const updateOrder = (order) => api.put(baseUrl + 'api/orders',order);
    const getOrderByStatus = (statusId, options) => api.get(baseUrl + 'api/orders/B2C?statusId=' + statusId, options);

    return {
        setAuthToken,
        removeAuthToken,
        register,
        login,
        getAccount,
        getCategories,
        getCuisines,
        getFoods,
        addToFavorite,
        getAllFavoriteFoods,
        addToOrderList,
        getOrderByStatus,
        updateOrder,
    };
};
export default {
    create,
  };
