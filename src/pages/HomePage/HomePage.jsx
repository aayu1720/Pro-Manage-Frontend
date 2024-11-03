import React, { useState, useEffect } from "react";
import styles from "./HomePage.module.css";
import Board from "../../components/Board/Board";
import Analytics from "../../components/Analytics/Analytics";
import Settings from "../../components/Settings/Settings";
import Logout from "../../components/Logout/Logout";
import codesandbox from "../../assets/icons/codesandbox.png";
import layout from "../../assets/icons/layout.png";
import database from "../../assets/icons/database.png";
import setting from "../../assets/icons/settings.png";
import logoutImg from "../../assets/icons/logout.png";

const components = [
  { id: 1, name: "Board", component: <Board />, icon: layout },
  { id: 2, name: "Analytics", component: <Analytics />, icon: database },
  { id: 3, name: "Settings", component: <Settings />, icon: setting },
];

function HomePage() {
  const [activeComponentId, setActiveComponentId] = useState(1);
  const [logout, setLogout] = useState(false);

  useEffect(() => {
    const boxes = document.getElementsByClassName(styles.box);
    Array.from(boxes).forEach((box, index) => {
      box.style.background =
        index === activeComponentId - 0 ? "#D6EAF4" : "none";
    });
  }, [activeComponentId]);

  const handleLogout = () => {
    setLogout(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <div className={styles.subContainer}>
          <div className={styles.box}>
            <img src={codesandbox} alt="Pro Manage" />
            <h1 className={styles.heading}>Pro Manage</h1>
          </div>

          {components.map(({ id, name, icon }) => (
            <div key={id} className={styles.box}>
              <img src={icon} alt={name} />
              <button
                className={`${styles.button} ${
                  activeComponentId === id ? styles.active : ""
                }`}
                onClick={() => setActiveComponentId(id)}
              >
                {name}
              </button>
            </div>
          ))}
        </div>

        <div className={styles.logout}>
          <img src={logoutImg} alt="Logout" />
          <button className={styles.logoutButton} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {
        components.find((component) => component.id === activeComponentId)
          ?.component
      }

      {logout && <Logout setLogout={setLogout} />}
    </div>
  );
}

export default HomePage;
