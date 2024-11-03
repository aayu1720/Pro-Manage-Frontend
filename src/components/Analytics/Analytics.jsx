import React, { useEffect, useState } from "react";
import { getDetails } from "../../services/task";
import styles from "./Analytics.module.css";
import analytics from "../../assets/icons/analytics.png";

function Analytics() {
  const [info, setInfo] = useState({});
  const [user, setUser] = useState(localStorage.getItem("email"));

  const fetchDetails = async () => {
    let result = await getDetails(user);
    setInfo({ ...result });
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>Analytics</h3>
      <div className={styles.subContainer}>
        <div className={styles.boxOne}>
          <div className={styles.subBoxOne}>
            <div className={styles.data}>
              <div className={styles.info}>
                <img src={analytics} className={styles.analyticsImg} />
                Backlog Tasks
              </div>
              <span>{info?.backlogTasks}</span>
            </div>

            <div className={styles.data}>
              <div className={styles.info}>
                <img src={analytics} className={styles.analyticsImg} />
                To-do Tasks
              </div>
              <span>{info?.todoTasks}</span>
            </div>

            <div className={styles.data}>
              <div className={styles.info}>
                <img src={analytics} className={styles.analyticsImg} />
                In-Progress Tasks
              </div>
              <span>{info?.progressTasks}</span>
            </div>

            <div className={styles.data}>
              <div className={styles.info}>
                <img src={analytics} className={styles.analyticsImg} />
                Completed Tasks
              </div>
              <span>{info?.completedTasks}</span>
            </div>
          </div>
        </div>

        <div className={styles.boxTwo}>
          <div className={styles.subBoxTwo}>
            <div className={styles.data}>
              <div className={styles.info}>
                <img src={analytics} className={styles.analyticsImg} />
                Low Priority
              </div>
              <span>{info?.lowPriority}</span>
            </div>
            <div className={styles.data}>
              <div className={styles.info}>
                <img src={analytics} className={styles.analyticsImg} />
                Moderate Priority
              </div>
              <span>{info?.moderatePriority}</span>
            </div>
            <div className={styles.data}>
              <div className={styles.info}>
                <img src={analytics} className={styles.analyticsImg} />
                High Priority
              </div>
              <span>{info?.highPriority}</span>
            </div>
            <div className={styles.data}>
              <div className={styles.info}>
                <img src={analytics} className={styles.analyticsImg} />
                Due Date Tasks
              </div>
              <span>{info?.dueDateTasks}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
