import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import taskStore from './TaskStore';
import TaskModal from './TaskModal';
import addIcon from "./icons/add.svg";
import './styles.css';

const TaskList = observer(() => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [subtaskTitle, setSubtaskTitle] = useState("");
  const [checkedTasks, setCheckedTasks] = useState(new Set());

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setSubtaskTitle("");
  };

  const handleAddSubtask = () => {
    if (subtaskTitle.trim() && selectedTask) {
      taskStore.addSubtask(selectedTask.id, subtaskTitle);
      taskStore.saveToLocalStorage();
      setSubtaskTitle("");
    }
  };

  const handleCheckChange = (id) => {
    const task = taskStore.findTaskById(id); 
    const isChecked = checkedTasks.has(id);

    if (isChecked) {
      const newCheckedTasks = new Set(checkedTasks);
      newCheckedTasks.delete(id);
      task.subtasks.forEach(subtask => newCheckedTasks.delete(subtask.id));
      setCheckedTasks(newCheckedTasks);
    } else {
      const newCheckedTasks = new Set(checkedTasks);
      newCheckedTasks.add(id);
      task.subtasks.forEach(subtask => newCheckedTasks.add(subtask.id));
      setCheckedTasks(newCheckedTasks);
    }
  };

  const handleDeleteChecked = () => {
    checkedTasks.forEach((id) => {
      const parentTask = taskStore.findParentTask(id);
      if (parentTask) {
        parentTask.subtasks = parentTask.subtasks.filter(subtask => subtask.id !== id);
      } else {
        taskStore.removeTask(id);
      }
    });
    taskStore.saveToLocalStorage();
    setCheckedTasks(new Set());
  };

  return (
    <div className="task-list-container">
      <div className="task-list">
        {isModalOpen && <TaskModal onClose={() => setIsModalOpen(false)} />}
        <ul>
          {taskStore.tasks.map(task => (
            <li key={task.id}>
              <TaskItem 
                task={task} 
                onClick={handleTaskClick} 
                checked={checkedTasks.has(task.id) || task.subtasks.every(subtask => checkedTasks.has(subtask.id))}
                onCheck={handleCheckChange}
                checkedTasks={checkedTasks}
              />
            </li>
          ))}
        </ul>
        <div>
          <button className="create-button" onClick={() => setIsModalOpen(true)}>Создать новую задачу</button>
          <button className="delete-button" onClick={handleDeleteChecked}>Удалить отмеченные</button>
        </div>
      </div>
      <div className="task-details">
        {selectedTask && (
          <>
            <h3>{selectedTask.title}</h3>
            <p>{selectedTask.description}</p>
            <div>
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
          </>
        )}
      </div>
    </div>
  );
});

const TaskItem = observer(({ task, onClick, level = 0, checked, onCheck, checkedTasks }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSubtaskList = () => {
    setIsOpen((prev) => !prev);
  };

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
          checked={checked}
          onChange={() => onCheck(task.id)}
        />
      </div>

      {isOpen && task.subtasks.length > 0 && (
        <ul>
          {task.subtasks.map((subtask) => (
            <TaskItem 
              key={subtask.id} 
              task={subtask} 
              onClick={onClick} 
              level={level + 1} 
              checked={checkedTasks.has(subtask.id)}
              onCheck={onCheck}
              checkedTasks={checkedTasks}
            />
          ))}
        </ul>
      )}
    </div>
  );
});

export default TaskList;
