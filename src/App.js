import React from 'react'
import Todo from './Components/Todo'
import './App.css'

function App() {
  return (
      <div className="App">
          <h2 className="logoToDo">
              <i>To Do List - React JS</i>
          </h2>
          <Todo />
      </div>
  );
}

export default App;
