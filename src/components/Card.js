const Card = (props) => {
  const { title, category, content, date, fileList } = props;
  return (
    <div className="card">
      <div className="card-header">
        <b>{title}</b>
        <b>Edit icon</b>
      </div>
      <b>category: {category}</b>
      <p>{content}</p>
      <div className="card-feedback">
        <div className="card-like-button">like</div>
        <div className="card-comments">comments</div>
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
