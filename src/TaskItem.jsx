import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import taskStore from "./TaskStore";
import addIcon from "./icons/add.svg";
import deleteIcon from "./icons/delete.svg";

const TaskItem = observer(({ task, onClick }) => {
  const [subtaskTitle, setSubtaskTitle] = useState("");
  const [isOpen, setIsOpen] = useState(false);

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

  const toggleSubtaskList = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div>
    <div className="task-names">
    <div>
      <span onClick={onClick} style={{ cursor: "pointer" }}>
        {task.title}
      </span>
      <button
        className="icon-button"
        onClick={() => {
          taskStore.removeTask(task.id);
          taskStore.saveToLocalStorage();
        }}
      >
        <img className="icon" src={deleteIcon} alt="Удалить задачу" />
      </button>
      </div>
      <div>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleToggleCompletion}
        />
        </div>
        </div>

      {/* Кнопка для сворачивания/разворачивания списка подзадач */}
      {task.subtasks.length > 0 && (
        <>
          <button onClick={toggleSubtaskList}>{isOpen ? "▼" : "►"}</button>
          {isOpen && (
            <ul>
              {task.subtasks.map((subtask) => (
                <TaskItem key={subtask.id} task={subtask} onClick={() => {}} />
              ))}
            </ul>
          )}
        </>
      )}
      <div className="subtask-form">
        <input
          type="text"
          value={subtaskTitle}
          onChange={(e) => setSubtaskTitle(e.target.value)}
          placeholder="Введите название подзадачи"
        />
        <button className="icon-button" onClick={handleAddSubtask}>
          <img className="icon" src={addIcon} alt="Добавить подзадачу" />
        </button>
      </div>
    </div>
  );
});

export default TaskItem;
