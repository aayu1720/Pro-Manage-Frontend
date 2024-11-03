import React, { useEffect, useState } from "react";
import { getTask } from "../../services/task";
import styles from "./ToDo.module.css";
import collapseAll from "../../assets/icons/collapse-all.png";
import plus from "../../assets/icons/plus.png";
import Task from "../Task/Task";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Delete from "../Delete/Delete";
import { Card } from "../Card/Card";

const ToDo = ({ trigger, setTrigger, timeStamp }) => {
  const [task, setTask] = useState(0);
  const [toDoTask, setToDoTask] = useState([]);
  const [checklistVisibility, setChecklistVisibility] = useState([]);
  const [collapseAllVal, setCollapseAllVal] = useState(1);
  const [taskDetails, setTaskDetails] = useState({});
  const [deleteVal, setDeleteVal] = useState(0);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const user = localStorage.getItem("email");
  const statuses = ["backlog", "progress", "done"];

  const fetchToDo = async () => {
    const result = await getTask("todo", timeStamp, user);
    setToDoTask(result);
    setChecklistVisibility(Array(result?.length).fill(0));
  };

  useEffect(() => {
    fetchToDo();
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
        <h5>To Do</h5>
        <div className={styles.imgBox}>
          <img
            className={styles.plusImg}
            src={plus}
            onClick={() => setTask(1)}
          />
          <img
            src={collapseAll}
            onClick={() => {
              collapseAllVal === 1
                ? setCollapseAllVal(0)
                : setCollapseAllVal(1);
            }}
            className={styles.collapse}
          />
        </div>
      </div>

      <Card
        sectionTask={toDoTask}
        setTaskDetails={setTaskDetails}
        setTask={setTask}
        setTaskToDelete={setTaskToDelete}
        setDeleteVal={setDeleteVal}
        checklistVisibility={checklistVisibility}
        setChecklistVisibility={setChecklistVisibility}
        setSectionTask={setToDoTask}
        setTrigger={setTrigger}
        trigger={trigger}
        statuses={statuses}
        section={"toDo"}
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
};

export default ToDo;
