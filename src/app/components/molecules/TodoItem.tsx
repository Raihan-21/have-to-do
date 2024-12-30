import { Todo } from "@/app/types/Todo";
import React from "react";

const TodoItem = ({
  todo,
  handleComplete,
  handleDelete,
}: {
  todo: Todo;
  handleComplete: (item: Todo) => void;
  handleDelete: (id: number) => void;
}) => {
  return (
    <div
      className={`todo-wrap ${todo.completed == true ? "check" : ""}`}
      key={todo.id}
    >
      <button
        onClick={() => handleComplete(todo)}
        className="stat-btn circle-btn"
      ></button>
      <div className="todo-main">
        <div className="todo">{todo.content}</div>
        <button
          onClick={() => handleDelete(todo.id)}
          className="delete circle-btn"
        ></button>
      </div>

      {/* <button onClick={() => handleDelete(todo.id)}>Delete</button> */}
    </div>
  );
};

export default TodoItem;
