import { useState } from "react";
const Todo = (props: any) => {
  const list = props.list;
  const filteredList = props.filteredList;
  const handleComplete = props.handleComplete;
  const handleDelete = props.handleDelete;
  return (
    <div className="todo-list">
      {filteredList.map((item: any) => {
        return (
          <div
            className={`todo-wrap ${item.completed == true ? "check" : ""}`}
            key={item.id}
          >
            <button
              onClick={() => handleComplete(item)}
              className="stat-btn circle-btn"
            ></button>
            <div className="todo-main">
              <div className="todo">{item.text}</div>
              <button
                onClick={() => handleDelete(item.id)}
                className="delete circle-btn"
              ></button>
            </div>

            {/* <button onClick={() => handleDelete(item.id)}>Delete</button> */}
          </div>
        );
      })}
    </div>
  );
};

export default Todo;
