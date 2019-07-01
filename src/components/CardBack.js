import React from "react";

const CardBack = ({ onClick }) => {
  return (
    <div
      className="card text-center bg-secondary gameCard"
      onClick={onClick}
    ></div>
  );
};

export default CardBack;
