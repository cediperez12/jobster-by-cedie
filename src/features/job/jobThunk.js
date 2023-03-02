import { axiosCustomInstance } from '../../utils/axios'
import { showLoading, hideLoading, getAllJobs } from '../allJobs/allJobsSlice'
import { clearValues } from './jobSlice'

const authHeader = (thunkAPI) => {
  return {
    headers: {
      Authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
    },
  }
}

export const createJobThunk = async (job, thunkAPI) => {
  try {
    const response = await axiosCustomInstance.post('/jobs', job)

    thunkAPI.dispatch(clearValues())
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg)
  }
}

export const deleteJobThunk = async (jobId, thunkAPI) => {
  thunkAPI.dispatch(showLoading())
  try {
    const response = await axiosCustomInstance.delete(`/jobs/${jobId}`)

    thunkAPI.dispatch(getAllJobs())
    return response.data
  } catch (error) {
    thunkAPI.dispatch(hideLoading())
    return thunkAPI.rejectWithValue(error.response.data.msg)
  }
}

export const editJobThunk = async (job, thunkAPI) => {
  try {
    const response = await axiosCustomInstance.patch(
      `/jobs/${job.jobId}`,
      job.job
    )
    thunkAPI.dispatch(clearValues())
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg)
  }
}
