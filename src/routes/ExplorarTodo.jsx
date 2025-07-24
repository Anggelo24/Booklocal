import React from 'react';
import '../styles/panelprofesional.css'; 
import ExplorarTodoComponent from '../components/explorarTodos'

const ExplorarTodo = () => {
  return (
    <>
    <div className="dashboard-wrapper" style={{ paddingTop: '120px' }}>
    <ExplorarTodoComponent />
    </div>
    </>
  );
};

export default ExplorarTodo;
