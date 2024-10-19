import TaskInputPopup from "@/components/common/TaskInputPopup";
import styles from "@/styles/Dashboard.module.css";
import { useEffect, useReducer, useRef, useState } from "react";
import TasksList from "../TasksList";
import { taskReducer } from "@/reducers/taskReducer";

const Dashboard = ({ serverSideTasks }) => {
  const [data, dispatchData] = useReducer(taskReducer, [serverSideTasks]);
  const pageLoaded = useRef(false);

  const [showPopup, setShowPopup] = useState({
    show: false,
    editId: 0,
  });

  const onAddNewTaskClick = () => {
    setShowPopup({
      show: true,
      editId: 0,
    });
  };

  const handleClose = () => {
    setShowPopup({
      show: false,
      editId: 0,
    });
  };

  const editTask = (id) => {
    setShowPopup({
      show: true,
      editId: id,
    });
  };

  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem("tasks"));
    if (localData?.length > 0) {
      dispatchData({
        type: "REWRITE_DATA",
        payload: localData,
      });
    }
  }, []);

  useEffect(() => {
    if (pageLoaded.current) {
      localStorage.setItem("tasks", JSON.stringify(data));
    } else {
      pageLoaded.current = true;
    }
  }, [data]);

  return (
    <>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.h1}>Task Manager</h1>
          <p className={styles.p}>
            Your simple solution to manage tasks efficiently.
          </p>
        </header>
        <main>
          <button
            id="cta-button"
            className={styles.button}
            onClick={onAddNewTaskClick}
          >
            Add a New Task
          </button>
        </main>
      </div>
      <TasksList data={data} dispatchData={dispatchData} editTask={editTask} />
      {showPopup.show && (
        <TaskInputPopup
          closePopup={handleClose}
          dispatchData={dispatchData}
          editId={showPopup.editId}
        />
      )}
    </>
  );
};

export default Dashboard;
