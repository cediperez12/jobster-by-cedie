import axios from 'axios'

export const axiosCustomInstance = axios.create({
  baseURL: 'https://jobify-prod.herokuapp.com/api/v1/toolkit',
  headers: {
    Accept: 'application/json',
  },
})

export default axios
