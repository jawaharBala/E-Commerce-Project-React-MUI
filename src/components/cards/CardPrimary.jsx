import "./CardPrimary.css";
import React from "react";
import { Card, Button, Input } from "antd";
import { useState, useEffect } from "react";
import { EditFilled, DeleteFilled } from "@ant-design/icons";

function CardPrimary(props) {
  const [content, setContent] = useState([...props.content]);
  const [editMode, setEditMode] = useState(false);
  const [editedTodo, setEditedTodo] = useState("");
  const [editIndex, setEditIndex] = useState();
  useEffect(() => {
    setContent(props.content);
  }, [props.content]);

  useEffect(() => {
    window.localStorage.setItem("todos", content);
    console.log(window.localStorage.getItem("todos"));
  }, [content]);

  const handleDelete = (id) => {
    let filteredArray = content.filter((elem, index) => {
      return index !== id;
    });
    setContent(filteredArray);
    props.setAddString(filteredArray);
  };

  const handleEdit = (elem, index) => {
    console.log("edit button", index);
    setEditMode(true);
    setEditIndex(index);
  };
  const handleEditfield = (e) => {
    const fieldValue = e.target.value;
    setEditedTodo(fieldValue);
  };
  const handleEditMode = (elem, index) => {
    if (editedTodo === "") {
      setEditedTodo(elem);
      setEditMode(false);
    } else {
      let editedArray = content;
      editedArray[index] = editedTodo;
      setContent(editedArray);
      props.setAddString(editedArray);
      setEditMode(false);
    }
  };

  const cardTemplate = (elem, index) => {
    return (
      <Card
        key={index}
        className="card"
        style={{ color: "darkblue", font: "calibri" }}
      >
        {elem}
        <Button
          icon={<EditFilled style={{ color: "green" }} />}
          value={elem}
          className="buttons"
          onClick={() => {
            handleEdit(elem, index);
          }}
          name="edit"
          id="edit"
        ></Button>
        <Button
          icon={<DeleteFilled style={{ color: "red" }} />}
          value={elem}
          className="buttons"
          onClick={() => {
            handleDelete(index);
          }}
          name="delete"
          id="delete"
        ></Button>
      </Card>
    );
  };
  const editTemplate = (elem, index) => {
    return (
      <>
        <div key={index} className="input">
          <Input
            className="input"
            name="inputString"
            onChange={handleEditfield}
            type="text"
            defaultValue={elem}
          />
        </div>
        <Button
          className="button"
          onClick={() => {
            handleEditMode(elem, index);
          }}
          type="primary"
          style={{'backgroundColor':'red'}}
        >
          Save changes
        </Button>
      </>
    );
  };
  return (
    <>
      {content.map((elem, index) => {
        return (
          <>
            {editMode ? (
              <>
                {index === editIndex ? (
                  <>{editTemplate(elem, index)}</>
                ) : (
                  <>{cardTemplate(elem, index)}</>
                )}
              </>
            ) : (
              <>{cardTemplate(elem, index)}</>
            )}
          </>
        );
      })}
    </>
  );
}

export default CardPrimary;
