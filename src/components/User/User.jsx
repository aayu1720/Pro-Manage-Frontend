import React from "react";

import styles from "./User.module.css";

function User({ user, setUser, setAddPeople }) {
  const handleUser = () => {
    setUser(null);
    setAddPeople(0);
  };

  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <div className={styles.innerBox}>
          <p>{user} added to board</p>

          <button onClick={() => handleUser()} className={styles.user}>
            Okay, got it!
          </button>
        </div>
      </div>
    </div>
  );
}

export default User;
