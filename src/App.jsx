import React from 'react'
import Dashboard from './pages/Dashboard'
import HowItWorks from './pages/HowItWorks'
import Contact from './pages/Contact'
import Navbar from './components/Navbar'
import Wrapper from './components/Wrapper'
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
    <Wrapper>
        <Route
          path='/'
          element={
            <Dashboard/>
          }
        />
        <Route
          path='/how'
          element={
            <HowItWorks/>
          }
        />
        <Route
          path='/contact'
          element={
            <Contact/>
          }
        />
    
    </Wrapper>
    </>
  )
}

export default App