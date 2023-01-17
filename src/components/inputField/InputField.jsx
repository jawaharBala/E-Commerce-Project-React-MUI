import React from "react";
import "./InputField.css";
import { useState, useEffect } from "react";
import { Input, Button } from "antd";
import CardPrimary from "../cards/CardPrimary";

const InputField = (props) => {
  const [inputString, setInputString] = useState({ todo: "", done: false });
  const [addString, setAddString] = useState([]);
  const [todosPresent, setTodosPresent] = useState(false);
  const [enableAddButton, setEnableButton] = useState(false);
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
    if (addString.length > 0) {
      setAddString([...addString, { todo: inputString, done: false }]);
    } else {
      setAddString([{ todo: inputString, done: false }]);
    }
  };

  const clearTodos = () => {
    setAddString([]);
  };
  useEffect(() => {
    setAddString(JSON.parse(window.localStorage.getItem("todos")) || []);
  }, []);

  useEffect(() => {
    setInputString("");
    window.localStorage.setItem("todos", JSON.stringify(addString));
  }, [addString]);

  useEffect(() => {
    if (addString.length >= 1) {
      setTodosPresent(true);
    } else {
      setEnableButton(false);
      setTodosPresent(false);
    }
  }, [addString, todosPresent]);

  return (
    <>
      <div className="input">
        <Input
          placeholder="Enter your Todo here"
          className="input"
          onChange={handleChange}
          type="text"
          value={inputString}
          onPressEnter={handleClick}
        />
      </div>
      {enableAddButton ? (
        <Button className="button" onClick={handleClick} type="primary">
          Add
        </Button>
      ) : null}
      {todosPresent ? (
        <Button className="button" onClick={clearTodos}>
          Clear all
        </Button>
      ) : null}
      {todosPresent ? (
        <>
          <CardPrimary setAddString={setAddString} content={addString} />
          <br></br>
        </>
      ) : null}
    </>
  );
};

export default InputField;
