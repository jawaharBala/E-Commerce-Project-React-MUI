import { Card, Button, Input } from "antd";
import { EditFilled, DeleteFilled } from "@ant-design/icons";


export const CardTemplate = ({elem, index,handleEdit,handleDelete}) => {
    return (
      <div  className="card">
      <Card
        key={index}
        style={{ color: "darkblue", font: "calibri" }}>
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
      <br></br>
      </div>
    );
  };

  export  const EditTemplate = ({elem, index,handleEditfield,handleEditMode}) => {
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