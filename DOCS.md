# Documentation

Hi again! 👋

This is where you'll put a few sentences about the architecture of your code.

---

App Component - fetches and formats quiz data. Formatting the data involved combining the correct + incorrect answers into one array called "answers." The App component keeps track of which quiz is "active."
The App component passes the active quiz data (title, correct answer, and answers) to the Quiz component. The Quiz component keeps track of the user's quiz specific data (questionIndex, score, number questions answered, how many times this quiz has been taken, the users selections, etc). The Quiz component passes the active question data (title, correct answer, answers) to the Question Container which returns a multiple choice question that the user interacts with.
The Question container keeps track of whether the question has been answered, and styles the screen accordingly.

Delighters

- Delighter B: I added the ability to retake a quiz. To do this, I added a state variable to the Quiz component that tracks the number of times the user takes the quiz. When they click retake, that number is incremented and all other quiz properties (ex quiz complete, active question index, score) are reset.
- Delighter C: I added the summary of the user's quiz - listing out each question title, as well as the user's answer submission. This was the last piece I worked on. To do this, I created an array to store the users answers. Whenever the user answers a question, I push to the array an object representing their selection (question title, answer, and a boolean representing whether the user answered the q correctly). My users answers container just displays the record of the user's answers in a list.

For Future Improvements -- I would handle this with a Finite State Machine so my components would not have so many 'useState' hooks, and also to remove some redundancy (for an ex of a redundancy, see comment in Summary.js)
