import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { question } from './common/sharedProptypes';

import styled, { css } from 'styled-components/macro';

const questionContainer = css`
  display: flex;
  align-content: middle;
  flex-direction: column;
  padding: 20px 0;
`;
const questionTitle = css`
  font-size: 14px;
`;

const optionContainer = css`
  margin: 0 auto;
  padding: 10px 0;
`;

const showCorrect = css`
  border: 1px solid green;
`;

const showIncorrect = css`
  border: 1px solid red;
  text-decoration: line-through;
  button {
    text-decoration: line-through;
  }
`;

const StyledOption = styled.li`
  list-style: upper-alpha;
  list-style-position: inside;
  padding-left: 8px;
  text-align: left;
  padding-top: 4px;
  padding-bottom: 4px;
  align-content: center;
  vertical-align: middle;
  margin-bottom: 10px;
  button {
    border: none;
    background: none;
    :active,
    :focus {
      outline: none;
    }
    :hover {
      cursor: pointer;
    }
    :disabled {
      color: black;
      cursor: not-allowed;
    }
  }
  ${({ showSuccess }) => showSuccess && showCorrect}
  ${({ showMistake }) => showMistake && showIncorrect}
`;

const QuestionContainer = ({ question, trackUsersAnswer }) => {
  const [answerChosen, setAnswerChosen] = useState('');
  const [message, setMessage] = useState('');

  // reset local state whenever a new question is provided
  useEffect(() => {
    setMessage('');
    setAnswerChosen('');
  }, [question]);

  const { text, correctAnswer, answers } = question;

  const handleOptionClick = (optionSelected) => {
    setAnswerChosen(optionSelected);
    trackUsersAnswer(text, optionSelected, correctAnswer);
    if (optionSelected === correctAnswer) {
      setMessage('Correct!');
    } else {
      setMessage('Incorrect...');
    }
  };

  return (
    <div css={questionContainer}>
      <h2 css={questionTitle}>{text}</h2>
      <ul css={optionContainer}>
        {answers.map((option) => {
          return (
            <StyledOption
              key={option}
              showSuccess={answerChosen && option === correctAnswer}
              showMistake={
                answerChosen &&
                option === answerChosen &&
                option !== correctAnswer
              }
            >
              <button
                onClick={() => handleOptionClick(option)}
                disabled={answerChosen}
              >
                {option}
              </button>
            </StyledOption>
          );
        })}
      </ul>
      {answerChosen && message && <div>{message}</div>}
    </div>
  );
};

QuestionContainer.propTypes = {
  question: PropTypes.shape(question).isRequired,
  trackUsersAnswer: PropTypes.func.isRequired,
};

export { QuestionContainer };
