import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import TaskItem from './TaskItem';
import TaskModal from './TaskModal'; 
import taskStore from './TaskStore';

const TaskList = observer(() => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    const handleTaskClick = (task) => {
        setSelectedTask(task);
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
                    </>
                )}
            </div>
        </div>
    );
});

export default TaskList;
