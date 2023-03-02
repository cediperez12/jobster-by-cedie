import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { axiosCustomInstance } from '../../utils/axios'
import { getAllJobsThunk, showStatsThunk } from './allJobsThunk'

const initialFilterState = {
  search: '',
  searchStatus: 'all',
  searchType: 'all',
  sort: 'latest',
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
}

const initialState = {
  isLoading: false,
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  ...initialFilterState,
}

export const showStats = createAsyncThunk('allJobs/showStats', showStatsThunk)

export const getAllJobs = createAsyncThunk('allJobs/getJobs', getAllJobsThunk)

const allJobSlice = createSlice({
  name: 'allJobs',
  initialState,
  reducers: {
    showLoading: (state) => {
      state.isLoading = true
    },
    hideLoading: (state) => {
      state.isLoading = false
    },
    handleChange: (state, action) => {
      const { payload } = action
      const { name, value } = payload

      state.page = 1
      state[name] = value
    },
    clearFilters: (state) => {
      return {
        ...state,
        initialFilterState,
      }
    },
    changePage: (state, action) => {
      const { payload } = action
      state.page = payload
    },
    clearAllJobState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllJobs.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllJobs.fulfilled, (state, action) => {
        const { payload } = action

        console.log(action)

        state.isLoading = false
        state.jobs = payload.jobs
        state.numOfPages = payload.numOfPages
        state.totalJobs = payload.totalJobs
      })
      .addCase(getAllJobs.rejected, (state, action) => {
        const { payload } = action

        state.isLoading = false
        toast.error(payload)
      })

      .addCase(showStats.pending, (state) => {
        state.isLoading = true
      })
      .addCase(showStats.fulfilled, (state, action) => {
        const { payload } = action

        state.isLoading = false
        state.stats = payload.defaultStats
        state.monthlyApplications = payload.monthlyApplications
      })
      .addCase(showStats.rejected, (state, action) => {
        const { payload } = action

        state.isLoading = false
        toast.error(payload)
      })
  },
})

export const {
  showLoading,
  hideLoading,
  handleChange,
  clearFilters,
  changePage,
  clearAllJobState,
} = allJobSlice.actions

export default allJobSlice.reducer
