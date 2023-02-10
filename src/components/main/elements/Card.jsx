import React from "react";
import "./Card.css";

const Card = ({ mes, cant }) => {
  console.log(mes, cant);
  return (
    <div className="card">
      <div className="content-card">
        <h1>{mes}</h1>
        <p>Monto actual: {cant}</p>
      </div>
    </div>
  );
};
export default Card;
