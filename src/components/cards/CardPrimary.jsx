import "./CardPrimary.css";
import React from "react";
import { Card, Button } from "antd";
import { useState, useEffect } from "react";
import { EditFilled, DeleteFilled } from "@ant-design/icons";

function CardPrimary(props) {
  const [content, setContent] = useState([...props.content]);
  useEffect(() => {
    setContent([...props.content]);
  }, [props.content]);

  const handleDelete = (id) => {
    let filteredArray = content.filter((elem, index) => {
      return index !== id;
    });
    setContent(filteredArray);
    console.log(filteredArray);
  };

  const handleEdit = (index) => {
    return null;
  };
  return (
    <>
      {content.map((elem, index) => {
        return (
          <>
            <Card key={index} className="card">
              {elem}
              <Button
                icon={<EditFilled />}
                value={elem}
                className="buttons"
                onClick={handleEdit}
                name="edit"
                id="edit"
              ></Button>
              <Button
                icon={<DeleteFilled />}
                value={elem}
                className="buttons"
                onClick={() => {
                  handleDelete(index);
                }}
                name="delete"
                id="delete"
              ></Button>
            </Card>
          </>
        );
      })}
    </>
  );
}

export default CardPrimary;
