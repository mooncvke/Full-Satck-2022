import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const post = async (newObject) => {
  const config = { headers: { Authorization: token } };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = async (id, newObject) => {
  try {
    const res = await axios.put(`${baseUrl}/${id}`, newObject);
    return res.data;
  } catch (err) {
    return console.log("Error in blogs service update", err);
  }
};

const remove = async (id) => {
  try {
    const config = { headers: { Authorization: token } };
    const response = axios.delete(`${baseUrl}/${id}`, config);
    return response.data;
  } catch (err) {
    return console.log("Error in blogs service remove ", err);
  }
};

export default { getAll, setToken, post, update, remove };
