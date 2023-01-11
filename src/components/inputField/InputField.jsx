import React from "react";
import "./InputField.css";
import { useState } from "react";
import { Input, Button } from "antd";
import CardPrimary from "../cards/CardPrimary";

const InputField = (props) => {
  const [inputString, setInputString] = useState("");
  const [addString, setAddString] = useState([]);
  const [todosPresent, setTodosPresent] = useState(false);
  const handleChange = (e) => {
    const input = e.target.value;
    setInputString(input);
  };

  const handleClick = (event) => {
    setTodosPresent(true);
    if (addString.length > 0) {
      setAddString([...addString, inputString]);
    } else {
      setAddString([inputString]);
    };

    console.log(addString);
  };

  // useEffect(() => {
  //   if (addString.length > 1) {
  //   } else setTodosPresent(false);
  //   console.log(addString);
  //   console.log(todosPresent);
  // }, [addString]);

  return (
    <>
      <div className="input">
        <Input
          placeholder="Enter your Todo here"
          className="input"
          name="inputString"
          onChange={handleChange}
          type="text"
        />
      </div>
      <Button className="button" onClick={handleClick} type="primary">
        Add
      </Button>
      {todosPresent ? <CardPrimary content={addString} /> : null}
    </>
  );
};

export default InputField;
