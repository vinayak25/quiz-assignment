import React from 'react';
import { css } from 'styled-components/macro';

const answerList = css`
  padding-top: 20px;
  text-align: left;
  list-style: decimal;
`;

const correctAnswer = css`
  color: green;
`;

const incorrectAnswer = css`
  color: red;
  text-decoration: line-through;
`;

/* usersAnswers is an array of objects that look like this:
{
  questionTitle <-- string,
  usersAnswer <-- string,
  correct <-- boolean
} */

const UsersAnswersContainer = ({ usersAnswers }) => {
  return (
    <ol css={answerList}>
      {usersAnswers.map(({ questionTitle, usersAnswer, correct }) => {
        return (
          <li key={questionTitle}>
            <i>{questionTitle} </i>
            <span css={correct ? correctAnswer : incorrectAnswer}>
              <b>{usersAnswer}</b>
            </span>
          </li>
        );
      })}
    </ol>
  );
};

export { UsersAnswersContainer };
