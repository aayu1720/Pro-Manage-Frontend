import React from "react";
import { deleteTask } from "../../services/task";
import styles from "./Delete.module.css";

function Delete({ setDeleteVal, taskToDelete, trigger, setTrigger }) {
  const handleDelete = async () => {
    let result = await deleteTask(taskToDelete);
    if (result === true) {
      if (result === true) {
        setTrigger(!trigger);
      }
      setDeleteVal(0);
    }
  };

  const handleCancel = () => {
    setDeleteVal(0);
  };

  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <div className={styles.innerBox}>
          <p>Are you sure you want to Delete?</p>

          <button onClick={() => handleDelete()} className={styles.delete}>
            Yes, Delete
          </button>

          <button onClick={handleCancel} className={styles.cancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default Delete;
