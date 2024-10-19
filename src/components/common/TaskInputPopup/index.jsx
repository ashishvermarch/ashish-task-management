import styles from "@/styles/TaskInputPopup.module.css";
import { useEffect, useState } from "react";

const TaskInputPopup = ({ closePopup, dispatchData, editId }) => {
  const [values, setValues] = useState({
    title: "",
    desc: "",
    priority: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!!values.priority) {
      dispatchData({
        type: editId != 0 ? "UPDATE_TASK" : "ADD_TASK",
        payload: values,
      });
      e.target.reset();
      closePopup();
    } else {
      alert("Please select priority of the task");
    }
  };

  useEffect(() => {
    if (editId != 0) {
      const data = JSON.parse(localStorage.getItem("tasks"));
      const dataToBeEdited = data.find((i) => i.id === editId);
      setValues(dataToBeEdited);
    }
  }, [editId]);

  const handleValuesChange = (e) => {
    setValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className={styles.parent_container}>
      <div className={styles.container}>
        <h1 className={styles.h1}>{editId != 0 ? "Update" : "Add"} a Task</h1>
        <form id="task-form" onSubmit={handleSubmit}>
          <div className={styles.form_group}>
            <label for="title" className={styles.label}>
              Title:
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              className={styles.textInput}
              value={values?.title}
              onChange={handleValuesChange}
            />
          </div>
          <div className={styles.form_group}>
            <label for="desc" className={styles.label}>
              Description:
            </label>
            <textarea
              id="desc"
              name="desc"
              required
              className={styles.textarea}
              value={values?.desc}
              onChange={handleValuesChange}
            ></textarea>
          </div>
          <div className={styles.form_group}>
            <label className={styles.label}>Priority:</label>
            <div className={styles.radio_group}>
              <label className={styles.label}>
                <input
                  type="radio"
                  name="priority"
                  value={2}
                  checked={values?.priority == 2}
                  onChange={handleValuesChange}
                />
                High
              </label>
              <label className={styles.label}>
                <input
                  type="radio"
                  name="priority"
                  value={1}
                  checked={values?.priority == 1}
                  onChange={handleValuesChange}
                />
                Medium
              </label>
              <label className={styles.label}>
                <input
                  type="radio"
                  name="priority"
                  value={0}
                  checked={values?.priority == 0}
                  onChange={handleValuesChange}
                />
                Low
              </label>
            </div>
          </div>
          <span className={styles.close} onClick={closePopup}>
            ❌
          </span>
          <button type="submit" className={styles.button}>
            {editId != 0 ? "Update" : "Add"} Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskInputPopup;
