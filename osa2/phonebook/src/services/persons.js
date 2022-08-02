import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  return axios.get(baseUrl);
};

const create = (newObject) => {
  return axios.post(baseUrl, newObject);
};

const update = (id, newName, newNumber) => {
  console.log(`${baseUrl}/${id}`);
  return axios.put(`${baseUrl}/${id}`, { name: newName, number: newNumber });
};

const deleteId = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

export default {
  getAll: getAll,
  create: create,
  update: update,
  deleteId: deleteId,
};
