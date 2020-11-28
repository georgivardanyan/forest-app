import React, { FC } from 'react'
import { NavBar } from './components/NavBar'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import styled from 'styled-components'

const RouterContainer = styled.div`
  padding: 1rem;
`

const App: FC = () => {
  return (
    <Router>
      <div>
        <NavBar/>
        <RouterContainer>
          <Switch>
            <Route path="/" exact>upload</Route>
            <Route path="/map">map</Route>
            <Route path="/histogram">histogram</Route>
            <Route path="/scatterplot">scatterplot</Route>
          </Switch>
        </RouterContainer>
      </div>
    </Router>
  )
}

export default App
