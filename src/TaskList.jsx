import React from 'react';
import { observer } from 'mobx-react-lite';
import TaskItem from './TaskItem';
import taskStore from './TaskStore';

const TaskList = observer(() => {
    return (
        <div className="task-list">
            <h2>Список задач</h2>
            <ul>
                {taskStore.tasks.map(task => (
                    <TaskItem key={task.id} task={task} />
                ))}
            </ul>
        </div>
    );
});

export default TaskList;
