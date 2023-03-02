import axios from 'axios'
import { getUserFromLocalStorage } from './localStorage'
import { clearStore } from '../features/user/userSlice'

const axiosCustomInstance = axios.create({
  baseURL: 'https://jobify-prod.herokuapp.com/api/v1/toolkit',
  headers: {
    Accept: 'application/json',
  },
})

axiosCustomInstance.interceptors.request.use(
  (config) => {
    const user = getUserFromLocalStorage()
    if (user) {
      config.headers['Authorization'] = `Bearer ${user.token}`
    }

    return config
  },
  (error) => Promise.reject(error)
)

export const checkForUnauthorizedResponse = (error, thunkAPI) => {
  if (error.response.status === 401) {
    thunkAPI.dispatch(clearStore())
    return thunkAPI.rejectWtihValue('Unauthorized! Logging out...')
  }
  return thunkAPI.rejectWithValue(error.response.data.msg)
}

export { axiosCustomInstance }

export default axios
