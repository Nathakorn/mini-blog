const Card = ({ number }) => {
  return (
    <div className="card">
      <div className="card-header">
        <b>Physic</b>
        <b>Edit icon</b>
      </div>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac elit
        felis. Nunc lacus lorem, scelerisque in eleifend vitae, cursus sed ex.
        Nunc suscipit turpis ornare, laoreet elit ac, laoreet purus. Quisque sit
        amet leo lacinia, gravida orci sed,
      </p>
      <b>category: studying</b>
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
