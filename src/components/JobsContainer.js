import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Job from './Job'
import Wrapper from '../assets/wrappers/JobsContainer'
import Loading from './Loading'
import PageBtnContainer from './PageBtnContainer'
import { getAllJobs } from '../features/allJobs/allJobsSlice'

const JobsContainer = () => {
  const {
    jobs,
    isLoading,
    page,
    totalJobs,
    numOfPages,
    search,
    searchStatus,
    searchType,
    sort,
  } = useSelector((store) => store.allJobs)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllJobs())
  }, [page, search, searchStatus, searchType, sort])

  if (isLoading) {
    return (
      <Wrapper>
        <Loading center />
      </Wrapper>
    )
  }

  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <h5>
        {totalJobs} job{jobs.length > 1 && 's'}
      </h5>
      <div className="jobs">
        {jobs.map((job) => (
          <Job key={job._id} {...job} />
        ))}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  )
}

export default JobsContainer
