import React from "react";
import "./Header.css";
import plus from "../images/plus.png";

const Header = () => {
  return (
    <header>
      <div className="icon-container">xd</div>
      <div className="actions">
        <img src={plus} alt="plus" />
      </div>
    </header>
  );
};

export default Header;
