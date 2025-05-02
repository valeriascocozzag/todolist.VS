import React, { useState } from "react";

const Home = () => {

	const [todoList, setTodoList] = useState([]);
    const [newTodo, setNewTodo] = useState("");
 
    function HandlerPressKey(e) {
        if (e.key === "Enter") {
            setTodoList([...todoList, newTodo]);
            setNewTodo("");
        }
    }
    const HandleDelete = (indexToDelete) => {
        setTodoList(todoList.filter((_, index) => index !== indexToDelete))
    }

	return (
        <div className="box text-center">
            <div className="contenedor-principal">
                <h1 className="h1">To do List </h1>
                <input type="text" className="holder" placeholder="¿Qué necesitas hacer?" value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)} onKeyDown={HandlerPressKey}/>
                <ul className="todo-list">
                    {todoList.length === 0 ? (<li className="item empty">No hay tareas, añadir tareas</li>) : (todoList.map((todo, index) =>
                        (<li key={index} className="item">{todo}<span onClick={() => HandleDelete(index)} className="delete">✖</span></li>)))}
                </ul>
                <div className="footer">{todoList.length} {todoList.length === 1 ? "tarea por hacer" : "tareas por hacer"}</div>
            </div>
                <div className="first-hojita"></div>
                <div className="second-hojita"></div>
        </div>
    );
}

export default Home;