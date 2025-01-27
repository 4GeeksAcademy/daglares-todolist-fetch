import React, { useState, useEffect } from "react";

function ToDoApp() {
  const [toDoList, setToDoList] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [hoverIndex, setHoverIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  const urlApi = "https://playground.4geeks.com/todo/users/daglares";
  const urlPost = "https://playground.4geeks.com/todo/todos/daglares";
  const urlDelete = (id) => "https://playground.4geeks.com/todo/todos/"+id;

  const fetchTodoList = async () => {
    try {
      const response = await fetch(urlApi);
      if (!response.ok) throw new Error (response.statusText);
      const data = await response.json();
      setToDoList(data.todos);
    } catch (error) {
      console.error(error);
    }finally{
      setIsLoading(false);
    }
  };

  const postTask = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      label: inputValue,
      is_done: false,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    try {
      const response = await fetch(urlPost, requestOptions);
      if (!response.ok) throw new Error;
      const data = await response.json();
      setInputValue("");
      await fetchTodoList();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTask = async (id) => {
    const requestOptions = {
      method: "DELETE",
    };

    try {
      const response = await fetch(urlDelete(id), requestOptions);
      if (!response.ok) throw new Error;
      await fetchTodoList();
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyUp = (e) => {
    if (e.key === "Enter") 
      postTask(); 
  };

  useEffect(() => {
    fetchTodoList();
  }, []);

  return (
    <div className="container col-8">
      <h1 className="text-center">todos</h1>
      <div className="input-group">
        <input
          type="text"
          className="form-control shadow-none"
          style={{
            outline: "none",
            boxShadow: "none",
            borderColor: "#ced4da",
            borderRadius: "0",
          }}
          id="addToDo"
          value={inputValue}
          onChange={handleInputChange}
          onKeyUp={handleKeyUp}
          placeholder="What needs to be done?"
        />
      </div>
      <ul className="list-group">
        {toDoList &&
          toDoList.map((task, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between align-items-center rounded-0 fs-5"
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              {task.label}
              {hoverIndex === index && (
                <span
                  onClick={() => deleteTask(task.id)}
                  className="text-danger"
                  style={{ cursor: "pointer" }}
                >
                  <i className="fa-solid fa-x"></i>
                </span>
              )}
            </li>
          ))}
        <li className="list-group-item d-flex justify-content-start align-items-center rounded-0">
          {toDoList.length == 0
            ? `No hay tareas, añadir tareas`
            : `${toDoList.length} items left`}
        </li>
      </ul>
    </div>
  );
}

export default ToDoApp;
