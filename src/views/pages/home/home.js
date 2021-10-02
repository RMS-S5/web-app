import React, { Component } from "react";
import Header from "./../../../components/customer/auth/Header";
import Description from "./../../../components/customer/auth/Desription";

class HomePage extends Component {
  render() {
    return (
      <div>
        <Header />

        <Description />
      </div>
    );
  }
}

export default HomePage;
