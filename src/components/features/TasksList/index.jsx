import { constants } from "@/constants";
import styles from "@/styles/TasksList.module.css";
import { useEffect, useMemo, useState } from "react";

const TasksList = ({ data, dispatchData, editTask }) => {
  const [localData, setLocalData] = useState(data);

  useEffect(() => {
    setLocalData(data);
  }, [data]);

  const toggleComplete = (id) => {
    dispatchData({
      type: "TOGGLE_COMPLETE",
      payload: { id },
    });
  };

  const deleteTask = (id) => {
    dispatchData({
      type: "DELETE_TASK",
      payload: { id },
    });
  };

  const handleSelectChange = (e) => {
    let sortedArray = [];
    localData.forEach((i) => {
      if (i.priority == e.target.value) {
        sortedArray.unshift(i);
      } else {
        sortedArray.push(i);
      }
    });
    setLocalData(sortedArray);
  };

  const handleOnChange = (e) => {
    setLocalData(
      e.target.value
        ? data.filter(
            (i) =>
              i.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
              i.desc.toLowerCase().includes(e.target.value.toLowerCase())
          )
        : data
    );
  };

  function myDebouncedFun(fn, delay) {
    let timer;
    return function (e) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn.call(this, e);
      }, delay);
    };
  }
  const debouncedFun = myDebouncedFun(handleOnChange, 300);

  return (
    <div className={styles.parent_container}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.h1}>Your Tasks</h1>
          <p className={styles.p}>Manage your tasks efficiently.</p>
          <div className={styles.filters}>
            <div>
              <span className={styles.p}>Search task with Title/Desc:</span>{" "}
              <input
                type="text"
                className={styles.textInput}
                onChange={(e) => debouncedFun(e)}
              />
            </div>
            <div>
              <span className={styles.p}>Sort by priority: </span>
              <select
                className={styles.textInput}
                onChange={handleSelectChange}
              >
                <option value="" disabled selected>
                  Select an option
                </option>
                <option value={2}>High</option>
                <option value={1}>Medium</option>
                <option value={0}>Low</option>
              </select>
            </div>
          </div>
        </header>
        <main className={styles.main}>
          <ul className={styles.task_list}>
            {localData?.length
              ? localData.map((task) => (
                  <li className={styles.task_item} data-completed="false">
                    <div className={styles.task_details}>
                      <div>
                        {" "}
                        <span
                          className={`${styles.task_title} ${
                            task.completed ? styles.completed : ""
                          }`}
                        >
                          {task?.title}
                        </span>
                        <span
                          className={`${styles.task_priority} ${
                            styles[constants.priority[task?.priority]]
                          }`}
                        >
                          {constants.priority[task?.priority]}
                        </span>
                      </div>

                      <div className={styles.desc}>
                        {task.desc.slice(0, 100)}
                        {task.desc.length > 100 && "..."}
                      </div>
                    </div>
                    <div className={styles.task_actions}>
                      <button
                        className="complete-btn"
                        onClick={() => toggleComplete(task.id)}
                      >
                        {task.completed ? "❌" : "✅"}
                      </button>
                      <button
                        className="edit-btn"
                        onClick={() => editTask(task.id)}
                      >
                        ✏️
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => deleteTask(task.id)}
                      >
                        🗑️
                      </button>
                    </div>
                  </li>
                ))
              : "No Tasks Yet"}
          </ul>
        </main>
      </div>
    </div>
  );
};

export default TasksList;
