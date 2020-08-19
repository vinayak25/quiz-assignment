import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'styled-components/macro';

import { getMessage } from './data/messages';

import { UsersAnswersContainer } from './UsersAnswersContainer';

const text = css`
  div {
    padding: 10px 0;
  }
`;
const buttonContainer = css`
  display: flex;
  justify-content: center;
  button {
    &:first-child {
      margin-right: 10px;
    }
  }
`;

/* Please note: I completed the "delighters" last. For delighter D (displaying the user's answers)
   in the quiz summary, I created a new state variable in the quiz component to hold the
   user's selections. Each 'selection' or 'userAnswer' is formatted like this
   {
     questionTitle <--string
     usersAnswer <--string
     correct: <--boolean
   }
   This summary component can now be simplified (but I was over time!)
   Ex. We could no longer pass numberCorrect from "Quiz" to Summary
   since numberCorrect will just be number of times we have
   correct: true in the usersAnswers array
   Removing "numCorrect" also means we could get rid of the "score" state variable
   in the Quiz component, since providing it to the summary is all that it is used for  
*/

const Summary = ({
  numberCorrect,
  numberTotal,
  numberTimesAttempted,
  getNextQuiz,
  retakeQuiz,
  usersAnswers,
}) => {
  const encouragement = getMessage();
  return (
    <div css={text}>
      <div>
        You got <b>{numberCorrect}</b> out of <b>{numberTotal}</b> right.
      </div>
      <div>{encouragement}</div>
      <div>
        You've attempted the quiz {numberTimesAttempted}{' '}
        <span>{numberTimesAttempted > 1 ? 'times' : 'time'}.</span>
      </div>
      <UsersAnswersContainer usersAnswers={usersAnswers} />
      <div css={buttonContainer}>
        <button onClick={getNextQuiz}>next</button>
        <button onClick={retakeQuiz}>retake</button>
      </div>
    </div>
  );
};

Summary.propTypes = {
  getNextQuiz: PropTypes.func,
  numberCorrect: PropTypes.number.isRequired,
  numberTotal: PropTypes.number.isRequired,
  numberTimesAttempted: PropTypes.number.isRequired,
  retakeQuiz: PropTypes.func.isRequired,
  usersAnswers: PropTypes.arrayOf(
    PropTypes.shape({
      questionTitle: PropTypes.string,
      correct: PropTypes.bool,
      usersAnswer: PropTypes.string,
    }),
  ),
};

export { Summary };
