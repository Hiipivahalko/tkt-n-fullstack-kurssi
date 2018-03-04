import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/blogs'

let token = null

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const create = async (newObject) => {

  const config = {
    headers: { 'Authorization': token}
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (data) => {
  
  const config = {
    headers: { 'Authorization': token}
  }

  const response = await axios.put(`${baseUrl}/${data._id}`, data, config)
  return response.data
}

const remove = async (data) => {

  const config = {
    headers: { 'Authorization': token}
  }

  const response = await axios.delete(`${baseUrl}/${data._id}`, config)
  return response.data
}

export default { getAll, setToken, create, update, remove }