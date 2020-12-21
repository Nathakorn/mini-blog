import { Button, Tooltip } from "antd";
import { CloseOutlined } from "@ant-design/icons";

const InputCardModal = (props) => {
  return (
    <div className="input-card-modal">
      <div className="input-card-container">{props.children}</div>
      <div className="close-button-container">
        <Tooltip title="Close">
          <Button
            type="primary"
            onClick={props.toggleInputCardModal}
            shape="circle"
            icon={<CloseOutlined />}
            size="large"
          />
        </Tooltip>
      </div>
    </div>
  );
};
export default InputCardModal;
