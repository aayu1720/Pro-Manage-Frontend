import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchTaskById } from "../../services/task";
import styles from "./SharedTaskPage.module.css";
import codesandbox from "../../assets/icons/codesandbox.png";
import SharedTask from "../../components/SharedTask/SharedTask";

function SharedTaskPage() {
  const { id } = useParams();
  const [taskDetails, setTaskDetails] = useState({});

  const fetchTask = async (taskId) => {
    let result = await fetchTaskById(taskId);
    setTaskDetails(result);
  };

  useEffect(() => {
    fetchTask(id);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <img src={codesandbox} />
        <h1 className={styles.heading}>Pro Manage</h1>
      </div>

      <SharedTask taskDetails={taskDetails} />
    </div>
  );
}

export default SharedTaskPage;
