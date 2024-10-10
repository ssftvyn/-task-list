import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import taskStore from './TaskStore';

const TaskModal = observer(({ onClose }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleAddTask = () => {
        if (title.trim()) {
            taskStore.addTask(title, description);
            taskStore.saveToLocalStorage();
            setTitle('');
            setDescription('');
            onClose();
        }
    };

    return (
        <div className="modal">
            <h2>Создать задачу</h2>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Введите название задачи"
            />
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Введите описание задачи"
            />
            <button onClick={handleAddTask}>Добавить задачу</button>
            <button onClick={onClose}>Закрыть</button>
        </div>
    );
});

export default TaskModal;
