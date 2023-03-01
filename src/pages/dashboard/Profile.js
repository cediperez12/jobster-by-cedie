import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { FormRow } from '../../components'
import Wrapper from '../../assets/wrappers/DashboardFormPage'
import { toast } from 'react-toastify'
import { updateUser } from '../../features/user/userSlice'

const Profile = () => {
  const { isLoading, user } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const [userData, setUserData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    lastName: user?.lastName || '',
    location: user?.location || '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const { name, email, lastName, location } = userData

    if (!name || !email || !lastName || !location) {
      toast.error('Please fill out all fields')
      return
    }

    dispatch(updateUser({ name, email, lastName, location }))
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value })
  }

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>profile</h3>

        <div className="form-center">
          <FormRow
            text="text"
            name="name"
            value={userData.name}
            handleChange={handleChange}
          />
          <FormRow
            text="text"
            name="lastName"
            labelText="last name"
            value={userData.lastName}
            handleChange={handleChange}
          />
          <FormRow
            text="email"
            name="email"
            value={userData.email}
            handleChange={handleChange}
          />
          <FormRow
            text="text"
            name="location"
            value={userData.location}
            handleChange={handleChange}
          />
          <button className="btn btn-block" type="submit" disabled={isLoading}>
            {isLoading ? 'Please wait...' : 'Save changes'}
          </button>
        </div>
      </form>
    </Wrapper>
  )
}

export default Profile
