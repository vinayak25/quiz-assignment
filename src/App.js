import React, { useEffect, useState } from 'react';
import { getQuizzes } from './data/quizzes';
import { formatQuestions } from './helpers';

import { QuizContainer } from './QuizContainer';

import './styles.css';

const App = () => {

  return (
    <div className="app">
    <div>
      <h1>Hey there!</h1>
      <h2>Let's build something cool together</h2>
    </div>
    </div>
  );
};

export { App };
