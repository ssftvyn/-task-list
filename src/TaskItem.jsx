import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import taskStore from "./TaskStore";

const TaskItem = observer(({ task, onClick }) => {
    const [subtaskTitle, setSubtaskTitle] = useState("");
  
    const handleToggleCompletion = (e) => {
      e.stopPropagation();
      taskStore.toggleTaskCompletion(task.id);
      taskStore.saveToLocalStorage();
    };
  
    const handleAddSubtask = () => {
      if (subtaskTitle.trim()) {
        taskStore.addSubtask(task.id, subtaskTitle);
        taskStore.saveToLocalStorage();
        setSubtaskTitle("");
      }
    };
  
    return (
      <li>
        <label>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={handleToggleCompletion}
          />
        </label>
        <span onClick={onClick} style={{ cursor: "pointer" }}>
          {task.title}
        </span>
        <button onClick={() => {
          taskStore.removeTask(task.id);
          taskStore.saveToLocalStorage();
        }}>Удалить задачу</button>
  
        {task.subtasks.length > 0 && (
          <ul>
            {task.subtasks.map((subtask) => (
              <li key={subtask.id}>
                <label>
                  <input
                    type="checkbox"
                    checked={subtask.completed}
                    onChange={() => {
                      taskStore.toggleTaskCompletion(subtask.id);
                      taskStore.saveToLocalStorage();
                    }}
                  />
                  {subtask.title}
                </label>
                <button onClick={() => {
                  taskStore.removeTask(subtask.id);
                  taskStore.saveToLocalStorage();
                }}>Удалить подзадачу</button>
              </li>
            ))}
          </ul>
        )}
        <div className="subtask-form">
          <input
            type="text"
            value={subtaskTitle}
            onChange={(e) => setSubtaskTitle(e.target.value)}
            placeholder="Введите название подзадачи"
          />
          <button onClick={handleAddSubtask}>Добавить подзадачу</button>
        </div>
      </li>
    );
  });
  

export default TaskItem;
