import "./CardPrimary.css";
import React from "react";
import { useState, useEffect } from "react";
import { EditTemplate, CardTemplate } from "../templates/Templates";

function CardPrimary(props) {
  const [content, setContent] = useState([...props.content]);
  const [editMode, setEditMode] = useState(false);
  const [editedTodo, setEditedTodo] = useState("");
  const [editIndex, setEditIndex] = useState();
  const [overcomeShallow,setOvercomeShallow] = useState(true);
  
  useEffect(() => {
    setContent(props.content);
  }, [props.content]);
  useEffect(()=>{
    props.setAddString(content);
  },[overcomeShallow]);

  useEffect(() => {
    window.localStorage.setItem("todos", JSON.stringify(content));
  }, [content,overcomeShallow,editMode]);

  const handleDelete = (id) => {
    let filteredArray = content.filter((elem, index) => {
      return index !== id;
    });
    setContent(filteredArray);
    props.setAddString(filteredArray);
  };

  const handleEdit = (elem, index) => {
    setEditMode(true);
    setEditIndex(index);
  };
  const handleEditfield = (e) => {
    const fieldValue = e.target.value;
    setEditedTodo(fieldValue);
  };
  const handleEditMode = (elem, index) => {
    if (editedTodo === "") {
      setEditedTodo(elem.todo);
      setEditMode(false);
    } else {
      let editedArray = content;
      editedArray[index] = {todo:editedTodo,done:elem.done};
      setContent(editedArray);
      props.setAddString(editedArray);
      setEditMode(false);
    }
  };
  const markDone = (elem,index) =>{
    let changedArray = content;
    changedArray[index].done = !changedArray[index].done;
    setContent(changedArray);
    props.setAddString(changedArray);
    setOvercomeShallow(!overcomeShallow);
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
                    markDone={()=>{markDone(elem,index)}}
                    
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
                markDone={()=>{markDone(elem,index)}}
                   
              />
            )}
          </>
        );
      })}
    </>
  );
}

export default CardPrimary;
