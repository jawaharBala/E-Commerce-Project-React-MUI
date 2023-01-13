import "./CardPrimary.css";
import React from "react";
import { Card, Button, Input } from "antd";
import { useState, useEffect } from "react";
import { EditFilled, DeleteFilled } from "@ant-design/icons";

function CardPrimary(props) {
  const [content, setContent] = useState([...props.content]);
  const [editMode, setEditMode] = useState(false);
  const [editedTodo, setEditedTodo] = useState("");

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

  const handleEdit = (index) => {
    setEditMode(true);
  };
  const handleEditfield = (e) => {
    const fieldValue = e.target.value;
    setEditedTodo(fieldValue);
  };
  const handleEditMode = (elem, index) => {
    let editedArray = content.map((element) => {
      if (element === elem) {
        return (element = editedTodo);
      } else {
        return elem;
      }
    });
    console.log("edited arrays", editedArray);
    setContent(editedArray);
    props.setAddString(editedArray);
    console.log("content", content);
    setEditMode(false);
  };
  return (
    <>
      {content.map((elem, index) => {
        return (
          <>
            {editMode ? (
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
                >
                  Save
                </Button>
              </>
            ) : (
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
                  onClick={handleEdit}
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
            )}
          </>
        );
      })}
    </>
  );
}

export default CardPrimary;
