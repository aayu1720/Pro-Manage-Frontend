import React, { useEffect, useState } from "react";
import styles from "./SharedTask.module.css";
import lowPriorityImg from "../../assets/icons/green_circle.png";
import moderatePriorityImg from "../../assets/icons/blue_circle.png";
import highPriorityImg from "../../assets/icons/pink_circle.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SharedTask({ taskDetails }) {
  const [day, setDay] = useState(new Date().getDate());
  const [month, setMonth] = useState("");

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  useEffect(() => {
    const today = new Date();
    setMonth(months[today.getMonth()]);
  }, []);

  return (
    <div className={styles.task}>
      <div className={styles.innerBox}>
        <div className={styles.boxOne}>
          {taskDetails?.priority === "low" && <img src={lowPriorityImg} />}
          {taskDetails?.priority === "moderate" && (
            <img src={moderatePriorityImg} />
          )}
          {taskDetails?.priority === "high" && <img src={highPriorityImg} />}
          <span className={styles.priority}>
            {taskDetails?.priority?.toUpperCase()} PRIORITY
          </span>
        </div>

        <h4 className={styles.boxTwo}>{taskDetails?.title}</h4>
        <div className={styles.checklist}>
          <span>
            Checklist ({taskDetails?.checkedNumber} /{" "}
            {taskDetails?.tasks?.length})
          </span>
        </div>

        <div className={styles.checklistBox}>
          {taskDetails?.tasks?.map((subItem, index) => {
            return (
              <div className={styles.taskBox}>
                <input
                  type="checkbox"
                  name="checkbox"
                  checked={taskDetails?.checkedTasks[index]}
                  className={styles.checkbox}
                  onClick={() =>
                    toast("Read Only!", {
                      position: "top-center",
                      autoClose: 5000,
                      hideProgressBar: true,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "colored",
                    })
                  }
                />

                <p className={styles.taskInput} name="task" type={"text"}>
                  {subItem}
                </p>
              </div>
            );
          })}
        </div>

        {taskDetails?.dueDate !== null ? (
          <div className={styles.dueDate}>
            <p className={styles.dateStyle}>Due Date</p>
            <span className={styles.dateStatus}>{taskDetails?.dueDate}</span>
          </div>
        ) : (
          <span></span>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default SharedTask;
