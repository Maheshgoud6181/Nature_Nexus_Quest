import React, { useState, useRef, useEffect } from 'react';
import './roundFive.css'; // Import your CSS file for styling

const RoundFiveQuestions = [
  {
    questionParts: ["When the ", " effect works a little too "],
    answer: ["greenhouse", "good"],
    image: "image6.png"
  },
  {
    questionParts: ["When you're trying to enjoy the weekend ", " but you have wormed the planet to inhabitable "],
    answer: ["outdoor", "heat"],
    image: "image1.png"
  },
  {
    questionParts: ["Not sure if you don't know how to ", " or if you hate ", " creatured"],
    answer: ["recycle", "innocent"],
    image: "image2.png"
  },
  {
    questionParts: ["Vegans when they ", " what makes fossil "],
    answer: ["realise", "fuels"],
    image: "image3.png"
  }
];

const RoundFive = () => {
  const [index, setIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState(RoundFiveQuestions.map(q => q.answer.map(ans => Array(ans.length).fill(""))));
  const [showscore, setShowscore] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, RoundFiveQuestions[index].answer.reduce((sum, ans) => sum + ans.length, 0));
  }, [index]);

  function handleInputChange(e, answerIndex, charIndex) {
    const newAnswers = [...userAnswers];
    newAnswers[index][answerIndex][charIndex] = e.target.value;
    setUserAnswers(newAnswers);

    if (e.target.value && charIndex < newAnswers[index][answerIndex].length - 1) {
      inputRefs.current[calculateInputIndex(answerIndex, charIndex) + 1].focus();
    }
  }

  function handleKeyDown(e, answerIndex, charIndex) {
    if (e.key === 'Backspace' && !userAnswers[index][answerIndex][charIndex]) {
      const prevIndex = calculateInputIndex(answerIndex, charIndex) - 1;
      if (prevIndex >= 0) {
        inputRefs.current[prevIndex].focus();
      }
    }
  }

  function calculateInputIndex(answerIndex, charIndex) {
    return RoundFiveQuestions[index].answer.slice(0, answerIndex).reduce((sum, ans) => sum + ans.length, 0) + charIndex;
  }

  function totalscore() {
    return userAnswers.reduce((score, userAnswer, i) => {
      const correctAnswers = RoundFiveQuestions[i].answer;
      const isCorrect = userAnswer.every((answer, j) => answer.join('').trim().toLowerCase() === correctAnswers[j].toLowerCase());
      return score + (isCorrect ? 1 : 0);
    }, 0);
  }

  function nextq() {
    if (index < RoundFiveQuestions.length - 1) {
      setIndex(index + 1);
    }
  }

  function prevs() {
    if (index > 0) {
      setIndex(index - 1);
    }
  }

  return (
    <div className='container'>
      <h1 className='header'>Round 5 : Meme Quiz</h1>
      <div className='questionContainer'>
        {showscore ? (
          <h1>Total Score: {totalscore()}/{RoundFiveQuestions.length}</h1>
        ) : (
          <div>
            <h1 className='question'>
              Q.{index + 1})&emsp;
              {RoundFiveQuestions[index].questionParts.map((part, partIndex) => (
                <span key={partIndex}>
                  {part}
                  {partIndex < RoundFiveQuestions[index].answer.length && RoundFiveQuestions[index].answer[partIndex].split('').map((char, charIndex) => (
                    <input
                      key={charIndex}
                      type="text"
                      maxLength="1"
                      value={userAnswers[index][partIndex][charIndex]}
                      onChange={(e) => handleInputChange(e, partIndex, charIndex)}
                      onKeyDown={(e) => handleKeyDown(e, partIndex, charIndex)}
                      ref={el => inputRefs.current[calculateInputIndex(partIndex, charIndex)] = el}
                      className="blank-input"
                    />
                  ))}
                </span>
              ))}
            </h1>
            {RoundFiveQuestions[index].image && (
              <img src={RoundFiveQuestions[index].image} alt={`Question ${index + 1}`} className="question-image" />
            )}
            <button className='pre' onClick={prevs}>Prev</button>
            {index === RoundFiveQuestions.length - 1 ? (
              <button className='submit' onClick={() => setShowscore(true)}>Submit</button>
            ) : (
              <button className='nextbtn' onClick={nextq}>Next</button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default RoundFive;
