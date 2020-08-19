/*  takes in parameter correctAnswer (string) and incorrectAnswers (array of strings) 
returns array of all answer options in random order */
const combineAndShuffleAnswers = (correctAnswer, incorrectAnswers) => {
  let answerChoices = new Array(correctAnswer);
  for (let incorrectAnswer of incorrectAnswers) {
    answerChoices.push(incorrectAnswer);
  }
  let ctr = answerChoices.length;
  let temp;
  let index;
  while (ctr > 0) {
    index = Math.floor(Math.random() * ctr);
    ctr = ctr - 1;
    temp = answerChoices[ctr];
    answerChoices[ctr] = answerChoices[index];
    answerChoices[index] = temp;
  }
  return answerChoices;
};

// this is the function we call upon fetching the quiz data

export const formatQuestions = (questions) => {
  let formattedQuestions = [];
  for (const question of questions) {
    formattedQuestions.push({
      text: question.text,
      correctAnswer: question.correctAnswer,
      answers: combineAndShuffleAnswers(
        question.correctAnswer,
        question.incorrectAnswers,
      ),
    });
  }
  return formattedQuestions;
};
