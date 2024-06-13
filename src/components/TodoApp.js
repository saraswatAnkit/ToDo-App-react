import React, { useEffect, useState } from "react";
import "./TodoApp.css";


const TodoApp = () => {
  const handleClick = (event) => {
    document.getElementsByClassName("btn")[0].innerHTML = "Remove All";
  };


  const getLocalItems = () => {
    let list = localStorage.getItem('lists');
    console.log(list);
    if (list) {
      return JSON.parse(list);
    } else {
      return [];
    }
  }

  const handleClick2 = (event) => {
    document.getElementsByClassName("btn")[0].innerHTML = "CHECK LIST";
  };

  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalItems());

  const addItem = () => {
    if (!inputData) {
      alert("please enter some value inside it");
    } else {
      setItems([...items, inputData]);
      setInputData("");
    }
  };

  const addItemKey = (e) => {
    if (e.key === 'Enter') {
      setItems([...items, inputData]);
      setInputData("");
    }
  };

  const deleteItem = (id) => {
    console.log(id);
    const updatedItems = items.filter((data, ind) => {
      return ind !== id;
    });
    setItems(updatedItems);
  };

  const removeAll = () => {
    setItems([]);
  };

  useEffect(() => {
    localStorage.setItem('lists', JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="https://cdn0.iconfinder.com/data/icons/strategy-icons-rounded/110/Todo-List-512.png" />
            <figcaption>Add Your List Here ✌️</figcaption>
          </figure>

          <div className="addItems">
            <input
              type="text"
              name="task"
              placeholder="✍️ Add Items..."
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
              onKeyPress={addItemKey}
            />
            <i
              className="fa-solid fa-plus"
              title="Add Items"
              onClick={addItem}
            ></i>
          </div>

          <div className="showItems">
            {items.map((data, ind) => {
              return (
                <div className="eachItem" key={ind}>
                  <h3>{data}</h3>
                  <i className="fa-solid fa-trash-alt" title="Delete Items" onClick={() => deleteItem(ind)}></i>
                </div>
              );
            })}

            {/* clear all button */}
            <div className="showItems">
              <button
                className="btn"
                dat-sm-link-text="Remove All"
                onMouseEnter={handleClick}
                onMouseLeave={handleClick2}
                onClick={removeAll}
              >
                <span> CHECK LIST </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TodoApp;