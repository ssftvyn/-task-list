import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import taskStore from "./TaskStore";
import './styles.css'; 

const TaskItem = observer(({ task, onClick, level = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleCompletion = (e) => {
    e.stopPropagation();
    taskStore.toggleTaskCompletion(task.id);
    taskStore.saveToLocalStorage();
  };

  const toggleSubtaskList = () => {
    setIsOpen((prev) => !prev);
  };

  // Determine if all subtasks are completed
  const allSubtasksCompleted = task.subtasks.length > 0 && task.subtasks.every(subtask => subtask.completed);

  return (
    <div>
      <div className="task-names" style={{ marginLeft: `${level * 20}px` }}>
        {task.subtasks.length > 0 && (
          <button className="toggle-button" onClick={toggleSubtaskList}>
            {isOpen ? "▼" : "►"}
          </button>
        )}
        <div className="task-title" onClick={() => onClick(task)}>
          <span>{task.title}</span>
        </div>
        <input
          type="checkbox"
          checked={task.completed || allSubtasksCompleted}
          onChange={handleToggleCompletion}
        />
      </div>

      {isOpen && task.subtasks.length > 0 && (
        <ul>
          {task.subtasks.map((subtask) => (
            <TaskItem key={subtask.id} task={subtask} onClick={onClick} level={level + 1} />
          ))}
        </ul>
      )}
    </div>
  );
});

export default TaskItem;
