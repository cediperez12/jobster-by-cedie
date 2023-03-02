import {
  axiosCustomInstance,
  checkForUnauthorizedResponse,
} from '../../utils/axios'

export const getAllJobsThunk = async (_, thunkAPI) => {
  const { page, search, searchStatus, searchType, sort } =
    thunkAPI.getState().allJobs
  let url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`
  if (search) {
    url = url + `&search=${search}`
  }
  try {
    const response = await axiosCustomInstance.get(url, {
      headers: {
        Authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    })

    console.log(response)
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg)
  }
}

export const showStatsThunk = async (_, thunkAPI) => {
  try {
    const response = await axiosCustomInstance.get('/jobs/stats')
    console.log(response.data)
    return response.data
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI)
  }
}
