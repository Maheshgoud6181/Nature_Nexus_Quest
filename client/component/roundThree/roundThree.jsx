import React, { useState} from 'react';
import './roundThreeStyles.css'; // Reuse the existing styles or adjust as needed
import { roundThreeQuestions } from '../../data/questions/roundThreeQuestions';
import { roundThreeVideoLink } from '../../data/links/roundThreeLinks';

const RoundThree = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const videoLink=roundThreeVideoLink

  const handleOptionSelect = (questionId, optionId) => {
    setSelectedAnswers({ ...selectedAnswers, [questionId]: optionId });
  };

  const handleSubmit = () => {
    // Ensure all questions have a value (null if not answered)
    const completeAnswers = roundThreeQuestions.reduce((acc, question) => {
      acc[question.id] = selectedAnswers[question.id] || null;
      return acc;
    }, {});

    console.log('Selected Answers:', completeAnswers);
    // Add your submit logic here
  };

  return (
    <div className="container">
      <div class="eight"> 
      <h1 className="header">ROUND 3:Video Comprehension</h1>
      </div>
      <div className="questionContainer">
        <div className="videoPlayer">
        <iframe
            className="videoPlayer"
            width="560"
            height="315"
            src="https://www.youtube.com/embed/0sga4tVGCF4?si=xBniSMSljQkBw2IL"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>

        </div>
        <h2 className="questionText">
          {roundThreeQuestions[currentQuestionIndex].question}
        </h2>
        <div className="optionsContainer">
          {roundThreeQuestions[currentQuestionIndex].options.map((option) => (
            <button
              key={option.id}
              className={`optionButton ${
                selectedAnswers[roundThreeQuestions[currentQuestionIndex].id] ===
                option.id
                  ? 'selected'
                  : ''
              }`}
              onClick={() =>
                handleOptionSelect(
                  roundThreeQuestions[currentQuestionIndex].id,
                  option.id
                )
              }
            >
              {option.text}
            </button>
          ))}
        </div>
      </div>
      <div className="navigationContainer">
        <button
          className="navButton"
          onClick={() =>
            setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0))
          }
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </button>
        {currentQuestionIndex < roundThreeQuestions.length - 1 ? (
          <button
            className="navButton"
            onClick={() =>
              setCurrentQuestionIndex((prev) =>
                Math.min(prev + 1, roundThreeQuestions.length - 1)
              )
            }
          >
            Next
          </button>
        ) : (
          <button className="submitButton" onClick={handleSubmit}>
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default RoundThree;
