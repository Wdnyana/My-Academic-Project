import React from "react";

const SuccesMessage = ({ children, onClose }) => {
  return (
    <div className="d-flex justify-content-between alert alert-success text-center">
      <p className="d-block mx-auto">{children}</p>
      <i
        className="fa-regular fa-x"
        style={{ cursor: "pointer" }}
        onClick={onClose}
      ></i>
    </div>
  );
};

export default SuccesMessage;
