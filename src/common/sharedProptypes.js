import PropTypes from 'prop-types';

export const question = {
  text: PropTypes.string,
  correctAnswer: PropTypes.string,
  answerChoices: PropTypes.arrayOf(PropTypes.string),
};

export const quiz = {
  title: PropTypes.string,
  questions: PropTypes.arrayOf(PropTypes.shape(question)),
};
