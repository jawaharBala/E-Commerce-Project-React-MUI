import React from "react";
import "./InputField.css";
import { useState, useEffect } from "react";
import CardPrimary from "../cards/CardPrimary";
import { ButtonGroup, TextField, Button } from "@mui/material";
import { TodoStore } from "../../components/contexts/ContextStore";
import axios from "axios";

const InputField = () => {
  const [inputString, setInputString] = useState({ todo: "", done: false });
  const [todos, setTodos] = useState([]);
  const [todosPresent, setTodosPresent] = useState(false);
  const [enableAddButton, setEnableButton] = useState(false);

  useEffect(() => {
    getTodos();
  }, []);

  useEffect(() => {
    setInputString("");
  }, [todos]);

  const postTodos = async (todo, setTodos) => {
    try {
      await axios
        .put(
          "https://reacttodo-team-default-rtdb.firebaseio.com/todo.json",
          JSON.stringify(todo)
        )
        .then((response) => {
          setTodos([...todo])
          console.log("put", response.data, "todos", todo);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const getTodos = async () => {
    try {
      await axios
        .get("https://reacttodo-team-default-rtdb.firebaseio.com/todo.json")
        .then((response) => {
          console.log("get", response.data);
          setTodos(response.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setInputString(e.target.value);
    if (inputString.length > 0) {
      setEnableButton(true);
    } else {
      setEnableButton(false);
    }
  };

  const handleClick = () => {
    setTodosPresent(true);
    if (todos?.length > 0) {
      let newTodos = [...todos, { todo: inputString, done: false }];
      setTodos(newTodos);
      postTodos(newTodos);
    } else {
      setTodos([{ todo: inputString, done: false }]);
      postTodos([{ todo: inputString, done: false }]);
    }
  };

  const clearTodos = () => {
    postTodos([],setTodos);
  };

  useEffect(() => {
    if (todos?.length >= 1) {
      setTodosPresent(true);
    } else {
      setEnableButton(false);
      setTodosPresent(false);
    }
  }, [todos, todosPresent]);

  return (
    <>
      <TodoStore.Provider
        value={{ todos: todos, setTodos: setTodos, postTodos }}
      >
        <div className="input-container">
          <TextField
            placeholder=""
            label="Enter your Todo here"
            id="fullWidth"
            onChange={handleChange}
            type="text"
            value={inputString}
            className="input"
          />
          <br></br>
          <ButtonGroup>
            {enableAddButton ? (
              <Button
                sx={{ backgroundColor: "black", margin: "2vh", color: "white" }}
                onClick={handleClick}
                type="primary"
              >
                Add
              </Button>
            ) : null}
            {todosPresent ? (
              <Button
                sx={{ backgroundColor: "red", margin: "2vh", color: "white" }}
                onClick={clearTodos}
              >
                Clear all
              </Button>
            ) : null}
          </ButtonGroup>
          {todosPresent ? (
            <>
              <div className="cards">
                <CardPrimary setTodos={setTodos} content={todos} />
                <br></br>
              </div>
            </>
          ) : null}
        </div>
      </TodoStore.Provider>
    </>
  );
};

export default InputField;
