
import React, { useEffect, useState } from "react";

const Home = () => {
    const [todoList, setTodoList] = useState(["Limpiar la casa", "Lavar los platos", "Hacer la compra"]);
    const [newTodo, setNewTodo] = useState("");
    const [flagDelete, setFlagDelete] = useState(null);
    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            fetch("https://playground.4geeks.com/todo/todos/scocozzav", {
                method: "POST",
                body: JSON.stringify({
                    "label": newTodo,
                    "is_done": false
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then((response) => response.json())

            setNewTodo("");
            fetch("https://playground.4geeks.com/todo/users/scocozzav")
                .then((response) => response.json())
                .then((data) => setTodoList(data.todos))
        }
        console.log([...todoList, newTodo]);
    }
    const handleDelete = (taskId) => {
        fetch("https://playground.4geeks.com/todo/todos/" + taskId, {
            method: "DELETE"
        })
            .then((response) => {
                if (response.ok) {
                    console.log("Tarea Eliminada")
                    fetch("https://playground.4geeks.com/todo/users/scocozzav")
                        .then((response) => response.json())
                        .then((data) => setTodoList(data.todos))
                }
            })
    }
    const panic = async () => {
        fetch("https://playground.4geeks.com/todo/users/scocozzav", {
            method: "DELETE"
        })
            .then(async (response) => {
                if (response.ok) {
                    console.log("Eliminacion correcta")
                    await fetch("https://playground.4geeks.com/todo/users/scocozzav", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        }
                    })
                }
            }).then(async () => {
                await fetch("https://playground.4geeks.com/todo/users/scocozzav")
                    .then((response) => response.json())
                    .then((data) => setTodoList(data.todos)
                    )
            })
    }
    useEffect(() => {
        fetch("https://playground.4geeks.com/todo/users/scocozzav")
            .then((response) => response.json())
            .then((data) => setTodoList(data.todos))
    }, [])
    return (
        <div className="box">
            <div className="contenedor-principal">
                <h1 className="text-center mt-5 display-5 fw-lighter"><i className="fa-solid fa-list"></i> To do List </h1>
                <p className="display-1">
                </p>
                <div className="wrapper" id="container">
                    <ul>
                        <li><input
                            type="text"
                            placeholder="What need to be done"
                            className="d-flex justify-between py-3 px-5 w-100 bg-light border-bottom border-1"
                            value={newTodo}
                            onChange={((e) => setNewTodo(e.target.value))}
                            onKeyDown={(e) => (handleKeyPress(e))}
                        />
                        </li>
                        {todoList.map((item) => (
                                <li key={item.id}
                                    className="d-flex justify-between py-2 px-5 w-100 border-bottom border-1 position-relative bg-light"
                                    onMouseOver={() => (setFlagDelete(item.id))}
                                    onMouseLeave={() => (setFlagDelete(null))}
                                ><span className="py-2">{item.label}</span>
                                    {flagDelete === item.id && <small className="mx-3 text-end position-absolute top-50 end-0 translate-middle-y" onClick={() => (handleDelete(item.id))}> x </small>}
                                    {/*<small className="mx-3 text-end position-absolute top-50 end-0 translate-middle-y" onClick={()=>(handleDelete(idx))}> x </small>*/}

                                </li>
                            ))
                        }
                        <div className="footer">{todoList.length} {todoList.length === 1 ? "tarea por hacer" : "tareas por hacer"} </div>
                    </ul>
                </div>
            </div>
            <button className="button button-danger" onClick={() => panic()}>PANIC</button>
        </div>
    );
};

export default Home;