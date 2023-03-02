import React, { useState, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { FormRow, FormRowSelect } from '.'
import { handleChange, clearFilters } from '../features/allJobs/allJobsSlice'
import Wrapper from '../assets/wrappers/SearchContainer'

const SearchContainer = () => {
  const { isLoading, search, searchStatus, searchType, sort, sortOptions } =
    useSelector((state) => state.allJobs)
  const [localSearch, setLocalSearch] = useState('')
  const { jobTypeOptions, statusOptions } = useSelector((state) => state.job)
  const dispatch = useDispatch()

  const handleSearch = (e) => {
    const { name, value } = e.target
    dispatch(handleChange({ name, value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(clearFilters())
  }

  const debounce = () => {
    let timeoutID
    return (e) => {
      setLocalSearch(e.target.value)
      clearTimeout(timeoutID)
      timeoutID = setTimeout(() => {
        dispatch(handleChange({ name: e.target.name, value: e.target.value }))
      }, 1000)
    }
  }

  const optimizedDebounce = useMemo(() => debounce(), [])

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h4>Search form</h4>
        <div className="form-center">
          {/* Search position */}
          <FormRow
            type="text"
            name="search"
            value={localSearch}
            handleChange={optimizedDebounce}
          />
          {/* Search status */}
          <FormRowSelect
            labelText="status"
            name="searchStatus"
            value={searchStatus}
            handleChange={handleSearch}
            list={['all', ...statusOptions]}
          />
          {/* Search type */}
          <FormRowSelect
            labelText="type"
            name="searchType"
            value={searchType}
            handleChange={handleSearch}
            list={['all', ...jobTypeOptions]}
          />
          {/* Search sort */}
          <FormRowSelect
            name="sort"
            value={sort}
            handleChange={handleSearch}
            list={[...sortOptions]}
          />
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="btn btn-block btn-danger"
          >
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  )
}

export default SearchContainer
