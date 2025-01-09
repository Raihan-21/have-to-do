import { Todo } from "@/app/types/Todo";
import React, { CSSProperties } from "react";

const TodoItem = ({
  todo,
  variant,
  handleComplete,
  handleDelete,
  refSetter,
  styles,
  ...props
}: {
  todo: Todo;
  variant?: string;
  handleComplete?: (item: Todo) => void;
  handleDelete?: (id: number) => void;
  refSetter?: (node: HTMLElement | null) => void;
  styles?: CSSProperties;
}) => {
  return (
    <div
      ref={refSetter}
      className={`todo-wrap rounded-[.3rem] bg-secondary ${todo.completed == true ? "check" : ""} ${variant === "ghost" && "opacity-50"}`}
      style={styles}
      key={todo.id}
      {...props}
      data-testid="todo-item"
    >
      <button
        onClick={() => {
          if (handleComplete) handleComplete(todo);
        }}
        className="stat-btn circle-btn"
      ></button>
      <div className="todo-main">
        <div className="todo">{todo.content}</div>
        <button
          data-testid="delete"
          onClick={() => {
            if (handleDelete) handleDelete(todo.id);
          }}
          className="delete circle-btn"
        ></button>
      </div>
    </div>
  );
};

export default TodoItem;
