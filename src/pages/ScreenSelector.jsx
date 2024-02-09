import React, { useEffect, useState } from "react";
import { getTheme } from "../api/FirebaseApi";
import Dashboard from "../screens/Dashboard";
import PinkDashboard from "../screens/PinkDashboard";

function ScreenSelector({ theme, toggleModal, setId }) {
  return theme.id == 0 ? (
    <Dashboard toggleModal={toggleModal} setId={setId} />
  ) : (
    <PinkDashboard />
  );
}

export default ScreenSelector;
