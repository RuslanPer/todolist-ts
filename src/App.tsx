import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";

function App() {

    const tasks1 = [
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false},
    ];

    const tasks2 = [
        {id: 1, title: 'Hello world', isDone: true},
        {id: 2, title: 'I am happy', isDone: false},
        {id: 3, title: 'You', isDone: false},
    ]

    return (
        <div className="App">
            <Todolist title={'What to learn1'} tasks={tasks1}/>
            <Todolist title={123} tasks={tasks2}/>
        </div>
    );
}

export default App;