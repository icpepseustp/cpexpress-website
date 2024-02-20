import React, { useEffect, useState } from "react";
import Dashboard from "../screens/Dashboard";
import PinkDashboard from "../screens/PinkDashboard";
import { v4 as uuid } from "uuid";
import { UserAuth } from "../auth/Auth";

function ScreenSelector({ theme, toggleModal, setId, setShowAlert, setAlert }) {
  const [userId, setUserId] = useState(null);
  const { user } = UserAuth();

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
        <Dashboard
          setAlert={setAlert}
          setShowAlert={setShowAlert}
          userId={userId}
          user={user}
          theme={theme}
        />
      ) : (
        <PinkDashboard
          setAlert={setAlert}
          setShowAlert={setShowAlert}
          userId={userId}
          user={user}
          theme={theme}
        />
      )}
    </>
  );
}

export default ScreenSelector;
