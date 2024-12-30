import { Todo } from "../types/Todo";
const TodoContainer = ({
  filteredList,
  handleComplete,
  handleDelete,
}: {
  filteredList: Todo[];
  handleComplete: (item: Todo) => void;
  handleDelete: (id: number) => void;
}) => {
  return (
    <div className="todo-list">
      {filteredList.map((item) => {
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
              <div className="todo">{item.content}</div>
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

export default TodoContainer;
