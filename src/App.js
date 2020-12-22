import React from "react";

import "./antd.less";
import InputCardModal from "./components/InputCardModal";
import InputCardForm from "./components/InputCardForm";
import { CardList } from "./data/data";
import Header from "./components/Header";
import BlogView from "./components/BlogView";

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
        <Header toggleInputCardModal={this.toggleInputCardModal} />
        <div className="content">
          <nav className="sidebar">sidebar</nav>
          <BlogView
            cardList={cardList}
            toggleInputCardModal={this.toggleInputCardModal}
          />
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
