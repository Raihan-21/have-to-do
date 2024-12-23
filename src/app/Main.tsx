"use client";

import { useEffect, useState } from "react";
import Todo from "./components/Todo";
import MoonIcon from "@/assets/img/icon-moon.svg";

const TodoComponent = () => {
  // const darkTheme = props.darkTheme
  // const setDarkTheme = props.setDarkTheme

  const [isDarkTheme, setIsDarkTheme] = useState("");
  const [list, setList] = useState<any[]>([]);
  const [todo, setTodo] = useState<string>("");
  const [status, setStatus] = useState("all");
  const [filteredList, setFilteredList] = useState<any[]>([]);
  const handleAdd = (e: any) => {
    e.preventDefault();
    if (todo) {
      setList([
        ...list,
        { text: todo, completed: false, id: Math.random() * 20 },
      ]);
      setTodo("");
    }
  };
  // save local
  const setStorageItem = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
  };
  const getStorageItem = (key: string, setState: any) => {
    let storageList = JSON.parse(localStorage.getItem(key)!);
    setState(storageList);
  };
  const handleClear = () => {
    const newList = list.filter((item) => item.completed == false);
    setList(newList);
  };
  const handleDelete = (id: number) => {
    setList(list.filter((item) => item.id !== id));
  };
  const handleComplete = (item: any) => {
    setList(
      list.map((check) => {
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
  const filterHandler = () => {
    switch (status) {
      case "completed":
        setFilteredList(list.filter((item) => item.completed === true));
        break;
      case "ongoing":
        setFilteredList(list.filter((item) => item.completed === false));
        break;
      default:
        setFilteredList(list);
        break;
    }
  };

  // useEffect(() => {
  //     getStorageItem('list',setList)
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
    filterHandler();
    setStorageItem("list", list);
  }, [list, status]);
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
        {list && (
          <Todo
            list={list}
            handleComplete={handleComplete}
            handleDelete={handleDelete}
            filteredList={filteredList}
          />
        )}
        <div className="info flex items-center justify-between p-4 text-[.8rem] font-extrabold text-[#4d4e66] transition-all duration-300 ease-in">
          <div className="remain">
            {list.filter((item: any) => item.completed == false).length} items
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
