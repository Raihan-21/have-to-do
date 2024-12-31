"use client";

import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";

import { Todo } from "./types/Todo";
import Image from "next/image";
import TodoItem from "./components/molecules/TodoItem";

import darkBackground from "@/app/assets/img/bg-desktop-dark.jpg";
import lightBackground from "@/app/assets/img/bg-desktop-light.jpg";
import MoonIcon from "./assets/img/icon-moon.svg";
import SunIcon from "./assets/img/icon-sun.svg";

import { motion } from "motion/react";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

const TodoComponent = () => {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(true);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [todo, setTodo] = useState<string>("");
  const [status, setStatus] = useState<string>("all");

  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: { delay: 100, tolerance: 100 },
  });
  const mouseSensor = useSensor(MouseSensor);
  const keyboardSensor = useSensor(KeyboardSensor);
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 1000,
      tolerance: 50,
    },
  });

  const sensors = useSensors(
    pointerSensor,
    mouseSensor,
    keyboardSensor,
    touchSensor,
  );

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

  const setStorageItem = (key: string, value: Todo[]) => {
    localStorage.setItem(key, JSON.stringify(value));
  };
  const getStorageItem = (
    key: string,
    setState: Dispatch<SetStateAction<Todo[]>>,
  ) => {
    const storageList = JSON.parse(localStorage.getItem(key)!);
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
  const handleComplete = (item: Todo) => {
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
    setIsDarkTheme(!isDarkTheme);
  };

  const statusHandler = (value: string) => {
    setStatus(value);
  };
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setTodos((todo) => {
      const oldIndex = todos.findIndex((todo) => todo.id === active.id);
      const newIndex = todos.findIndex((todo) => todo.id === over?.id);

      return arrayMove(todos, oldIndex, newIndex);
    });
  };

  useEffect(() => {
    getStorageItem("list", setTodos);
  }, []);
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
    setStorageItem("list", todos);
  }, [todos]);
  return (
    <div
      className={`relative min-h-[100vh] w-full pt-14 ${isDarkTheme ? "mode--dark bg-primary" : "mode--light bg-white"} ease transition-all duration-500`}
    >
      <div className="home relative z-[2] mx-auto w-[38%]">
        <div className="header mb-8 flex justify-between">
          <h1 className="text-[2rem] font-bold">TODO</h1>
          <button onClick={themeHandler} className="overflow-hidden">
            <Image
              src={MoonIcon}
              alt=""
              width={25}
              height={25}
              className={
                isDarkTheme
                  ? "ease translate-y-0 opacity-100 transition-all duration-200"
                  : "ease translate-y-[100%] opacity-0 transition-all duration-200"
              }
            />
            <Image
              src={SunIcon}
              alt=""
              width={25}
              height={25}
              className={
                !isDarkTheme
                  ? "ease translate-y-[-100%] opacity-100 transition-all duration-200"
                  : "ease translate-y-[-200%] opacity-0 transition-all duration-200"
              }
            />
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
        </form>
        <div className="content">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              strategy={verticalListSortingStrategy}
              items={filteredTodos}
            >
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
            </SortableContext>
          </DndContext>
          <div className="info flex items-center justify-between p-4 text-[.8rem] font-extrabold text-[#4d4e66] transition-all duration-300 ease-in">
            <div className="remain">
              {todos.filter((item) => item.completed == false).length} items
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
    </div>
  );
};

export default TodoComponent;
