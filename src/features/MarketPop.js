import React from 'react'
// import './rx.css'
import { useSelector } from 'react-redux';
import BASE_URL from '../Config';
import { MdClose } from 'react-icons/md';
// import BASE_URL from '../../Config';
function MarketPop({onClose}) {

  const content = useSelector((state) => state.content.home);


  return (
    <div className="overlay">
      <div className="popup-market">
      <button className="close-btn" onClick={onClose}>
          <MdClose size={15} />
        </button>
        <img alt='hair' className="animate__animated animate__fadeInLeft" src={content?.section12} style={{width : "100%",height:"100%"}} />
      </div>
    </div>
  );
}

export default MarketPop
