import React from 'react';
import './Popup.css';

function Popup({ message }) {
  return (
    <div className="popup popup_opened">
      <div className="popup__container">
        <p className="popup__text">
          {message}
        </p>
      </div>
    </div>
  );
}

export default Popup;