import React from 'react';
import { observer } from 'mobx-react-lite';
import taskStore from './TaskStore';

const TaskItem = observer(({ task }) => {
    const handleToggleCompletion = () => {
        taskStore.toggleTaskCompletion(task.id);
        taskStore.saveToLocalStorage(); 
    };

    return (
        <li>
            <label>
                <input 
                    type="checkbox" 
                    checked={task.completed} 
                    onChange={handleToggleCompletion} 
                /> 
                {task.title}
            </label>
            {task.subtasks.length > 0 && (
                <ul>
                    {task.subtasks.map(subtask => (
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
                        </li>
                    ))}
                </ul>
            )}
        </li>
    );
});

export default TaskItem;
