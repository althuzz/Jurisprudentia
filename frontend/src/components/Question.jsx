import React from 'react';

const Question = ({ question, questionIndex, totalQuestions, onAnswer }) => {
  const handleOptionClick = (optionIndex) => {
    onAnswer(optionIndex);
  };

  return (
    <div className="question-container">
      <div className="question-info">
        <span>Question {questionIndex + 1} of {totalQuestions}</span>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${((questionIndex + 1) / totalQuestions) * 100}%` }}
          ></div>
        </div>
      </div>

      <h2 className="question-text">{question.question}</h2>

      <div className="options">
        {question.options.map((option, index) => (
          <button
            key={index}
            className="option-btn"
            onClick={() => handleOptionClick(index)}
          >
            {String.fromCharCode(65 + index)}. {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;
