import React, { useEffect, useState } from 'react';
import { Form } from './components/Form';
import { List } from './components/List';
import { ITodo } from './interfaces';

const App: React.FunctionComponent = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);

  useEffect(() => {
    const saveToStorage = JSON.parse(localStorage.getItem('Todos') || '[]') as ITodo[]
    setTodos(saveToStorage);
  }, [])

  useEffect(() => {
    localStorage.setItem('Todos', JSON.stringify(todos));
  }, [todos])

  const addHandler = (title: string) => {

    const newTodo: ITodo = {
      title,
      id: Date.now(),
      completed: false
    }

    setTodos(prev => [newTodo, ...prev]);
  }

  const editHandler = (title: string) => {
    const editTodos = todos.filter(p => p.title !== title);
    console.log([...editTodos]);
    
    setTodos([...editTodos]);
  }

  const toggleHandler = (id: number) => {
    setTodos(todos.map(todo => {
          if (todo.id === id) {
            todo.completed = !todo.completed;
          }         
          return todo;
        })
    )
  }

  const deleteHandler = (id: number) => {
    const confirmDelete = window.confirm("This task will be deleted");
    if (confirmDelete) {
      setTodos(prev => prev.filter(todo => todo.id !== id));
    }
  }

  return (
  <>
    <header className="app__header"><h1>Todo App using React + Typescript</h1></header>
    <div className="app__container">
      <Form onAdd={addHandler} />
      <List 
        todos={todos} 
        onToggle={toggleHandler} 
        onDelete={deleteHandler} 
        onAdd={editHandler} 
      />
    </div>
    <footer className="app__footer">
      <h2>Have a nice day ;)</h2>
    </footer>
  </>
  );
}

export default App;
