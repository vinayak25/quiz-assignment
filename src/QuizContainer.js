import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { quiz } from './common/sharedProptypes';
import { QuestionContainer } from './QuestionContainer';
import { Summary } from './Summary';

const QuizContainer = ({ quiz, title, questions, getNextQuiz }) => {
  /* another way:
  const state = {
    currentQuestion: {},
    quizComplete: false,
    numQuestionsAnswered: 0,
    score: 0,
    numAttempted: 0,
    usersSelections:[]
}; */
  const quizLength = questions.length;

  const [quizComplete, setQuizComplete] = useState(false);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [numQuestionsAnswered, setNumQuestionsAnswered] = useState(0);
  const [score, setScore] = useState(0);
  const [numAttempted, setNumAttempted] = useState(1); // counting user starting quiz as one attempt
  const [userSelections, setUserSelections] = useState([]);

  const getNextQuestion = () => {
    setActiveQuestionIndex(activeQuestionIndex + 1);
  };

  const resetQuiz = () => {
    setQuizComplete(false);
    setActiveQuestionIndex(0);
    setNumQuestionsAnswered(0);
    setScore(0);
    setUserSelections([]);
  };

  useEffect(() => {
    resetQuiz();
  }, [quiz]);

  useEffect(() => {
    if (numQuestionsAnswered === quizLength) {
      setQuizComplete(true);
    }
  }, [numQuestionsAnswered, quizLength]);

  const incrementScore = () => {
    setScore(score + 1);
  };

  const incrementNumberQuestionsAnswered = () => {
    setNumQuestionsAnswered(numQuestionsAnswered + 1);
  };

  const retakeQuiz = () => {
    setNumAttempted(numAttempted + 1);
    resetQuiz();
  };

  const recordUsersAnswer = (questionTitle, usersAnswer, correctAnswer) => {
    if (usersAnswer === correctAnswer) {
      incrementScore();
    }
    incrementNumberQuestionsAnswered();
    setUserSelections((prevState) => [
      ...prevState,
      {
        questionTitle: questionTitle,
        usersAnswer: usersAnswer,
        correct: usersAnswer === correctAnswer,
      },
    ]);
  };

  return (
    <div>
      <h1>{title}</h1>
      {!quizComplete && questions[activeQuestionIndex] ? (
        <Fragment>
          <QuestionContainer
            question={questions[activeQuestionIndex]}
            trackUsersAnswer={recordUsersAnswer}
          />
          <button
            type="button"
            disabled={activeQuestionIndex === numQuestionsAnswered}
            onClick={() => getNextQuestion()}
          >
            next
          </button>
        </Fragment>
      ) : (
        <Summary
          numberCorrect={score}
          numberTotal={quizLength}
          numberTimesAttempted={numAttempted}
          retakeQuiz={retakeQuiz}
          usersAnswers={userSelections}
          getNextQuiz={getNextQuiz}
        />
      )}
    </div>
  );
};
QuizContainer.propTypes = PropTypes.shape(quiz);

QuizContainer.propTypes = {
  quiz: PropTypes.shape(quiz).isRequired,
  getNextQuestion: PropTypes.func,
};
export { QuizContainer };
