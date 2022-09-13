import axios from "axios";
const baseUrl = "/api/persons";

const getAll = () => {
  return axios.get(baseUrl);
};

const create = (newObject) => {
  return axios.post(baseUrl, newObject);
};

const update = (personObject) => {
  console.log(`${baseUrl}/${personObject.id}`);
  return axios
    .put(`${baseUrl}/${personObject.id}`, personObject)
    .then((response) => response.data);
};

const deleteId = (id) => {
  return axios.delete(`${baseUrl}/${id}`).then((response) => response.data);
};

export default {
  getAll,
  create,
  update,
  deleteId,
};
