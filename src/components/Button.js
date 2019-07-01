import React from "react";

const Button = ({ children, ...props }) => {
  return (
    <button type="button" className="btn btn-success dashButton" {...props}>
      {children}
    </button>
  );
};

export default Button;
