import React from 'react'
import { Link } from 'react-router-dom'

import main from '../assets/images/main.svg'
import Wrapper from '../assets/wrappers/LandingPage'

import { Logo } from '../components'

import styled from 'styled-components'

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam
            illum necessitatibus ad dolorem nulla ea. Nihil obcaecati officia
            dolores explicabo nostrum fuga soluta exercitationem assumenda
            sapiente maiores temporibus, alias perspiciatis commodi cupiditate
            ut, laborum vitae quae reiciendis illo enim natus libero! Aperiam,
            quam illo. Expedita harum laboriosam et cum ut.
          </p>
          <Link className="btn btn-hero" to="/register">
            Login/Register
          </Link>
        </div>
        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  )
}

export default Landing
