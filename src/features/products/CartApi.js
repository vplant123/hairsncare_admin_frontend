import axios from 'axios';
import BASE_URL from '../../Config';

export const addProductToCartApi = async (userId, product) => {
  const response = await axios.post(`${BASE_URL}/cart/update-cart?userId=${userId}`, product);
  return response.data;
};

export const removeProductFromCartApi = async (userId, productId) => {
  const response = await axios.delete(`${BASE_URL}/cart/delete-cart?userId=${userId}&productId=${productId}`);
  return response.data;
};

export const getCartItemsApi = async (userId) => {
  const response = await axios.get(`${BASE_URL}/cart/get-cart?userId=${userId}`);
  return response.data;
};
