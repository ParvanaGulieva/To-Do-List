import React, { useState, useEffect } from "react";
import List from "./List";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};

function App() {
  const [list, setList] = useState(getLocalStorage());
  const [filteredList, setFilteredList] = useState([]);
  const [filterClass, setFilterClass] = useState("all");
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [name, setName] = useState("");
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  useEffect(() => {
    setFilteredList(list);
  }, [list]);

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === "") {
      return;
    } else if (isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName("");
      setEditID(null);
      setIsEditing(false);
    } else {
      const newItem = {
        id: new Date().getTime().toString(),
        title: name,
        checked: false,
      };
      setList([...list, newItem]);
      setName("");
    }
  };

  const clearList = () => {
    setList(list.filter((item) => item.checked === false));
  };

  const removeItem = (id) => {
    setList(list.filter((item) => item.id !== id));
  };

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setName(specificItem.title);
    setIsEditing(true);
    setEditID(id);
  };

  const handleChecked = (id) => {
    setList(
      list.map((el) => {
        if (el.id === id) {
          el.checked = !el.checked;
        }
        return el;
      })
    );
  };

  const filterItems = (category) => {
    setFilterClass(category);
    if (category === "all") {
      setFilteredList(list);
    } else if (category === "completed") {
      const filteredItems = list.filter((item) => item.checked === true);
      setFilteredList(filteredItems);
    } else if (category === "not completed") {
      const filteredItems = list.filter((item) => item.checked === false);
      setFilteredList(filteredItems);
    }
  };

  let amount = list.filter((item) => item.checked === false).length;

  return (
    <>
      <div className="bg-image">
        <img
          src={
            theme == "light"
              ? "./images/bg-desktop-light.jpg"
              : "./images/bg-desktop-dark.jpg"
          }
          alt=""
        />
      </div>
      <div className="main-part">
        <div className="header">
          <h1 className="heading">TODO</h1>
          <button onClick={toggleTheme} className="theme">
            <img
              src={
                theme == "light"
                  ? "./images/icon-moon.svg"
                  : "./images/icon-sun.svg"
              }
              alt=""
            />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Create a new todo..."
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </form>
        {list.length > 0 && (
          <>
            <List
              items={filteredList}
              clearList={clearList}
              amount={amount}
              removeItem={removeItem}
              handleChecked={handleChecked}
              filterItems={filterItems}
              editItem={editItem}
              filterClass={filterClass}
            />
            <p className="footer">Drag and drop to reorder list</p>
          </>
        )}
        {list.length < 0 && (
          <div className="empty-list">
            <h2>List is empty</h2>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
