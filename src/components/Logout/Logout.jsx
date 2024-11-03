import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Logout.module.css";

function Logout({ setLogout }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleCancel = () => {
    setLogout(0);
  };

  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <div className={styles.innerBox}>
          <p>Are you sure you want to Logout?</p>

          <button onClick={() => handleLogout()} className={styles.logout}>
            Yes, Logout
          </button>

          <button onClick={handleCancel} className={styles.cancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default Logout;
