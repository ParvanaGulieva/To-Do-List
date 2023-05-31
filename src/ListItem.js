import React from "react";

const ListItem = ({ item, removeItem, handleChecked, editItem }) => {
  return (
    <div>
      <div className={item.checked ? "list-item completed" : "list-item"}>
        <div className="left">
          <div
            className="radio-btn"
            onClick={() => handleChecked(item.id)}
          ></div>
          <p className="listItem-desc">{item.title}</p>
        </div>
        <div className="btn-container">
          <button
            className="edit"
            type="button"
            onClick={() => editItem(item.id)}
          >
            <img src="./images/icon-edit.svg" alt="" />
          </button>
          <button
            type="button"
            className="remove"
            onClick={() => removeItem(item.id)}
          >
            <img src="./images/icon-cross.svg" alt="" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListItem;
