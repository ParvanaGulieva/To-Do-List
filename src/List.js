import React from "react";
import ListItem from "./ListItem";

const List = ({
  items,
  clearList,
  amount,
  removeItem,
  handleChecked,
  filterItems,
  editItem,
  filterClass,
}) => {
  return (
    <div className="list-items">
      {items.map((item) => {
        return (
          <ListItem
            removeItem={removeItem}
            handleChecked={handleChecked}
            editItem={editItem}
            item={item}
            key={item.id}
          />
        );
      })}
      <div className="list-footer">
        <p className="todo-amount">{amount} items left</p>
        <div className="sorting">
          <button
            className={`${filterClass === "all" ? "active" : " "}`}
            onClick={() => {
              filterItems("all");
            }}
          >
            All
          </button>
          <button
            className={`${filterClass === "not completed" ? "active" : " "}`}
            onClick={() => {
              filterItems("not completed");
            }}
          >
            Active
          </button>
          <button
            className={`${filterClass === "completed" ? "active" : " "}`}
            onClick={() => {
              filterItems("completed");
            }}
          >
            Completed
          </button>
        </div>
        <button className="clear" onClick={clearList}>
          Clear Completed
        </button>
      </div>
    </div>
  );
};

export default List;
