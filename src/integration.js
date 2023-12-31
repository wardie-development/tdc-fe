import axios from 'axios';

const isLocal = false;

const baseUrl = isLocal ? 'http://localhost:8000/api/v1' : 'https://api.tecnicosdecelular.com.br/api/v1';
const api = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authenticate = async (password) => {
  const response = await api.post('/brands/authenticate/', { password });
  return response.data;
}

export const getBrands = async (token) => {
  const response = await api.get('/brands/', { headers: { 'Authorization': token }});
  return response.data;
}

export const getBrandNames = async (token) => {
  const response = await api.get('/brands/name/', { headers: { 'Authorization': token }});
  return response.data;
}

export const sendSuggestion = async (token, payload) => {
  const response = await api.post('/brands/suggestion/', payload, { headers: { 'Authorization': token }});
  return response.data;
}

export const getNewCellPhones = async (token) => {
  const response = await api.get('/brands/news/', { headers: { 'Authorization': token }});
  return response.data;
}

export const getOrderListModels = async () => {
  const response = await api.get('/order-list/');
  return response.data;
}

export const createOrder = async payload => {
  const response = await api.post('/order-list/', payload);
  return response.data;
}
