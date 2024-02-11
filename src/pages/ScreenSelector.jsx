import React, { useEffect, useState } from "react";
import Dashboard from "../screens/Dashboard";
import PinkDashboard from "../screens/PinkDashboard";
import { v4 as uuid } from "uuid";

function ScreenSelector({ theme, toggleModal, setId, setShowAlert, setAlert }) {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const user_id = localStorage.getItem("user-id");

    try {
      if (user_id) {
        let id = JSON.parse(user_id);
        setUserId(id);
      } else {
        const new_id = uuid().slice(0, 8);
        let id = new_id;
        localStorage.setItem("user-id", JSON.stringify(id));
        setUserId(id);
      }
    } catch {
      console.log("error");
    }
  }, [userId]);

  return (
    <>
      {theme.id == 0 ? (
        <Dashboard userId={userId} toggleModal={toggleModal} setId={setId} />
      ) : (
        <PinkDashboard
          setAlert={setAlert}
          setShowAlert={setShowAlert}
          userId={userId}
        />
      )}
    </>
  );
}

export default ScreenSelector;
