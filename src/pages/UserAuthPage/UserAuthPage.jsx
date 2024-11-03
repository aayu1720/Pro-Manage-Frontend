import React, { useState } from "react";
import Login from "../../components/Login/Login";
import Register from "../../components/Register/Register";
import styles from "./UserAuthPage.module.css";
import welcome from "../../assets/Astro/welcome.png";

function UserAuthPage() {
  const [auth, setAuth] = useState(0);

  return (
    <div className={styles.container}>
      <div className={styles.subContainerOne}>
        <img src={welcome} className={styles.welcomeImg} />
        <h1 className={styles.heading}>Welcome aboard my friend</h1>
        <p className={styles.paragraph}>just a couple of clicks and we start</p>
      </div>
      <div className={styles.subContainerTwo}>
        {auth === 0 && <Login setAuth={setAuth} />}
        {auth === 1 && <Register setAuth={setAuth} />}
      </div>
    </div>
  );
}

export default UserAuthPage;
