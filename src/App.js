import React from "react";

import "./antd.less";
import InputCardModal from "./components/InputCardModal";
import InputCardForm from "./components/InputCardForm";
import { CardList } from "./data/data";
import Header from "./components/Header";
import BlogView from "./components/BlogView";
import { Alert } from "antd";

class App extends React.Component {
  state = {
    inputCardModal: false,
    cardList: CardList,
    cardOperation: "add",
    card: null,
    currentUser: "Billie Joe",
    alert: null,
  };
  changeUser = () => {
    if (this.state.currentUser === "Billie Joe") {
      this.setState({ currentUser: "Tom Cruise" });
    } else if (this.state.currentUser === "Tom Cruise") {
      this.setState({ currentUser: "Bille Joe" });
    }
  };
  updateAlert = (text, type) => {
    this.setState({ alert: { text: text, type: type } });
  };
  toggleInputCardModal = (operation, card, author) => {
    console.log(operation);
    if (!this.state.inputCardModal) {
      this.setState({ alert: null });
    }
    if (operation === "add") {
      this.setState({
        inputCardModal: !this.state.inputCardModal,
        cardOperation: operation,
      });
    } else if (operation === "edit") {
      if (this.state.currentUser === author) {
        this.setState({
          inputCardModal: !this.state.inputCardModal,
          cardOperation: operation,
          card: card,
        });
      } else {
        this.updateAlert(
          "Only the author of the card can perform this function!",
          "error"
        );
      }
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
    this.updateAlert("Delete completely!", "success");
    this.toggleInputCardModal("end");
  };

  render() {
    const {
      currentUser,
      inputCardModal,
      cardList,
      cardOperation,
      card,
      alert,
    } = this.state;
    console.log("testttttt  ", alert);
    return (
      <div className="container">
        {alert && (
          <Alert message={alert.text} type={alert.type} showIcon closable />
        )}

        <Header
          toggleInputCardModal={this.toggleInputCardModal}
          currentUser={currentUser}
          changeUser={this.changeUser}
        />
        <div className="content">
          <nav className="sidebar"></nav>
          <BlogView
            cardList={cardList}
            toggleInputCardModal={this.toggleInputCardModal}
          />
        </div>
        {inputCardModal && (
          <InputCardModal toggleInputCardModal={this.toggleInputCardModal}>
            <InputCardForm
              currentUser={currentUser}
              toggleInputCardModal={this.toggleInputCardModal}
              cardOperation={cardOperation}
              addCard={this.addCard}
              editCard={this.editCard}
              deleteCard={this.deleteCard}
              card={card}
              updateAlert={this.updateAlert}
            />
          </InputCardModal>
        )}
      </div>
    );
  }
}

export default App;
