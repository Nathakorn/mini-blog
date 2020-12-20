import React from "react";
import { Button, DatePicker } from "antd";

import "./App.scss";
import "./App.less";

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <header className="header">header</header>
        <div className="content">
          <nav className="sidebar">sidebar</nav>
          <main className="blog-view">
            <Button type="primary" size="large">
              Primary
            </Button>
            <DatePicker />
          </main>
        </div>
      </div>
    );
  }
}

export default App;
