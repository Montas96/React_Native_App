/* eslint-disable prettier/prettier */
/* eslint-disable eqeqeq */
import apisauce from 'apisauce';
const baseUrl = 'https://fd2d42690b60.ngrok.io/';
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
    const getClosedOrder = (options) => api.get(baseUrl + 'api/orders/B2C?statusId=CLOSED', options);
    const saveDevice = (device) => api.post(baseUrl + 'api/device', device);
    const getUser = () => api.get(baseUrl + 'api/b-2-c-users/current');
    const updateUser = (user) => api.put(baseUrl + 'api/b-2-c-users', user);


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
        saveDevice,
        getClosedOrder,
        getUser,
        updateUser,
    };
};
export default {
    create,
  };
