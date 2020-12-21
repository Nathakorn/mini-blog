import React from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Card from "./components/Card";
import "./antd.less";
import InputCardModal from "./components/InputCardModal";
import InputCardForm from "./components/InputCardForm";

class App extends React.Component {
  state = {
    inputCardModal: false,
  };
  toggleInputCardModal = () => {
    this.setState({ inputCardModal: !this.state.inputCardModal });
    console.log("showInputCard");
  };
  render() {
    const { inputCardModal } = this.state;
    return (
      <div className="container">
        <header className="header">
          <div className="logo-section">You know</div>
          <div className="menu">
            <Button
              type="primary"
              onClick={this.toggleInputCardModal}
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
            <Card number={1} />
            <Card number={2} />
            <Card number={3} />
            <Card number={4} />
          </main>
        </div>
        {inputCardModal && (
          <InputCardModal toggleInputCardModal={this.toggleInputCardModal}>
            <InputCardForm />
          </InputCardModal>
        )}
      </div>
    );
  }
}

export default App;
