import React, { useState, useEffect } from "react";
import styles from "./Register.module.css";
import { registerUser } from "../../services/userAuth";
import { addUser } from "../../services/task";
import emailIcon from "../../assets/icons/email.png";
import lockIcon from "../../assets/icons/lock.png";
import nameIcon from "../../assets/icons/name.png";
import eyeIcon from "../../assets/icons/eye.png";
import eyeSlashIcon from "../../assets/icons/eye-slash.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register({ setAuth }) {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
    passwordMismatch: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleFormChange = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
    setErrors({ ...errors, [event.target.name]: false }); // Clear error on input change
  };

  const changeRegister = () => {
    setAuth(0);
  };

  const handleSubmit = async () => {
    setRegister(true);
    // Reset errors
    setErrors({
      name: false,
      email: false,
      password: false,
      confirmPassword: false,
      passwordMismatch: false,
    });

    let hasError = false;

    if (!userData.name) {
      setErrors((prev) => ({ ...prev, name: true }));
      hasError = true;
    }

    if (!userData.email) {
      setErrors((prev) => ({ ...prev, email: true }));
      hasError = true;
    }

    if (!userData.password) {
      setErrors((prev) => ({ ...prev, password: true }));
      hasError = true;
    }

    if (!userData.confirmPassword) {
      setErrors((prev) => ({ ...prev, confirmPassword: true }));
      hasError = true;
    }

    if (userData.password !== userData.confirmPassword) {
      setErrors((prev) => ({ ...prev, passwordMismatch: true }));
      hasError = true;
    }

    if (hasError) {
      return; // Stop if there are errors
    }
    try {
      const result = await registerUser(userData);

      if (result) {
        await addUser(userData.email);
        changeRegister();
      }
    } catch (error) {
      toast("User  already exists", {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <div className={styles.container}>
      <h1>Register</h1>
      <div className={styles.box}>
        <div className={styles.inputBox}>
          <img src={nameIcon} alt="Name Icon" />
          <input
            className={styles.input}
            name="name"
            placeholder="Name"
            value={userData.name}
            onChange={handleFormChange}
            type="text"
          />
        </div>
        {errors.name && <p className={styles.error}>Name can't be empty</p>}

        <div className={styles.inputBox}>
          <img src={emailIcon} alt="Email Icon" />
          <input
            className={styles.input}
            name="email"
            placeholder="Email"
            value={userData.email}
            onChange={handleFormChange}
            type="email"
          />
        </div>
        {errors.email && <p className={styles.error}>Email can't be empty</p>}

        <div className={styles.inputBox}>
          <img src={lockIcon} alt="Password Icon" />
          <input
            className={styles.input}
            name="password"
            placeholder="Password"
            value={userData.password}
            onChange={handleFormChange}
            type={showPassword ? "text" : "password"}
          />
          <img
            src={showPassword ? eyeSlashIcon : eyeIcon}
            alt={showPassword ? "Hide Password" : "Show Password"}
            onClick={() => setShowPassword(!showPassword)}
          />
        </div>
        {errors.password && (
          <p className={styles.error}>Password can't be empty</p>
        )}

        <div className={styles.inputBox}>
          <img src={lockIcon} alt="Confirm Password Icon" />
          <input
            className={styles.input}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={userData.confirmPassword}
            onChange={handleFormChange}
            type={showConfirmPassword ? "text" : "password"}
          />
          <img
            src={showConfirmPassword ? eyeSlashIcon : eyeIcon}
            alt={
              showConfirmPassword
                ? "Hide Confirm Password"
                : "Show Confirm Password"
            }
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          />
        </div>
        {errors.confirmPassword && (
          <p className={styles.error}>Confirm Password can't be empty</p>
        )}
        {errors.passwordMismatch && (
          <p className={styles.error}>Passwords are not matching</p>
        )}

        <button onClick={handleSubmit} className={styles.register}>
          Register
        </button>
        <p className={styles.text}>Have an account?</p>
        <button onClick={changeRegister} className={styles.login}>
          Log In
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Register;
