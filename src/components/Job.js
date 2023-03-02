import React from 'react'
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import moment from 'moment'

import Wrapper from '../assets/wrappers/Job'
import JobInfo from './JobInfo'
import { setEditJob, deleteJob } from '../features/job/jobSlice'

const Job = ({
  _id,
  position,
  company,
  jobLocation,
  jobType,
  createdAt,
  status,
}) => {
  const dispatch = useDispatch()

  const date = moment(createdAt).format('MMMM Do, YYYY')

  return (
    <Wrapper>
      <header>
        <div className="main-icon">{company.charAt(0)}</div>
        <div className="info">
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <h4>more content</h4>
          <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
          <JobInfo icon={<FaCalendarAlt />} text={date} />
          <JobInfo icon={<FaBriefcase />} text={jobType} />
          <div className={`status ${status}`}>{status}</div>
        </div>
        <footer>
          <div className="actions">
            <Link
              className="btn edit-btn"
              to="/add-job"
              onClick={(e) => {
                dispatch(
                  setEditJob({
                    editJobId: _id,
                    position,
                    company,
                    jobLocation,
                    company,
                    jobType,
                    status,
                  })
                )
              }}
            >
              Edit
            </Link>
            <button
              className="btn delete-btn"
              onClick={(e) => dispatch(deleteJob(_id))}
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  )
}

export default Job
