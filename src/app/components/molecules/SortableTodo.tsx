import { Todo } from "@/app/types/Todo";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React from "react";
import TodoItem from "./TodoItem";

const SortableTodo = ({
  todo,
  variant,
  handleComplete,
  handleDelete,
}: {
  todo: Todo;
  variant: string;
  handleComplete: (item: Todo) => void;
  handleDelete: (id: number) => void;
}) => {
  const { attributes, listeners, transform, transition, setNodeRef } =
    useSortable({ id: todo.id, data: todo });

  const styles = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <TodoItem
      refSetter={setNodeRef}
      todo={todo}
      variant={variant}
      styles={styles}
      handleComplete={handleComplete}
      handleDelete={handleDelete}
      key={todo.id}
      {...listeners}
      {...attributes}
    />
  );
};

export default SortableTodo;
