import "./CardPrimary.css";
import React from "react";
import { useState, useEffect } from "react";
import { EditTemplate, CardTemplate } from "../templates/Templates";

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

  return (
    <>
      {content.map((elem, index) => {
        return (
          <>
            {editMode ? (
              <>
                {index === editIndex ? (
                  <EditTemplate
                    elem={elem}
                    index={index}
                    handleEditfield={handleEditfield}
                    handleEditMode={() => {
                      handleEditMode(elem, index);
                    }}
                  />
                ) : (
                  <CardTemplate
                    elem={elem}
                    index={index}
                    handleEdit={() => {
                      handleEdit(elem, index);
                    }}
                    handleDelete={() => {
                      handleDelete(index);
                    }}
                  />
                )}
              </>
            ) : (
              <CardTemplate
                elem={elem}
                index={index}
                handleEdit={() => {
                  handleEdit(elem, index);
                }}
                handleDelete={() => {
                  handleDelete(index);
                }}
              />
            )}
          </>
        );
      })}
    </>
  );
}

export default CardPrimary;
