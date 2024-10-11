import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import taskStore from "./TaskStore";
import './styles.css'; 

const TaskItem = observer(({ task, onClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleCompletion = (e) => {
    e.stopPropagation();
    taskStore.toggleTaskCompletion(task.id);
    taskStore.saveToLocalStorage();
  };

  const toggleSubtaskList = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div>
      <div className="task-names">
        {task.subtasks.length > 0 && (
          <button className="toggle-button" onClick={toggleSubtaskList}>
            {isOpen ? "▼" : "►"}
          </button>
        )}
        <div className="task-title" onClick={onClick}>
          <span>{task.title}</span>
        </div>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleToggleCompletion}
        />
      </div>

      {isOpen && task.subtasks.length > 0 && (
        <ul>
          {task.subtasks.map((subtask) => (
            <TaskItem key={subtask.id} task={subtask} onClick={() => {}} />
          ))}
        </ul>
      )}
    </div>
  );
});

export default TaskItem;
