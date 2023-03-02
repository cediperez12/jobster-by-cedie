import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

import { FormRow, FormRowSelect } from '../../components'
import {
  handleChange,
  clearValues,
  createJob,
  editJob,
} from '../../features/job/jobSlice'
import Wrapper from '../../assets/wrappers/DashboardFormPage'

const AddJob = () => {
  const {
    isLoading,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    isEditing,
    editJobId,
  } = useSelector((state) => state.job)
  const { user } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!isEditing) {
      dispatch(handleChange({ name: 'jobLocation', value: user.location }))
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!position || !company || !jobLocation) {
      toast.error('Please fill out the fields')
      return
    }

    if (isEditing) {
      dispatch(
        editJob({
          jobId: editJobId,
          job: {
            position,
            company,
            jobLocation,
            jobType,
            status,
          },
        })
      )
    } else {
      dispatch(createJob({ position, company, jobLocation, jobType, status }))
    }
  }

  const handleJobInput = (e) => {
    const { name, value } = e.target
    dispatch(handleChange({ name, value }))
  }

  return (
    <Wrapper>
      <form onSubmit={handleSubmit} className="form">
        <h3>{isEditing ? 'edit job' : 'add job'}</h3>

        <div className="form-center">
          <FormRow
            type="text"
            name="position"
            value={position}
            handleChange={handleJobInput}
          />

          <FormRow
            type="text"
            name="company"
            value={company}
            handleChange={handleJobInput}
          />

          <FormRow
            type="text"
            labelText="job location"
            name="jobLocation"
            value={jobLocation}
            handleChange={handleJobInput}
          />

          {/* job status */}
          <FormRowSelect
            labelText="Job Status"
            name="status"
            value={status}
            handleChange={handleJobInput}
            list={statusOptions}
          />

          {/* job type */}
          <FormRowSelect
            labelText="Job Type"
            name="jobType"
            value={jobType}
            handleChange={handleJobInput}
            list={jobTypeOptions}
          />

          <div className="btn-container">
            <button
              type="button"
              className="btn btn-block clear-btn"
              onClick={(e) => dispatch(clearValues())}
            >
              clear
            </button>
            <button className="btn btn-block submit-btn">submit</button>
          </div>
        </div>
      </form>
    </Wrapper>
  )
}

export default AddJob
