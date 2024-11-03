import React, { useEffect, useState } from "react";
import { updateUserName, updateUserDetails } from "../../services/userAuth";
import { useNavigate } from "react-router-dom";
import styles from "./Settings.module.css";
import name from "../../assets/icons/name.png";
import email from "../../assets/icons/email.png";
import lock from "../../assets/icons/lock.png";
import eye from "../../assets/icons/eye.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Settings() {
  const [oldName, setOldName] = useState(localStorage.getItem("name"));
  const [oldEmail, setOldEmail] = useState(localStorage.getItem("email"));

  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "" || oldName,
    email: "" || oldEmail,
    oldPassword: "",
    newPassword: "",
  });

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const handleFormChange = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };

  const handleUpdate = async () => {
    if (
      oldName !== userData?.name &&
      oldEmail === userData.email &&
      userData.newPassword.length === 0 &&
      userData.oldPassword.length === 0
    ) {
      toast("User  details are successfully updated", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      const result = await updateUserName(userData.email, userData?.name);
      localStorage.setItem("name", userData.name);
      return;
    }

    if (
      (userData?.oldPassword.length === 0 &&
        userData?.newPassword.length !== 0) ||
      (userData?.oldPassword.length !== 0 && userData?.newPassword.length === 0)
    ) {
      toast("Please enter both passwords", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }

    let result = await updateUserDetails(oldEmail, userData);

    if (result === true) {
      toast("User  details are successfully updated", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      localStorage.clear();
      navigate("/");
      return;
    }

    toast("Incorrect Old Password", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    return;
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>Settings</h3>

      <div className={styles.box}>
        <div className={styles.inputBox}>
          <img src={name} alt="Name Icon" />
          <input
            className={styles.input}
            name="name"
            id="name"
            placeholder="Name"
            value={userData.name}
            onChange={handleFormChange}
            type={"text"}
          />
        </div>

        <div className={styles.inputBox}>
          <img src={email} alt="Email Icon" />
          <input
            className={styles.input}
            name="email"
            id="email"
            placeholder="Update Email"
            value={userData.email}
            onChange={handleFormChange}
            type={"email"}
          />
        </div>

        <div className={styles.inputBox}>
          <img src={lock} alt="Old Password Icon" />
          <input
            className={styles.input}
            name="oldPassword"
            id="oldPassword"
            placeholder="Old Password"
            value={userData.oldPassword}
            onChange={handleFormChange}
            type={showOldPassword ? "text" : "password"}
          />
          <img
            src={eye}
            className={styles.eyeIcon}
            onClick={() => setShowOldPassword(!showOldPassword)}
            alt="Eye Icon"
          />
        </div>

        <div className={styles.inputBox}>
          <img src={lock} alt="New Password Icon" />
          <input
            className={styles.input}
            name="newPassword"
            id="newPassword"
            placeholder="New Password"
            value={userData.newPassword}
            onChange={handleFormChange}
            type={showNewPassword ? "text" : "password"}
          />
          <img
            src={eye}
            className={styles.eyeIcon}
            onClick={() => setShowNewPassword(!showNewPassword)}
            alt="Eye Icon"
          />
        </div>

        <button onClick={handleUpdate} className={styles.update}>
          Update
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Settings;
