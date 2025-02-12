import axios from 'axios';

const BASE_URL = "http://localhost:3568/api/mattress";

export const getAllMattresses = async () => {
  const response = await axios.get(`${BASE_URL}/`);
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