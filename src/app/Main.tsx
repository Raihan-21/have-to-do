"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import MoonIcon from "@/assets/img/icon-moon.svg";
import { Todo } from "./types/Todo";
import TodoItem from "./components/molecules/TodoItem";

const TodoComponent = () => {
  const [isDarkTheme, setIsDarkTheme] = useState("");

  const [todos, setTodos] = useState<Todo[]>([]);
  // const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [todo, setTodo] = useState<string>("");
  const [status, setStatus] = useState("all");

  const filteredTodos = useMemo(() => {
    switch (status) {
      case "completed":
        return todos.filter((item) => item.completed === true);
      case "ongoing":
        return todos.filter((item) => item.completed === false);
      default:
        return todos;
    }
  }, [todos, status]);

  // save local
  const setStorageItem = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
  };
  const getStorageItem = (key: string, setState: any) => {
    let storageList = JSON.parse(localStorage.getItem(key)!);
    setState(storageList);
  };

  const handleAdd = (e: FormEvent) => {
    e.preventDefault();
    if (todo) {
      setTodos([
        ...todos,
        { content: todo, completed: false, id: Math.random() * 20 },
      ]);
      setTodo("");
    }
  };
  const handleClear = () => {
    const newList = todos.filter((item) => item.completed == false);
    setTodos(newList);
  };
  const handleDelete = (id: number) => {
    setTodos(todos.filter((item) => item.id !== id));
  };
  const handleComplete = (item: any) => {
    setTodos(
      todos.map((check) => {
        if (check.id === item.id) {
          return {
            ...check,
            completed: !check.completed,
          };
        }
        return check;
      }),
    );
  };
  const themeHandler = () => {
    // Later
    // setDarkTheme(!darkTheme);
  };

  // const statusHandler = (e) => {
  //     setStatus(e.target.value)
  // }
  const statusHandler = (value: string) => {
    setStatus(value);
  };
  // const filterHandler = () => {
  //   switch (status) {
  //     case "completed":
  //       setFilteredTodos(todos.filter((item) => item.completed === true));
  //       break;
  //     case "ongoing":
  //       setFilteredTodos(todos.filter((item) => item.completed === false));
  //       break;
  //     default:
  //       setFilteredTodos(todos);
  //       break;
  //   }
  // };

  // useEffect(() => {
  //     getStorageItem('list',setTodos)
  //     getStorageItem('theme', setDarkTheme)
  //     console.log(list)
  // }, [])
  // useEffect(() => {
  //     if(darkTheme == false){
  //         document.body.classList.add('light')
  //     }
  //     else{
  //         document.body.classList.remove('light')
  //     }
  //     setStorageItem('theme', darkTheme)

  // }, [darkTheme])

  useEffect(() => {
    // filterHandler();
    setStorageItem("list", todos);
  }, [todos, status]);
  return (
    <div className="home mx-auto">
      <div className="header mb-8 flex justify-between">
        <h1 className="text-[2rem] font-bold">TODO</h1>
        <button onClick={themeHandler} className="">
          <img src="./assets/img/icon-moon.svg" alt="" />
        </button>
      </div>

      <form onSubmit={handleAdd} className="relative flex">
        {/* {<input type="submit" value=''  className='submit'/>} */}
        <button type="submit" className="submit circle-btn"></button>
        <input
          className="input"
          placeholder="Create a new todo..."
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        ></input>

        {/* {<select onChange={statusHandler}>
                      <option value="all">All</option>
                      <option value="ongoing">On Going</option>
                      <option value="completed">Completed</option>
                  </select>} */}
      </form>
      <div className="content">
        {
          todos &&
            filteredTodos.map((todo, i) => (
              <TodoItem
                todo={todo}
                handleComplete={handleComplete}
                handleDelete={handleDelete}
                key={i}
              />
            ))
          // <Todo
          //   list={list}
          //   handleComplete={handleComplete}
          //   handleDelete={handleDelete}
          //   filteredList={filteredList}
          // />
        }
        <div className="info flex items-center justify-between p-4 text-[.8rem] font-extrabold text-[#4d4e66] transition-all duration-300 ease-in">
          <div className="remain">
            {todos.filter((item: any) => item.completed == false).length} items
            left
          </div>
          <div className="filters">
            <button
              onClick={() => statusHandler("all")}
              className={status == "all" ? "active" : ""}
            >
              All
            </button>
            <button
              onClick={() => statusHandler("ongoing")}
              className={status == "ongoing" ? "active" : ""}
            >
              Active
            </button>
            <button
              onClick={() => statusHandler("completed")}
              className={status == "completed" ? "active" : ""}
            >
              Completed
            </button>
          </div>
          <button className="clear" onClick={handleClear}>
            Clear Completed
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoComponent;
