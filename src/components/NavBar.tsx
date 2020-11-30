import React, { FC, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { ReactComponent as AppLogo } from '../assets/logo.svg'
import { useHistory, NavLink as Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectLoading, selectStands } from '../features/forest/forestSlice'

const NavLink = styled(Link)`
  background: white;
  color: black;
  text-decoration: none;
  padding: 0.25rem 0.5rem;
  border-radius: 5px;
  cursor: pointer;
  
  &.active {
    background: #70ca70;
    color: white;
  }
`

const Nav = styled.div`
  background: #f0eef5;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  flex-wrap: wrap;
  
  & > a {
    margin: 0 1rem;
  }
`

const logoAnimation = keyframes`
  from {
    transform: translateY(-80px);
  }
  to {
    transform: translateY(0);
  }
`

const Logo = styled.div`
  margin-right: auto;
  background: white;
  padding: 0.2rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  border-radius: 7px;
  
  svg {
    fill: forestgreen;
    width: 2.5rem;
    height: 2.5rem;
    margin-right: 2rem;
    animation-name: ${logoAnimation};
    animation-timing-function: cubic-bezier(0,.24,.07,.99);
    animation-duration: .8s;
    animation-delay: 80ms;
  }
  
  .logo-text {
    font-size: 2rem;
    animation-name: ${logoAnimation};
    animation-timing-function: cubic-bezier(0,.24,.07,.99);
    animation-duration: .8s;
  }
`

export const NavBar: FC = () => {
  const loading = useSelector(selectLoading)

  const history = useHistory()
  const [logoKey, setLogoKey] = useState<number>(1)
  const stands = useSelector(selectStands)

  const redirectToHome = () => {
    setLogoKey(logoKey + 1)
    history.push('/')
  }

  return (
    <Nav>
      <Logo onClick={redirectToHome} key={logoKey.toString()}>
        <div>
          <AppLogo/>
        </div>
        <div className="logo-text">
          Forest App
        </div>
      </Logo>
      <NavLink to="/" exact>
        Upload
      </NavLink>
      {!!stands.length && !loading && (
        <>
          <NavLink to="/map">
            Map
          </NavLink>
          <NavLink to="/histogram">
            Histogram
          </NavLink>
          <NavLink to="/scatterplot">
            Scatterplot
          </NavLink>
          <NavLink to="/pie">
            Pie
          </NavLink>
        </>
      )}
    </Nav>
  )
}
