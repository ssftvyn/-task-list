import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import TaskItem from './TaskItem';
import TaskModal from './TaskModal'; 
import taskStore from './TaskStore';
import addIcon from "./icons/add.svg";
import deleteIcon from "./icons/delete.svg";

const TaskList = observer(() => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [subtaskTitle, setSubtaskTitle] = useState("");

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

    const handleRemoveTask = () => {
        if (selectedTask) {
            taskStore.removeTask(selectedTask.id);
            taskStore.saveToLocalStorage();
            setSelectedTask(null); 
        }
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
                                onClick={() => handleTaskClick(task)} 
                            />
                        </li>
                    ))}
                </ul>
                <div>
                    <button className ="create-button" onClick={() => setIsModalOpen(true)}>Создать новую задачу</button>
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
                            <button className="icon-button" onClick={handleRemoveTask}>
                                <img className="icon" src={deleteIcon} alt="Удалить задачу" />
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
});

export default TaskList;
