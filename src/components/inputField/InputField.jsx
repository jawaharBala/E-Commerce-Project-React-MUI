import React from "react";
import "./InputField.css";
import { useState, useEffect } from "react";
import { Input, Button } from "antd";
import CardPrimary from "../cards/CardPrimary";

const InputField = (props) => {
  const [inputString, setInputString] = useState("");
  const [addString, setAddString] = useState([]);
  const [todosPresent, setTodosPresent] = useState(false);
  const handleChange = (e) => {
    setInputString(e.target.value);
  };

  const handleClick = () => {
    setTodosPresent(true);
    console.log('inputstring 1',inputString,todosPresent);//ask Rahul
    if (addString.length > 0) {
      setAddString([...addString, inputString]);
      // setAddString([addString.push(inputString)]);
    } else {
      setAddString([inputString]);
    };
   
  };
 
  useEffect(() => {
    setInputString("");

  }, [addString]);
  useEffect(() => {
    if (addString.length >= 1) {
      setTodosPresent(true);
    } else setTodosPresent(false);
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
      <Button className="button" onClick={handleClick} type="primary">
        Add
      </Button>
      {todosPresent ? (
       <> <CardPrimary setAddString={setAddString} content={addString} /><br></br></>
      ) : null}
    </>
  );
};


export default InputField;
