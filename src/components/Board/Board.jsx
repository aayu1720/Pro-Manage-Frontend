import React, { useEffect, useState } from "react";
import Backlog from "../Backlog/Backlog";
import InProgress from "../InProgress/InProgress";
import Done from "../Done/Done";
import styles from "./Board.module.css";
import addPeopleImg from "../../assets/icons/addPeople.png";
import ToDo from "../ToDo/ToDo";
import AddPeople from "../AddPeople/AddPeople";

function Board() {
  const [name, setName] = useState(localStorage.getItem("name"));
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [trigger, setTrigger] = useState(true);
  const [addPeople, setAddPeople] = useState(0);
  const [timeStamp, setTimeStamp] = useState("This Week");

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

    setDay(today.getDate());
    setMonth(months[today.getMonth()]);
    setYear(today.getFullYear());
  }, []);

  const handleAddPeople = () => {
    setAddPeople(1);
  };

  const handleTimeStampChange = (e) => {
    if (e.target.value === "Today") {
      setTimeStamp(e.target.value);
    }
    if (e.target.value === "This Week") {
      setTimeStamp(e.target.value);
    }
    if (e.target.value === "This Month") {
      setTimeStamp(e.target.value);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.nameDisplay}>
        <span className={styles.welcomeMessage}>Welcome! {name}</span>
        <span className={styles.date}>
          {day} {month}, {year}
        </span>
      </div>

      <div className={styles.heading}>
        <div className={styles.board}>
          <h2>Board</h2>
          <span className={styles.addPeople} onClick={handleAddPeople}>
            <img src={addPeopleImg} />
            Add People
          </span>
        </div>

        <select
          className={styles.selectTime}
          type="text"
          name="timestamp"
          value={timeStamp}
          onChange={(e) => handleTimeStampChange(e)}
        >
          <option className={styles.option} id="today">
            Today
          </option>
          <option selected className={styles.option} id="week">
            This Week
          </option>
          <option className={styles.option} id="month">
            This Month
          </option>
        </select>
      </div>

      <div className={styles.ticketContainer}>
        <Backlog
          trigger={trigger}
          setTrigger={setTrigger}
          timeStamp={timeStamp}
        />
        <ToDo trigger={trigger} setTrigger={setTrigger} timeStamp={timeStamp} />
        <InProgress
          trigger={trigger}
          setTrigger={setTrigger}
          timeStamp={timeStamp}
        />
        <Done trigger={trigger} setTrigger={setTrigger} timeStamp={timeStamp} />
      </div>

      {addPeople === 1 && <AddPeople setAddPeople={setAddPeople} />}
    </div>
  );
}

export default Board;
