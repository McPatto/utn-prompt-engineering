import axios from 'axios';

const BASE_URL = "http://localhost:3568/api/mattress";

export const getAllMattresses = async ({ page = 1, limit = 10 } = {}) => {
  const response = await axios.get(`${BASE_URL}/?page=${page}&limit=${limit}`);
  return response.data;
};

export const getMattressById = async (id) => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
};

export const addMattress = async (mattress) => {
  const response = await axios.post(`${BASE_URL}/`, mattress);
  return response.data;
};

export const updateMattress = async (id, mattress) => {
  const response = await axios.put(`${BASE_URL}/${id}`, mattress);
  return response.data;
};

export const deleteMattress = async (id) => {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.data;
};

export const deleteManyMattresses = async (ids) => {
  const response = await axios.post(`${BASE_URL}/delete-many`, { ids });
  return response.data;
};