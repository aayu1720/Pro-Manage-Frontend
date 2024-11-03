import React, { useState } from "react";
import { addUser } from "../../services/task";
import User from "../User/User";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./AddPeople.module.css";

function AddPeople({ setAddPeople }) {
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);

  const handleAddPeople = async () => {
    try {
      if (email?.length === 0) {
        toast("Email field can't be empty", {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return;
      }

      let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
      if (!email.match(pattern)) {
        toast("Invalid Email", {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return;
      }

      let result = await addUser(email);

      if (result === true) {
        setUser(email);
        return;
      }
    } catch (error) {
      if (error.response.data.message === "User already exists") {
        toast("User already exists", {
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
    }
  };

  const handleCancel = () => {
    setAddPeople(0);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <div className={styles.innerBox}>
          <p className={styles.text}>Add people to the board</p>

          <input
            className={styles.input}
            name="email"
            id="email"
            placeholder="Enter the email"
            value={email}
            onChange={handleEmailChange}
            type={"email"}
          ></input>

          <div className={styles.buttonBox}>
            <button onClick={handleCancel} className={styles.cancel}>
              Cancel
            </button>

            <button
              onClick={() => handleAddPeople()}
              className={styles.addPeople}
            >
              Add Email
            </button>
          </div>
        </div>
      </div>
      {user !== null && (
        <User user={user} setUser={setUser} setAddPeople={setAddPeople} />
      )}
      <ToastContainer />
    </div>
  );
}

export default AddPeople;
