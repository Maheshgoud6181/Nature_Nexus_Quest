import React from 'react';
import './RulesPopupStyles.css';

const RulesPopup = ({ onClose }) => {
  return (
    <div className="rulesPopup">
      <div className="rulesContent">
        <button className="closebtn" onClick={onClose}>
          &times;
        </button>
        <h2>Rules</h2>
        <p>1. Rule one description</p>
        <p>2. Rule two description</p>
        <p>3. Rule three description</p>
        <p>4. Rule four description</p>
        <p>5. Rule five description</p>
      </div>
    </div>
  );
};

export default RulesPopup;

