import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

import { axiosCustomInstance } from '../../utils/axios'
import {
  getUserFromLocalStorage,
  addUserToLocalStorage,
  removeUserFromLocalStorage,
} from '../../utils/localStorage'
import { loginUserThunk, registerUserThunk, updateUserThunk } from './userThunk'

const initialState = {
  user: getUserFromLocalStorage(),
  isSidebarOpen: false,
  isLoading: false,
}

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (user, thunkAPI) => {
    return registerUserThunk('/auth/register', user, thunkAPI)
  }
)

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (user, thunkAPI) => {
    return loginUserThunk('/auth/login', user, thunkAPI)
  }
)

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (user, thunkAPI) => {
    return updateUserThunk('/auth/updateUser', user, thunkAPI)
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen
    },
    logoutUser: (state, action) => {
      const { payload } = action

      state.user = null
      state.isSidebarOpen = false
      removeUserFromLocalStorage()

      if (payload) {
        toast.success(payload)
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        const { payload } = action

        state.user = payload.user
        state.isLoading = false

        addUserToLocalStorage(payload.user)

        toast.success(`Hello there, ${state.user.name}`)
      })
      .addCase(registerUser.rejected, (state, action) => {
        const { payload } = action
        state.isLoading = false

        toast.error(payload)
      })

      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const { payload } = action

        state.isLoading = false
        state.user = payload.user

        addUserToLocalStorage(payload.user)

        toast.success(`Hello there, ${state.user.name}`)
      })
      .addCase(loginUser.rejected, (state, action) => {
        const { payload } = action

        state.isLoading = false

        toast.error(payload)
      })

      .addCase(updateUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const { payload } = action

        state.isLoading = false
        state.user = payload.user

        addUserToLocalStorage(payload.user)

        toast.success('User updated.')
      })
      .addCase(updateUser.rejected, (state, action) => {
        const { payload } = action

        state.isLoading = false

        toast.error(payload)
      })
  },
})

export const { toggleSidebar, logoutUser } = userSlice.actions

export default userSlice.reducer
