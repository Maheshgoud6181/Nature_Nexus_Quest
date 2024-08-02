import React, { useEffect, useRef } from 'react';
import './RulesPopupStyles.css';

const RulesPopup = ({ onClose }) => {
  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="rulesPopup">
      <div className="rulesContent" ref={popupRef}>
        <button className="closebtn" onClick={onClose}>
          &times;
        </button>

        <h3>Event Instructions</h3>

        <h4>Level 1: Riddle</h4>
        <p><strong>Objective:</strong> Solve interactive location-based riddles.</p>
        <p><strong>Duration:</strong> 7 minutes</p>
        <p><strong>Maximum Points:</strong> 20 (5 riddles, 4 points each, all compulsory)</p>
        <p><strong>Bonus Points:</strong> +1.5 points (1 min early), +2.5 points (2 min early), etc.</p>

        <h4>Level 2: Quiz</h4>
        <p><strong>Objective:</strong> Answer multiple-choice questions on environmental facts.</p>
        <p><strong>Duration:</strong> 8 minutes</p>
        <p><strong>Maximum Points:</strong> 20 (10 questions, 2 points each, all compulsory)</p>
        <p><strong>Bonus Points:</strong> +0.5 points (1 min early), +1 point (2 min early), etc.</p>

        <h4>Level 3: Video Comprehension</h4>
        <p><strong>Objective:</strong> Watch a video and answer multiple-choice questions.</p>
        <p><strong>Duration:</strong> 14 minutes</p>
        <p><strong>Maximum Points:</strong> 20 (5 questions, 4 points each, all compulsory)</p>
        <p><strong>Bonus Points:</strong> +1.5 points (1 min early), +2.5 points (2 min early), etc.</p>

        <h4>Level 4: Situation Response Test</h4>
        <p><strong>Objective:</strong> Choose responses to scenarios.</p>
        <p><strong>Duration:</strong> 8 minutes</p>
        <p><strong>Maximum Points:</strong> 20 (5 questions, 4 points each, all compulsory)</p>
        <p><strong>Bonus Points:</strong> +0.5 points (1 min early), +1 point (2 min early), etc.</p>

        <h4>Level 5: Meme Causes</h4>
        <p><strong>Objective:</strong> Fill in the blanks in memes/pictures.</p>
        <p><strong>Duration:</strong> 8 minutes</p>
        <p><strong>Maximum Points:</strong> 20 (4 questions, 5 points each, not compulsory)</p>
        <p><strong>Bonus Points:</strong> +0.5 points (1 min early), +1 point (2 min early), etc.</p>

        <h4>Level 6: Bonus Level</h4>
        <p><strong>Objective:</strong> Follow Prakriti on social media and upload screenshots.</p>
        <p><strong>Duration:</strong> 2 minutes</p>
        <p><strong>Maximum Points:</strong> 10 (optional)</p>

      </div>
    </div>
  );
};

export default RulesPopup;