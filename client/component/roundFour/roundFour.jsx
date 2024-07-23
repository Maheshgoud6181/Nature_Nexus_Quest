import React, { useState } from 'react';
import { RoundTwoQuestions } from '../../data/questions/roundTwoQuestions';
import { RoundFourQuestions } from '../../data/questions/roundFourQuestions';

const questions = RoundFourQuestions
const RoundFour = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const handleOptionSelect = (questionId, optionId) => {
    setSelectedAnswers({ ...selectedAnswers, [questionId]: optionId });
  };

  const handleSubmit = () => {
    // Ensure all questions have a value (null if not answered)
    const completeAnswers = questions.reduce((acc, question) => {
      acc[question.id] = selectedAnswers[question.id] || null;
      return acc;
    }, {});

    console.log('Selected Answers:', completeAnswers);
    // Add your submit logic here
  };

  return (
    <div className="container">
      <h1 className="header">ROUND 4:Situation Responcse Test</h1>
      <div className="questionContainer">
        <h2 className="questionText">
          {questions[currentQuestionIndex].scenario}
        </h2>
        <div className="optionsContainer">
          {questions[currentQuestionIndex].options.map((option) => (
            <button
              key={option.id}
              className={`optionButton ${
                selectedAnswers[questions[currentQuestionIndex].id] === option.id
                  ? 'selected'
                  : ''
              }`}
              onClick={() =>
                handleOptionSelect(questions[currentQuestionIndex].id, option.id)
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
        {currentQuestionIndex < questions.length - 1 ? (
          <button
            className="navButton"
            onClick={() =>
              setCurrentQuestionIndex((prev) =>
                Math.min(prev + 1, questions.length - 1)
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

export default RoundFour;