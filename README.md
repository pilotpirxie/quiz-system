# quiz-system
Simple quiz widget for websites build with React. Could be append as part of existing website or run as external application. Supports two types of question:
* ``choice`` from multiple option,
* check if user ``response`` is correct. 

### How to use?
Development and deployment is very easy. Just follow instruction:
```bash
# clone with git
git clone

# open quiz directory
cd quiz

# install dependencies
yarn

# run dev server in cra directory
yarn start

# to deploy, use cra or babel
yarn build 

# or with babel, copy index.js to quiz-babel/src/quiz-system.js without imports, 
# install dependencies like with cra and then call
yarn yarn
``

### How to use on website?
* Append script on the end of the body
* Call ``Quiz.render()`` method with configuration object

### Sample configuration
```js
window.Quiz.render({
  appendId: 'quiz',
  questions: [{
    type: 'choice',
    title: 'Question #1?',
    answers: [
      'Answer #1',
      'Answer #2',
      'Answer #3',
      'Answer #4',
    ],
    correctAnswer: 1,
    hint: 'Here hint',
  }, {
    type: 'choice',
    title: 'Question #2?',
    answers: [
      'Answer #1',
      'Answer #2',
    ],
    correctAnswer: 0,
    hint: 'Here hint',
  }, {
    type: 'response',
    title: 'Open question #3?',
    correctAnswer: 'correct answer',
    hint: 'Here hint',
  }]
});
```
