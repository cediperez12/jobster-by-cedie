import { Link } from 'react-router-dom'

import Wrapper from '../assets/wrappers/ErrorPage'
import img from '../assets/images/not-found.svg'

const Error = () => {
  return (
    <Wrapper className="full-page">
      <div>
        <img src={img} alt="not found" />
        <h3>Sorry, you've gone to the wrong path.</h3>
        <p>Please go back. It's not too late.</p>
        <Link to="/">Back home</Link>
      </div>
    </Wrapper>
  )
}

export default Error
