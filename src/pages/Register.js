import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'

import { Logo, FormRow } from '../components'
import Wrapper from '../assets/wrappers/RegisterPage'
import { loginUser, registerUser } from '../features/user/userSlice'
import { useNavigate } from 'react-router-dom'

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
}

const Register = () => {
  const { user, isLoading } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [values, setValues] = useState(initialState)

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/')
      }, 3000)
    }
  }, [user, navigate])

  const handleChange = (e) => {
    const { name, value, checked } = e.target
    if (name !== 'isMember') {
      setValues({ ...values, [name]: value })
    } else {
      setValues({ ...values, isMember: checked })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const { name, email, password, isMember } = values
    if ((!isMember && !name) || !email || !password) {
      toast.error('Please fill out all the fields.')
    }

    if (isMember) {
      dispatch(loginUser({ email, password }))
    } else {
      dispatch(registerUser({ name, email, password }))
    }
  }

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember })
  }

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={handleSubmit}>
        <Logo />

        <h3>{values.isMember ? 'Login' : 'Register'}</h3>
        {!values.isMember && (
          <>
            <FormRow
              type="text"
              name="name"
              value={values.name}
              handleChange={handleChange}
            />
          </>
        )}

        <FormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
        />
        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
        />

        <p>
          {values.isMember ? 'Not a member yet?' : 'Already a member'}

          <button className="member-btn" onClick={toggleMember} type="button">
            {values.isMember ? 'Register' : 'Login'}
          </button>
        </p>

        <button className="btn btn-block" type="submit">
          submit
        </button>
      </form>
    </Wrapper>
  )
}

export default Register
