import React, {useState} from 'react'
import Dashboard from './pages/Dashboard'
import HowItWorks from './pages/HowItWorks'
import Contact from './pages/Contact'
import Wrapper from './components/Wrapper'
import { Route } from "react-router-dom";
import Modal from './components/Modal'
import { toast } from 'react-toastify'
import ProtectedRoute from './components/ProtectedRoute'

import AdminDashboard from './pages/AdminDashboard'
import AdminLogin from './pages/AdminLogin'

function App() {

  const [modal, setModal] = useState(false);
  const [userId, setUserId] = useState();
  const [show, setShow] = useState(true);

  const setId = (id) => {
    setUserId(id);
    console.log(userId)
  }

  const toggleModal = () => {
    setModal(modal === true ? false : true)
  }

  const showSuccess = (msg) => {
    toast.success(msg, {
      position: "bottom-right",
      autoClose: 8000,
    })
  }

  const showError = (err) => {
    toast.error(msg, {
      position: "bottom-right",
      autoClose: 8000,
    })
  }

  const openNav = (open) => {
    setShow(!open)
  }

  return (
    <div className='relative'>
    {
      modal && (
        <Modal className='absolute' toggleModal={toggleModal} userId={userId} showError={showError} showSuccess={showSuccess}/>
      )
    }
      <Wrapper show={show} openNav={openNav}>
          <Route
            path='/'
            element={
              <Dashboard toggleModal={toggleModal} setId={setId}/>
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
          <Route
            path='/login'
            element={
              <AdminLogin/>
            }
          />
          <Route
            path='/admin'
            element = {
              <ProtectedRoute>
                  <AdminDashboard />
              </ProtectedRoute>
            }
          />
      </Wrapper>
    </div>
  )
}

export default App