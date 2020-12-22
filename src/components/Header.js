import { Button } from "antd";
import { PlusOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";

const Header = (props) => {
  return (
    <header className="header">
      <div className="logo-section">
        <p>Mini Blog</p>
      </div>
      <div className="menu-section">
        <Button
          className="new-card-button"
          onClick={() => props.toggleInputCardModal("add")}
          icon={<PlusOutlined />}
          size="large"
        >
          New Card
        </Button>
        <div className="user-section">
          <Button type="primary" onClick={props.changeUser}>
            Change User
          </Button>
          <div className="user-details">
            <Avatar className="user-avatar" size={50} icon={<UserOutlined />} />
            <p>{props.currentUser}</p>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
