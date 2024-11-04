import React, { useEffect, useState } from "react";
import { saveTask, updateTask, getAssignee } from "../../services/task";
import styles from "./Task.module.css";
import pinkCircle from "../../assets/icons/pink_circle.png";
import greenCircle from "../../assets/icons/green_circle.png";
import blueCircle from "../../assets/icons/blue_circle.png";
import plus from "../../assets/icons/plus.png";
import del from "../../assets/icons/delete.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const priorities = [
  { id: "high", label: "HIGH PRIORITY", icon: pinkCircle },
  { id: "moderate", label: "MODERATE PRIORITY", icon: blueCircle },
  { id: "low", label: "LOW PRIORITY", icon: greenCircle },
];

const CustomDropdown = ({ options, onSelect, selectedValue }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className={styles.assigneeDropdown}>
      <div className={styles.selected} onClick={toggleDropdown}>
        {selectedValue || "Select Assignee"}
      </div>
      {isOpen && (
        <div className={styles.options}>
          {options.map((option) => (
            <div
              key={option.email}
              className={styles.optiondropdown}
              onClick={() => handleOptionClick(option.email)}
            >
              <span className={styles.initials}>
                {option.email.substring(0, 2)?.toUpperCase()}{" "}
              </span>
              <span className={styles.email}>{option.email}</span>
              <span className={styles.assigneebtn}>Assign</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

function Task({ setTask, taskDetails, setTaskDetails }) {
  const [checklistArr, setChecklistArr] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const [assignee, setAssignee] = useState([]);
  const [inputType, setInputType] = useState("text");
  const [taskData, setTaskData] = useState({
    title: taskDetails?.title || "",
    priority: taskDetails?.priority || "",
    assignedTo: taskDetails?.assignedTo || "",
    queue: taskDetails?.queue || "todo",
    tasks: taskDetails?.tasks || [],
    dueDate: taskDetails?.dueDate ? new Date(taskDetails.dueDate) : null,
    checkedTasks: taskDetails?.checkedTasks || [],
    checkedNumber: taskDetails?.checkedNumber || 0,
    user: taskDetails?.email || email,
  });
  useEffect(() => {
    localStorage.removeItem("isTaskCreated");

    if (taskData.priority) {
      document
        .getElementById(taskData.priority)
        .setAttribute("style", `background: #EEECEC;`);
    }

    if (taskDetails?._id) {
      const checklist = Array.from(
        { length: taskDetails.tasks.length },
        (_, i) => i
      );
      setChecklistArr(checklist);
    }

    fetchAssignee();
  }, [taskData.priority, taskDetails]);

  const fetchAssignee = async () => {
    const result = await getAssignee();
    setAssignee(result);
  };

  const addTask = () => {
    const arr = [...checklistArr];
    const tasks = [...taskData.tasks];
    const checkedTasks = [...taskData.checkedTasks];

    if (arr.length === 0) {
      arr.push(0);
    } else {
      arr.push(arr.at(-1) + 1);
    }
    tasks.push("");
    checkedTasks.push(false);
    setTaskData({ ...taskData, tasks, checkedTasks });
    setChecklistArr(arr);
  };

  const handleCheckbox = (event, item) => {
    const checkedTasks = [...taskData.checkedTasks];
    const checkedNumber =
      taskData.checkedNumber + (event.target.checked ? 1 : -1);

    checkedTasks[item] = event.target.checked;
    setTaskData({ ...taskData, checkedTasks, checkedNumber });
  };

  const handleChange = (e) => {
    const { name, value, id } = e.target;

    if (name === "title") {
      setTaskData({ ...taskData, title: value });
    }

    if (name === "priority") {
      setTaskData({ ...taskData, priority: id });

      priorities.forEach((priority) => {
        document
          .getElementById(priority.id)
          .setAttribute(
            "style",
            priority.id === id ? `background: #EEECEC;` : `background: none;`
          );
      });
    }
  };

  const deleteTask = (item) => {
    const arr = [...checklistArr];
    const tasks = [...taskData.tasks];
    const checkedTasks = [...taskData.checkedTasks];
    const checkedNumber = taskData.checkedNumber - (checkedTasks[item] ? 1 : 0);

    arr.splice(item, 1);
    tasks.splice(item, 1);
    checkedTasks.splice(item, 1);
    setTaskData({ ...taskData, tasks, checkedTasks, checkedNumber });
    setChecklistArr(arr);
  };

  const handleTaskChange = (e, item) => {
    const tasks = [...taskData.tasks];

    tasks[item] = e.target.value;
    setTaskData({ ...taskData, tasks });
  };

  const handleCancel = () => {
    setTask(0);
    setTaskDetails({});
  };

  const chooseDate = (date) => {
    setSelectedDate(date);
    setTaskData({ ...taskData, dueDate: date });
  };
  const handleAssigneeAssign = (email) => {
    setTaskData({ ...taskData, assignedTo: email });
  };

  const handleSubmit = async () => {
    if (!taskData.title) {
      toast("Please enter the title", {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    if (!taskData.priority) {
      toast("Please enter the priority", {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    if (!taskData.tasks.length || !taskData.tasks[0]) {
      toast("Please enter the first task", {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    for (const val of taskData.tasks) {
      if (!val) {
        toast("Tasks can't be empty", {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        return;
      }
    }

    if (taskDetails?._id) {
      await updateTask(taskDetails?._id, taskData);
      setTaskDetails({});
      setTask(0);
      return;
    }

    const result = await saveTask(taskData);
    setTaskDetails({});
    setTask(0);
  };

  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <div className={styles.innerBox}>
          <label className={styles.label}>
            Title <span className={styles.asterisk}>*</span>
          </label>

          <input
            className={styles.input}
            name="title"
            id="title"
            placeholder="Enter Task Title"
            value={taskData.title}
            onChange={handleChange}
            type={"text"}
          />

          <div className={styles.priorityBox}>
            <label className={styles.label}>
              Select Priority <span className={styles.asterisk}>*</span>
            </label>
            {priorities.map((priority) => (
              <button
                key={priority.id}
                className={styles.button}
                name="priority"
                id={priority.id}
                onClick={handleChange}
              >
                <img src={priority.icon} className={styles[priority.id]} />
                {priority.label}
              </button>
            ))}
          </div>

          <div className={styles.assignee}>
            <label className={styles.assigneeLabel} htmlFor="assignee">
              Assign to
            </label>
            <CustomDropdown
              options={assignee}
              onSelect={handleAssigneeAssign}
              selectedValue={taskData.assignedTo}
            />
          </div>

          <label className={styles.label}>
            Checklist ({taskData?.checkedNumber}/{checklistArr?.length})
            <span className={styles.asterisk}>*</span>
          </label>

          <div className={styles.checklistBox}>
            {checklistArr?.map((item, index) => (
              <div key={item} className={styles.task}>
                <span className={styles.taskBox}>
                  <input
                    type="checkbox"
                    onChange={(event) => handleCheckbox(event, item)}
                    name="checkbox"
                    id={item}
                    checked={taskData?.checkedTasks[item]}
                    className={styles.checkbox}
                  />

                  <input
                    className={styles.taskInput}
                    name="task"
                    value={taskData?.tasks[item]}
                    onChange={(e) => handleTaskChange(e, item)}
                    type={"text"}
                    placeholder="Add a Task"
                  />
                </span>
                <img src={del} onClick={() => deleteTask(item)} />
              </div>
            ))}
          </div>

          <button className={styles.addNew} onClick={addTask}>
            <img className={styles.plusImg} src={plus} />
            Add New
          </button>
        </div>

        <div className={styles.buttonContainer}>
          <input
            className={styles.datepicker}
            type={inputType}
            onFocus={() => setInputType("date")}
            onBlur={() => setInputType("text")}
            placeholder="Select Due Date"
            value={
              taskData.dueDate instanceof Date && !isNaN(taskData.dueDate)
                ? taskData.dueDate.toISOString().split("T")[0]
                : ""
            }
            onChange={(e) => {
              const newDate = new Date(e.target.value);
              chooseDate(newDate);
            }}
          />
          <span className={styles.buttons}>
            <button className={styles.cancel} onClick={handleCancel}>
              Cancel
            </button>
            <button className={styles.save} onClick={handleSubmit}>
              Save
            </button>
          </span>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Task;
