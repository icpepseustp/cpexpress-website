import React, { useEffect, useState } from "react";
import Dashboard from "./screens/Dashboard";
import HowItWorks from "./pages/HowItWorks";
import Contact from "./pages/Contact";
import Wrapper from "./components/Wrapper";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Modal from "./components/Modal";
import { toast } from "react-toastify";
import ProtectedRoute from "./components/ProtectedRoute";

import AdminDashboard from "./screens/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import ScreenSelector from "./pages/ScreenSelector";
import { getTheme } from "./api/FirebaseApi";
import website from "./assets/website.json";
import Loader from "./components/Loader";
import { AuthContextProvider } from "./auth/Auth";
import HowItWorksPink from "./pages/HowItWorksPink";

function App() {
  const [modal, setModal] = useState(false);
  const [userId, setUserId] = useState();
  const [show, setShow] = useState(true);
  const [isLoading, setLoading] = useState(true);

  const [themeId, setThemeId] = useState(0);

  useEffect(() => {
    getTheme()
      .then((doc) => {
        if (!doc) return;

        setThemeId(doc.data()["theme"]["id"]);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [themeId]);

  const setId = (id) => {
    setUserId(id);
    console.log(userId);
  };

  const toggleModal = () => {
    setModal(modal === true ? false : true);
  };

  const showSuccess = (msg) => {
    toast.success(msg, {
      position: "bottom-right",
      autoClose: 8000,
    });
  };

  const showError = (err) => {
    toast.error(msg, {
      position: "bottom-right",
      autoClose: 8000,
    });
  };

  const openNav = (open) => {
    setShow(!open);
  };

  return isLoading ? (
    <Loader loading_msg="Loading, please wait..." />
  ) : (
    <div className="relative w-full h-full">
      {modal && (
        <Modal
          className="absolute"
          toggleModal={toggleModal}
          userId={userId}
          showError={showError}
          showSuccess={showSuccess}
        />
      )}
      <BrowserRouter>
        <AuthContextProvider>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <Wrapper
                  show={show}
                  theme={website["themes"][themeId]}
                  openNav={openNav}
                >
                  <ScreenSelector
                    theme={website["themes"][themeId]}
                    toggleModal={toggleModal}
                    setId={setId}
                  />
                </Wrapper>
              }
            />
            <Route
              path="/how"
              element={
                <Wrapper
                  show={show}
                  theme={website["themes"][themeId]}
                  openNav={openNav}
                >
                  {themeId == 0 ? (
                    <HowItWorks theme={website["themes"][themeId]} />
                  ) : (
                    <HowItWorksPink theme={website["themes"][themeId]} />
                  )}
                </Wrapper>
              }
            />
            <Route
              path="/contact"
              element={
                <Wrapper
                  show={show}
                  theme={website["themes"][themeId]}
                  openNav={openNav}
                >
                  <Contact theme={website["themes"][themeId]} />
                </Wrapper>
              }
            />
            <Route
              path="/login"
              element={
                <Wrapper
                  show={show}
                  theme={website["themes"][0]}
                  openNav={openNav}
                >
                  <AdminLogin />
                </Wrapper>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <Wrapper
                    show={show}
                    theme={website["themes"][0]}
                    openNav={openNav}
                  >
                    <AdminDashboard />
                  </Wrapper>
                </ProtectedRoute>
              }
            />
          </Routes>
        </AuthContextProvider>
      </BrowserRouter>
      {/* <Wrapper show={show} theme={website["themes"][themeId]} openNav={openNav}>
        <Route
          exact
          path="/"
          element={
            <ScreenSelector
              theme={website["themes"][themeId]}
              toggleModal={toggleModal}
              setId={setId}
            />
          }
          // element={<Dashboard toggleModal={toggleModal} setId={setId} />}
        />
        <Route path="/how" element={<HowItWorks />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Wrapper> */}
    </div>
  );
}

export default App;
