import React, { useState, useEffect } from 'react';
import Question from './Question';
import axios from 'axios';

const Quiz = ({ onQuizComplete }) => {
  const [quiz, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizComplete, setQuizComplete] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchQuiz();
  }, []);

  const fetchQuiz = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/quizzes/1');
      setQuiz(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load quiz. Make sure the backend is running.');
      setLoading(false);
    }
  };

  const handleAnswer = (optionIndex) => {
    if (!answered) {
      setSelectedAnswer(optionIndex);
      const isCorrect = optionIndex === quiz.questions[currentQuestionIndex].correctAnswer;
      if (isCorrect) {
        setScore(score + 1);
      }
      setAnswered(true);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setAnswered(false);
      setSelectedAnswer(null);
    } else {
      setQuizComplete(true);
    }
  };

  if (loading) {
    return <div className="loading">Loading quiz...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!quiz) {
    return <div className="error">Quiz not found</div>;
  }

  if (quizComplete) {
    const percentage = Math.round((score / quiz.questions.length) * 100);
    return (
      <div className="quiz-complete">
        <h2>Quiz Complete!</h2>
        <div className="score-result">
          <p>Your Score: <span className="score-number">{score}/{quiz.questions.length}</span></p>
          <p>Percentage: <span className="percentage">{percentage}%</span></p>
        </div>
        <button onClick={() => onQuizComplete(score)}>Finish</button>
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];

  return (
    <div className="quiz-container">
      <h1>{quiz.title}</h1>
      <Question
        question={currentQuestion}
        questionIndex={currentQuestionIndex}
        totalQuestions={quiz.questions.length}
        onAnswer={handleAnswer}
      />

      {answered && (
        <div className={`feedback ${selectedAnswer === currentQuestion.correctAnswer ? 'correct' : 'incorrect'}`}>
          {selectedAnswer === currentQuestion.correctAnswer ? '✓ Correct!' : '✗ Incorrect'}
          <p>The correct answer is: {currentQuestion.options[currentQuestion.correctAnswer]}</p>
        </div>
      )}

      {answered && (
        <button className="next-btn" onClick={handleNext}>
          {currentQuestionIndex === quiz.questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
        </button>
      )}
    </div>
  );
};

export default Quiz;
