import { useEffect, useState } from "react";
import { fetchTaskById, updateTaskQueueById } from "../../services/task";
import styles from "./Card.module.css";
import dots from "../../assets/icons/dots.png";
import arrowDown from "../../assets/icons/arrow-down.png";
import arrowUp from "../../assets/icons/arrow-up.png";
import lowPriorityImg from "../../assets/icons/green_circle.png";
import moderatePriorityImg from "../../assets/icons/blue_circle.png";
import highPriorityImg from "../../assets/icons/pink_circle.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { format } from "date-fns";

export const Card = ({
  sectionTask,
  setTaskDetails,
  setTask,
  setTaskToDelete,
  setDeleteVal,
  checklistVisibility,
  setChecklistVisibility,
  setSectionTask,
  setTrigger,
  trigger,
  statuses,
  section,
}) => {
  const [popUp, setPopUp] = useState([]);
  const sectionTaskLength = sectionTask.length;

  useEffect(() => {
    if (sectionTaskLength > 0) {
      setPopUp(Array(sectionTaskLength).fill(false));
    }
  }, [sectionTaskLength]);

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

  const openPopUp = (index) => {
    setPopUp((prev) => {
      const newPopUp = [...prev];
      newPopUp[index] = !newPopUp[index];
      return newPopUp;
    });
  };

  const fetchTask = async (taskId) => {
    const result = await fetchTaskById(taskId);
    setTaskDetails(result);
    setTask(1);
  };

  const handleDelete = (taskId) => {
    setTaskToDelete(taskId);
    setDeleteVal(1);
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return format(date, "MMM d");
  };

  const renderPriority = (priority) => {
    const priorityImages = {
      low: lowPriorityImg,
      moderate: moderatePriorityImg,
      high: highPriorityImg,
    };
    return (
      <>
        <img src={priorityImages[priority]} alt={`${priority} priority`} />
        <span className={styles.priority}>
          {priority.toUpperCase()} PRIORITY
        </span>
      </>
    );
  };

  const changeQueue = async (id, queue) => {
    const result = await updateTaskQueueById(id, queue);
    if (result) setTrigger(!trigger);
  };

  const renderStatusButtons = (item) => (
    <span className={styles.statusBox}>
      {statuses.map((status) => (
        <span
          key={status}
          className={styles.taskStatus}
          onClick={() => changeQueue(item?._id, status.toLowerCase())}
        >
          {status.toUpperCase()}
        </span>
      ))}
    </span>
  );

  const handleCheckbox = (event, taskIndex, checklistIndex) => {
    const updatedTasks = [...sectionTask];
    const checkedTasks = updatedTasks[taskIndex].checkedTasks;
    checkedTasks[checklistIndex] = event.target.checked;

    updatedTasks[taskIndex].checkedNumber += event.target.checked ? 1 : -1;
    setSectionTask(updatedTasks);
  };

  const renderChecklist = (item, index) => (
    <div
      className={styles.taskList}
      style={{ display: checklistVisibility[index] === 0 ? "none" : "block" }}
    >
      {item?.tasks.map((subItem, i) => (
        <div className={styles.taskBox} key={i}>
          <input
            type="checkbox"
            onChange={(e) => handleCheckbox(e, index, i)}
            checked={item?.checkedTasks[i]}
            className={styles.checkbox}
          />
          <p className={styles.taskInput}>{subItem}</p>
        </div>
      ))}
    </div>
  );

  const getDueDateStyles = (dueDate, section) => {
    if (section === "done") {
      return { background: "green", color: "white" };
    }

    if (!dueDate) return { background: "#DBDBDB", color: "black" };

    const [month, day] = dueDate.split(" ");
    const monthIndex = months.indexOf(month);
    const currentMonthIndex = new Date().getMonth();
    const currentDate = new Date().getDate();

    if (
      monthIndex < currentMonthIndex ||
      (monthIndex === currentMonthIndex && Number(day) < currentDate)
    ) {
      return { background: "#CF3636", color: "white" };
    } else {
      return { background: "#DBDBDB", color: "black" };
    }
  };
  const getUrl = (id) => {
    const url = new URL(window.location.href);
    const originurl = url.origin;
    const taskUrl = `${originurl}/view-task/${id}`;
    return taskUrl;
  };
  const renderTask = (item, index) => (
    <div className={styles.task} key={index}>
      <div className={styles.innerBox}>
        <div className={styles.boxOne}>
          <span>
            {renderPriority(item?.priority)}
            <span>
              {item?.assignedTo ? (
                <span title={item?.assignedTo} className={styles.assignedTo}>
                  {item?.assignedTo?.slice(0, 2)?.toUpperCase()}
                </span>
              ) : (
                <span></span>
              )}
            </span>
          </span>
          <img
            src={dots}
            onClick={() => openPopUp(index)}
            className={styles.popUpDots}
          />
        </div>

        {popUp[index] && (
          <div className={styles.popUp}>
            <button
              className={styles.edit}
              onClick={() => fetchTask(item?._id)}
            >
              Edit
            </button>

            <CopyToClipboard
              text={getUrl(item._id)}
              onCopy={() =>
                toast("Link Copied", {
                  position: "top-right",
                  autoClose: 4000,
                  hideProgressBar: true,
                  closeOnClick: false,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "colored",
                })
              }
            >
              <button className={styles.share}>Share</button>
            </CopyToClipboard>

            <button
              className={styles.delete}
              onClick={() => handleDelete(item?._id)}
            >
              Delete
            </button>
          </div>
        )}

        {item?.title?.length < 20 ? (
          <h4 className={styles.boxTwo}>{item?.title}</h4>
        ) : (
          <h4 className={styles.boxTwo} title={item?.title}>
            {item?.title?.slice(0, 19)}...
          </h4>
        )}

        <div className={styles.checklist}>
          <span>
            Checklist ({item?.checkedNumber} / {item?.tasks.length})
          </span>
          {checklistVisibility[index] === 0 ? (
            <img
              src={arrowDown}
              onClick={() => {
                let array = checklistVisibility;
                array[index] = 1;
                setChecklistVisibility([...array]);
              }}
              className={styles.expandCollapse}
            />
          ) : (
            <img
              src={arrowUp}
              onClick={() => {
                let array = checklistVisibility;
                array[index] = 0;
                setChecklistVisibility([...array]);
              }}
              className={styles.expandCollapse}
            />
          )}
        </div>

        {renderChecklist(item, index)}
        <div className={styles.dueDate}>
          {item?.dueDate !== null ? (
            <span
              style={getDueDateStyles(item?.dueDate, section)}
              className={styles.dateStatus}
            >
              {formatDate(item.dueDate)}
            </span>
          ) : (
            <span></span>
          )}
          {renderStatusButtons(item)}
        </div>
      </div>
    </div>
  );

  return (
    <div className={styles.taskContainer}>
      {sectionTask?.map((item, index) => renderTask(item, index))}
    </div>
  );
};
