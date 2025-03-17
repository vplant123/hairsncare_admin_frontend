
import React, { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";


// import { useAlert } from 'react-alert'
const PopUp = ({ onClose,msg }) => {
  // const alert = useAlert()

  return (
    <div className="overlay">
      <div className="popup-success">
      <button className="close-btn" onClick={onClose}>
          <MdClose size={15} />
        </button>
        {msg}
      </div>
    </div>
  );
};

export default PopUp;
