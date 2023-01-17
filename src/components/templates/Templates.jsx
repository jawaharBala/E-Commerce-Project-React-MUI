import { Card, Button, Input } from "antd";
import { EditFilled, DeleteFilled } from "@ant-design/icons";
import "../cards/CardPrimary.css";

export const CardTemplate = ({
  elem,
  index,
  handleEdit,
  handleDelete,
  markDone,
}) => {
  return (
    <div className="card-primary ">
      <Card key={index} className={elem.done ? "customCard" : "customCard-1"}>
        {elem.todo}
        <div className="groupButton">
          {" "}
          <Button
            icon={<EditFilled style={{ color: "green" }} />}
            value={elem}
            className="buttons "
            onClick={() => {
              handleEdit(elem, index);
            }}
            name="edit"
            id="edit"
          ></Button>
          <Button
            icon={<DeleteFilled style={{ color: "black" }} />}
            value={elem}
            className="buttons"
            onClick={() => {
              handleDelete(index);
            }}
            name="delete"
            id="delete"
          ></Button>
          <div className="check-button">
            <input
              name="Markasdone"
              onChange={() => {
                markDone(elem, index);
              }}
              type="checkbox"
              checked={elem.done}
              className="ant-check"
            ></input>
          </div>
        </div>
      </Card>
      <br></br>
    </div>
  );
};

export const EditTemplate = ({
  elem,
  index,
  handleEditfield,
  handleEditMode,
}) => {
  return (
    <>
      <div key={index} className="input">
        <Input
          className="input"
          name="inputString"
          onChange={handleEditfield}
          type="text"
          defaultValue={elem.todo}
          onPressEnter={() => {
            handleEditMode(elem, index);
          }}
        />
      </div>
      <Button
        className="button"
        onClick={() => {
          handleEditMode(elem, index);
        }}
        type="primary"
        style={{ backgroundColor: "red" }}
      >
        Save changes
      </Button>
    </>
  );
};
