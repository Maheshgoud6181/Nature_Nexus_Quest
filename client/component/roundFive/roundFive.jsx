import React, { useState } from 'react';
import './roundFive.css'; // Import your CSS file for styling
import { RoundFiveQuestions } from '../../data/questions/roundFiveQuestions';


const RoundFive = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(new Array(RoundFiveQuestions.length).fill(null)); // Initialize answers array

  // Initialize currentAnswers state with empty strings for each question
  const [currentAnswers, setCurrentAnswers] = useState(RoundFiveQuestions.map(question => new Array(question.wordLengths.length).fill('')));

  const handleInputChange = (event, questionIndex, wordIndex) => {
    const { value } = event.target;
    setCurrentAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[questionIndex][wordIndex] = value.slice(0, RoundFiveQuestions[questionIndex].wordLengths[wordIndex]); // Limit answer length for each word
      return updatedAnswers;
    });
  };

  const handleNext = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handlePrev = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
  };

  const handleSubmit = () => {
    // Create an array to hold answers for all questions
    const allAnswers = RoundFiveQuestions.map((question, index) => {
      const questionId = question.id;
      const filteredAnswers = currentAnswers[index].filter(answer => answer.trim() !== ''); // Filter out empty answers
      return {
        questionId,
        answers: filteredAnswers.length > 0 ? filteredAnswers : null, // Store answers or null if none entered
      };
    });
  
    setAnswers(allAnswers); // Update answers state with all answers for logging or further processing
    console.log('All Answers:', allAnswers);
    // Optionally, you can perform further actions here, such as validating answers or sending data to a server
  };

  // Retrieve current question based on currentQuestionIndex
  const currentQuestion = RoundFiveQuestions[currentQuestionIndex];

  return (
    <div className="container">
      <h1 className="header">ROUND 5:Meme Causes</h1>
      <div className="questionContainer">
        <img src={currentQuestion.photoPath} alt={`Question ${currentQuestion.id}`} className="questionImage" />
        <div className="answerInputs">
          {currentQuestion.wordLengths.map((exactLength, wordIndex) => (
            <input
              key={wordIndex}
              type="text"
              className={`answerInput ${currentAnswers[currentQuestionIndex][wordIndex].length !== exactLength ? 'invalid' : ''}`}
              placeholder={`Word ${wordIndex + 1} (${exactLength} characters)`}
              value={currentAnswers[currentQuestionIndex][wordIndex]}
              onChange={(event) => handleInputChange(event, currentQuestionIndex, wordIndex)}
            />
          ))}
        </div>
      </div>
      <div className="navigationContainer">
        <button className="navButton" onClick={handlePrev} disabled={currentQuestionIndex === 0}>
          Previous
        </button>
        {currentQuestionIndex === RoundFiveQuestions.length - 1 ? (
          <button className="submitButton" onClick={handleSubmit}>
            Submit
          </button>
        ) : (
          <button className="navButton" onClick={handleNext}>
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default RoundFive;
