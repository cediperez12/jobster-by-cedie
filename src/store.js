import { configureStore } from '@reduxjs/toolkit'

import UserReducer from './features/user/userSlice'
import JobReducer from './features/job/jobSlice'
import AllJobReducer from './features/allJobs/allJobsSlice'

export const store = configureStore({
  reducer: {
    user: UserReducer,
    job: JobReducer,
    allJobs: AllJobReducer,
  },
})
