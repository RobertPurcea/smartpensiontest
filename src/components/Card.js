import React from "react";

const Card = ({ power, name, type }) => (
  <div className="card text-center bg-success gameCard">
    <div className="card-header">{type}</div>
    <div className="card-body">
      <h5 className="card-title">{name}</h5>
    </div>
    <div className="card-footer text-danger">
      <span className="badge badge-danger">{power}</span>
    </div>
  </div>
);

export default Card;
