import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import taskStore from "./TaskStore";

const TaskForm = observer(() => {
  const [taskTitle, setTaskTitle] = useState("");

  const handleAddTask = () => {
    if (taskTitle.trim()) {
      taskStore.addTask(taskTitle);
      taskStore.saveToLocalStorage();
      setTaskTitle("");
    }
  };

  return (
    <div className="task-form">
      <input
        type="text"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        placeholder="Введите название задачи"
      />
      <button onClick={handleAddTask}>Добавить задачу</button>
    </div>
  );
});

export default TaskForm;
