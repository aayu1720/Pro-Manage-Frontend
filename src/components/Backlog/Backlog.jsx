import React, { useEffect, useState } from "react";
import { getTask } from "../../services/task";
import Task from "../Task/Task";
import styles from "./Backlog.module.css";
import collapseAll from "../../assets/icons/collapse-all.png";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Delete from "../Delete/Delete";
import { Card } from "../Card/Card";

function Backlog({ trigger, setTrigger, timeStamp }) {
  const [task, setTask] = useState(0);
  const [backlogTask, setBacklogTask] = useState([]);
  const [checklistVisibility, setChecklistVisibility] = useState([]);
  const [collapseAllVal, setCollapseAllVal] = useState(1);
  const [taskDetails, setTaskDetails] = useState({});
  const [deleteVal, setDeleteVal] = useState(0);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const user = localStorage.getItem("email");
  const statuses = ["todo", "progress", "done"];

  const fetchBacklog = async () => {
    const result = await getTask("backlog", timeStamp, user);
    setBacklogTask(result);
    setChecklistVisibility(Array(result?.length).fill(0));
  };

  useEffect(() => {
    fetchBacklog();
  }, [task, trigger, timeStamp]);

  useEffect(() => {
    handleCollapseAll();
  }, [collapseAllVal]);

  const handleCollapseAll = () => {
    const newVisibility = checklistVisibility.map(() =>
      collapseAllVal === 1 ? 1 : 0
    );
    setChecklistVisibility(newVisibility);
  };

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h5>Backlog</h5>
        <img
          src={collapseAll}
          onClick={() => {
            collapseAllVal === 1 ? setCollapseAllVal(0) : setCollapseAllVal(1);
          }}
          className={styles.collapse}
        />
      </div>

      <Card
        sectionTask={backlogTask}
        setTaskDetails={setTaskDetails}
        setTask={setTask}
        setTaskToDelete={setTaskToDelete}
        setDeleteVal={setDeleteVal}
        checklistVisibility={checklistVisibility}
        setChecklistVisibility={setChecklistVisibility}
        setSectionTask={setBacklogTask}
        setTrigger={setTrigger}
        trigger={trigger}
        statuses={statuses}
        section={"backlog"}
      />

      {task === 1 && (
        <Task
          setTask={setTask}
          taskDetails={taskDetails}
          setTaskDetails={setTaskDetails}
        />
      )}
      {deleteVal === 1 && (
        <Delete
          setDeleteVal={setDeleteVal}
          taskToDelete={taskToDelete}
          trigger={trigger}
          setTrigger={setTrigger}
        />
      )}
      <ToastContainer />
    </div>
  );
}

export default Backlog;
