import { axiosCustomInstance } from '../../utils/axios'
import { clearAllJobState } from '../allJobs/allJobsSlice'
import { clearValues } from '../job/jobSlice'
import { logoutUser } from './userSlice'

export const registerUserThunk = async (url, user, thunkAPI) => {
  try {
    const response = await axiosCustomInstance.post(url, user)
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg)
  }
}

export const loginUserThunk = async (url, user, thunkAPI) => {
  try {
    const response = await axiosCustomInstance.post(url, user)
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg)
  }
}

export const updateUserThunk = async (url, user, thunkAPI) => {
  try {
    const response = await axiosCustomInstance.patch(url, user, {
      headers: {
        Authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    })
    return response.data
  } catch (error) {
    thunkAPI.dispatch(logoutUser())
    return thunkAPI.rejectWithValue(error.response.data.msg)
  }
}

export const clearStoreThunk = async (message, thunkAPI) => {
  try {
    thunkAPI.dispatch(logoutUser(message))
    thunkAPI.dispatch(clearAllJobState())
    thunkAPI.dispatch(clearValues())
    return Promise.resolve()
  } catch (error) {
    return Promise.reject()
  }
}
