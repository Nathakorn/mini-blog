import React from "react";
// import { Button, DatePicker } from "antd";
import Card from "./components/Card";
import "./antd.less";

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <header className="header">
          <div className="logo-section">Youknow</div>
          <div className="menu">menu</div>
        </header>
        <div className="content">
          <nav className="sidebar">sidebar</nav>
          <main className="blog-view">
            <Card number={1} />
            <Card number={2} />
            <Card number={3} />
          </main>
        </div>
      </div>
    );
  }
}

export default App;
