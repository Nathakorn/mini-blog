import Card from "./Card";

const BlogView = ({ cardList, toggleInputCardModal }) => {
  return (
    <main className="blog-view">
      {cardList.map((card) => {
        return (
          <Card
            key={card.id}
            card={card}
            title={card.title}
            author={card.author}
            category={card.category}
            content={card.content}
            date={card.date}
            fileList={card.fileList}
            toggleInputCardModal={toggleInputCardModal}
          />
        );
      })}
    </main>
  );
};
export default BlogView;
