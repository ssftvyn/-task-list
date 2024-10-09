import React from 'react';
import TaskList from './TaskList.jsx';
import './styles.css'; 

const App = () => {
    return (
        <div className="app">
            <h1>Менеджер задач</h1>
            <TaskList />
        </div>
    );
};

export default App;
