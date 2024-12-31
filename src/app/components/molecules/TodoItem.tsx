import { Todo } from "@/app/types/Todo";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
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
  const { attributes, listeners, transform, transition, setNodeRef } =
    useSortable({ id: todo.id });

  const styles = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div
      ref={setNodeRef}
      className={`todo-wrap bg-secondary rounded-[.3rem] ${todo.completed == true ? "check" : ""}`}
      style={styles}
      key={todo.id}
      {...listeners}
      {...attributes}
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
