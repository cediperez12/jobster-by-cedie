import React from 'react'
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi'
import { useSelector, useDispatch } from 'react-redux'
import { changePage } from '../features/allJobs/allJobsSlice'

import Wrapper from '../assets/wrappers/PageBtnContainer'

const PageBtnContainer = () => {
  const { numOfPages, page } = useSelector((state) => state.allJobs)
  const dispatch = useDispatch()

  const pages = Array.from({ length: numOfPages }, (_, index) => {
    return index + 1
  })

  const nextPage = () => {
    let newPage = page + 1
    if (newPage > numOfPages) {
      newPage = 1
    }
    dispatch(changePage(newPage))
  }

  const prevPage = () => {
    let newPage = page - 1
    if (newPage < 1) {
      newPage = numOfPages
    }
    dispatch(changePage(newPage))
  }

  return (
    <Wrapper>
      <button className="prev-btn" onClick={prevPage}>
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className="btn-container">
        {pages.map((pageNumber) => {
          return (
            <button
              type="button"
              key={pageNumber}
              className={pageNumber === page ? 'pageBtn active' : 'pageBtn'}
              onClick={(e) => console.log('change page')}
            >
              {pageNumber}
            </button>
          )
        })}
      </div>
      <button className="next-btn" onClick={nextPage}>
        next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  )
}

export default PageBtnContainer
