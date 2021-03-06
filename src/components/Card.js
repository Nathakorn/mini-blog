import { Button, Tooltip, Image } from "antd";
import { EditOutlined, HeartTwoTone, UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";

function ImageSrc(file) {
  if (!file.url) {
    return file.thumbUrl;
  } else {
    return file.url;
  }
}
const Card = (props) => {
  const {
    card,
    title,
    author,
    category,
    content,
    date,
    fileList,
    toggleInputCardModal,
  } = props;

  return (
    <div className="card">
      <div className="card-header">
        <p>{title}</p>
        <Tooltip title="edit">
          <Button
            type="link"
            onClick={() => toggleInputCardModal("edit", card, author)}
            icon={<EditOutlined />}
          />
        </Tooltip>
      </div>
      <b className="category-label">Category: {category}</b>
      <p className="blog-content">{content}</p>
      <div className="card-feedback">
        <div className="card-like-button">
          <HeartTwoTone className="heart-icon" twoToneColor="#eb2f96" />
          <b>0</b>
        </div>
        <div className="card-comments">
          <b style={{ marginRight: "5px" }}>0</b>comments
        </div>
      </div>
      <div className="image-list">
        {fileList.map((file) => {
          return <Image key={file.uid} width={100} src={ImageSrc(file)} />;
        })}
      </div>
      <div className="card-author">
        <div className="card-user-avatar">
          <Avatar size={35} icon={<UserOutlined />} />
        </div>
        <div className="card-author-details">
          <div className="card-author-name">
            <b>{author}</b>
          </div>
          <div className="card-publish-date">2 hour ago</div>
        </div>
      </div>
    </div>
  );
};
export default Card;
