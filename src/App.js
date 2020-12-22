import React from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Card from "./components/Card";
import "./antd.less";
import InputCardModal from "./components/InputCardModal";
import InputCardForm from "./components/InputCardForm";
import { CardList } from "./data/data";

class App extends React.Component {
  state = {
    inputCardModal: false,
    cardList: CardList,
    cardOperation: "add",
    card: null,
  };
  toggleInputCardModal = (operation, card) => {
    console.log(operation);
    if (operation === "add") {
      this.setState({
        inputCardModal: !this.state.inputCardModal,
        cardOperation: operation,
      });
    } else if (operation === "edit") {
      this.setState({
        inputCardModal: !this.state.inputCardModal,
        cardOperation: operation,
        card: card,
      });
    } else {
      this.setState({
        inputCardModal: !this.state.inputCardModal,
      });
    }
  };
  addCard = (card) => {
    const newCardList = this.state.cardList;
    newCardList.unshift(card);
    this.setState({ cardList: newCardList });
    console.log(newCardList);
  };
  editCard = (card) => {
    let newCardList = this.state.cardList;
    const objIndex = newCardList.findIndex((obj) => obj.id === card.id);
    console.log(card.id);
    newCardList[objIndex].title = card.title;
    newCardList[objIndex].category = card.category;
    newCardList[objIndex].content = card.content;
    newCardList[objIndex].fileList = card.fileList;
    this.setState({ cardList: newCardList });
  };
  deleteCard = (cardId) => {
    console.log("delete card id ", cardId);
    let newCardList = this.state.cardList;
    const objIndex = newCardList.findIndex((obj) => obj.id === cardId);
    newCardList.splice(objIndex, 1);
    this.setState({ cardList: newCardList });
    this.toggleInputCardModal("end");
  };

  render() {
    const { inputCardModal, cardList, cardOperation, card } = this.state;
    return (
      <div className="container">
        <header className="header">
          <div className="logo-section">You know</div>
          <div className="menu">
            <Button
              type="primary"
              onClick={() => this.toggleInputCardModal("add")}
              icon={<PlusOutlined />}
              size="large"
            >
              New Card
            </Button>
          </div>
        </header>
        <div className="content">
          <nav className="sidebar">sidebar</nav>
          <main className="blog-view">
            {cardList.map((card) => {
              return (
                <Card
                  key={card.id}
                  card={card}
                  title={card.title}
                  category={card.category}
                  content={card.content}
                  date={card.date}
                  fileList={card.fileList}
                  toggleInputCardModal={this.toggleInputCardModal}
                />
              );
            })}
          </main>
        </div>
        {inputCardModal && (
          <InputCardModal toggleInputCardModal={this.toggleInputCardModal}>
            <InputCardForm
              toggleInputCardModal={this.toggleInputCardModal}
              cardOperation={cardOperation}
              addCard={this.addCard}
              editCard={this.editCard}
              deleteCard={this.deleteCard}
              card={card}
            />
          </InputCardModal>
        )}
      </div>
    );
  }
}

export default App;
