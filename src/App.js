import React, { useEffect, useState } from 'react';
import { getQuizzes } from './data/quizzes';
import { formatQuestions } from './helpers';

import { QuizContainer } from './QuizContainer';

import './styles.css';

const App = () => {
  const [quizzes, setQuizzes] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const quizzes = await getQuizzes();
        const formattedQuizzes = [];
        for (const quiz of quizzes) {
          formattedQuizzes.push({
            title: quiz.title,
            questions: formatQuestions(quiz.questions),
          });
        }
        setError(null);
        setQuizzes(formattedQuizzes);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, []);

  const [activeQuizIndex, setActiveQuizIndex] = useState(0);

  const getNextQuiz = () => {
    const nextQuizIndex =
      activeQuizIndex + 1 < quizzes.length ? activeQuizIndex + 1 : 0;
    setActiveQuizIndex(nextQuizIndex);
  };

  return (
    <div className="app">
      {!quizzes && !error && (
        <div>
          The quiz will load shortly! <br /> Thanks for your patience.
        </div>
      )}
      {error && <div>We're sorry. There seems to have been an error!</div>}
      {quizzes && (
        <QuizContainer
          quiz={quizzes[activeQuizIndex]}
          title={quizzes[activeQuizIndex].title}
          questions={quizzes[activeQuizIndex].questions}
          getNextQuiz={getNextQuiz}
        />
      )}
    </div>
  );
};

export { App };
