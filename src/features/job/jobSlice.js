import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

import { axiosCustomInstance } from '../../utils/axios'
import { getUserFromLocalStorage } from '../../utils/localStorage'
import { logoutUser } from '../user/userSlice'
import { showLoading, hideLoading, getAllJobs } from '../allJobs/allJobsSlice'
import { createJobThunk, deleteJobThunk, editJobThunk } from './jobThunk'

const initialState = {
  isLoading: false,
  position: '',
  company: '',
  jobLocation: '',
  jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
  jobType: 'full-time',
  statusOptions: ['interview', 'declined', 'pending'],
  status: 'pending',
  isEditing: false,
  editJobId: '',
}

export const editJob = createAsyncThunk('job/editJob', editJobThunk)

export const deleteJob = createAsyncThunk('job/deleteJob', deleteJobThunk)

export const createJob = createAsyncThunk('job/createJob', createJobThunk)

const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    handleChange: (state, action) => {
      const { name, value } = action.payload
      state[name] = value
    },
    clearValues: (state) => {
      return {
        ...initialState,
        jobLocation: getUserFromLocalStorage()?.location || '',
      }
    },
    setEditJob: (state, action) => {
      const { payload } = action
      return {
        ...state,
        isEditing: true,
        ...payload,
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createJob.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createJob.fulfilled, (state, action) => {
        state.isLoading = false
        toast.success('Job Created')
      })
      .addCase(createJob.rejected, (state, action) => {
        state.isLoading = false
        toast.error(action.payload)
      })

      .addCase(editJob.pending, (state) => {
        state.isLoading = true
      })
      .addCase(editJob.fulfilled, (state) => {
        state.isLoading = false
        toast.success('Job modified...')
      })
      .addCase(editJob.rejected, (state, action) => {
        const { payload } = action

        state.isLoading = false
        toast.error(payload)
      })
  },
})

export const { handleChange, clearValues, setEditJob } = jobSlice.actions

export default jobSlice.reducer
