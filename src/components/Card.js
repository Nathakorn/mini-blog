import { Button, Tooltip, Image } from "antd";
import { EditOutlined } from "@ant-design/icons";

const Card = (props) => {
  const {
    card,
    title,
    category,
    content,
    date,
    fileList,
    toggleInputCardModal,
  } = props;

  return (
    <div className="card">
      <div className="card-header">
        <b>{title}</b>
        <Tooltip title="edit">
          <Button
            type="primary"
            shape="circle"
            icon={
              <EditOutlined
                onClick={() => toggleInputCardModal("edit", card)}
              />
            }
          />
        </Tooltip>
      </div>
      <b>category: {category}</b>
      <p>{content}</p>
      <div className="card-feedback">
        <div className="card-like-button">like</div>
        <div className="card-comments">comments</div>
      </div>
      <div className="image-list">
        {fileList.map((file) => {
          return <Image width={80} src={file.url} />;
        })}
      </div>
      <div className="card-author">
        <div className="card-avatar">avatar</div>
        <div className="card-author-details">
          <div className="card-author-name">name sukum</div>
          <div className="card-publish-date">12/12/12</div>
        </div>
      </div>
    </div>
  );
};
export default Card;
