const STATUS = {
  SUCCESS: 1,
  FAILED: 0,
  INITIAL: -1,
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentQuestionNumber: 0,
      correctAnswers: 0,
      currentAnswer: '',
      currentAnswerStatus: STATUS.INITIAL,
      isHintVisible: false
    };

    this.checkAnswer = this.checkAnswer.bind(this);
    this.setAnswer = this.setAnswer.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.showHint = this.showHint.bind(this);
    this.resetQuiz = this.resetQuiz.bind(this);
  }

  checkAnswer() {
    if (`${this.state.currentAnswer}`.toLowerCase().trim() === `${this.props.questions[this.state.currentQuestionNumber].correctAnswer}`.toLowerCase().trim()) {
      this.setState((prevState) => {
        return {
          currentAnswerStatus: STATUS.SUCCESS,
          correctAnswers: prevState.correctAnswers + 1,
        };
      });
    } else {
      this.setState({
        currentAnswerStatus: STATUS.FAILED
      });
    }
  }

  setAnswer(answer) {
    console.log(answer);
    this.setState({
      currentAnswer: answer
    });
  }

  showHint() {
    this.setState({
      isHintVisible: true
    });
  }

  resetQuiz() {
    this.setState({
      currentQuestionNumber: 0,
      correctAnswers: 0,
      currentAnswer: '',
      currentAnswerStatus: STATUS.INITIAL,
      isHintVisible: false
    });
  }

  nextQuestion() {
    this.setState((prevState) => {
      return {
        currentAnswer: '',
        currentAnswerStatus: STATUS.INITIAL,
        currentQuestionNumber: prevState.currentQuestionNumber + 1,
        isHintVisible: false
      };
    });
  }

  render() {
    const {currentQuestionNumber, currentAnswer, currentAnswerStatus, correctAnswers, isHintVisible} = this.state;
    const {questions} = this.props;

    const score = Math.round((correctAnswers/questions.length)*100);
    return (
      <div className="quiz">
        <div className="container">
          <div className="row">
            <div className="col-12 ">
              <div className="card">
                <div className="card-body">
                  {currentQuestionNumber < questions.length ? <div>
                    <div>
                      {currentAnswerStatus === STATUS.SUCCESS && <div className="alert alert-success">Poprawna odpowiedź!</div>}
                      {currentAnswerStatus === STATUS.FAILED && <div className="alert alert-danger">
                        <p className="m-0">Błędna odpowiedź! Poprawna odpowiedź to:</p>
                        {questions[currentQuestionNumber].type === 'choice' && <b>{questions[currentQuestionNumber].answers[questions[currentQuestionNumber].correctAnswer]}</b>}
                        {questions[currentQuestionNumber].type === 'response' && <b>{questions[currentQuestionNumber].correctAnswer}</b>}
                      </div>}
                    </div>
                    <div>
                      <div>
                        Pytanie: {currentQuestionNumber + 1}/{questions.length}
                      </div>
                      <h4>{questions[currentQuestionNumber].title}</h4>
                    </div>
                    <div>
                      {questions[currentQuestionNumber].type === 'choice' && <div>
                        {questions[currentQuestionNumber].answers.map((answer, index) => <label key={index} className="d-block"><input disabled={currentAnswerStatus !== STATUS.INITIAL} checked={currentAnswer === index} onChange={() => this.setAnswer(index)} name="answer" type="radio" value={index} id={`answer${index}`} /> {answer}</label>)}
                      </div>}
                      {questions[currentQuestionNumber].type === 'response' && <div>
                        <div className="form-group">
                          <input type={'text'} className={'form-control'} placeholder={'Tutaj wpisz odpowiedź'} onChange={(input) => this.setAnswer(input.target.value)} value={this.currentAnswer}/>
                        </div>
                      </div>}
                    </div>
                    {isHintVisible && <div>
                      <hr/>
                      <b>Wskazówka:</b>
                      <p>{questions[currentQuestionNumber].hint}</p>
                      <hr/>
                    </div>}
                    <div className="d-flex justify-content-between">
                      <button className="btn btn-outline-primary" disabled={isHintVisible} onClick={this.showHint}>Pokaż wskazówkę</button>
                      {currentAnswerStatus === STATUS.INITIAL && <button type="button" className="btn btn-primary" onClick={this.checkAnswer}>Sprawdź odpowiedź</button>}
                      {currentAnswerStatus !== STATUS.INITIAL && <button type="button" className="btn btn-primary" onClick={this.nextQuestion}>Dalej</button>}
                    </div>
                  </div> : <div>
                    <p className="m-0">Podsumowanie</p>
                    <h4>Wynik: {correctAnswers}/{questions.length}</h4>
                    <p>Uzyskany wnik stanowi {score}% poprawnych odpowiedzi.</p>
                    {score <= 50 && <p>Słaby wynik. Być może to dobry moment na powtórkę? Zachęcamy do ponownego przejrzenia materiału i spróbowania ponownie.</p>}
                    {score > 50 && score < 90 && <p>Całkiem dobrze. Być może dodatkowy rzut okiem na materiały pomoże uzyskać lepszy wynik w kolejnym podejściu.</p>}
                    {score >= 90 && <p>Gratulacje! Bardzo dobry wynik. Możesz przejść do dalszej części kursu bez obaw!</p>}
                    <button type="button" className="btn btn-primary" onClick={this.resetQuiz}>Rozpocznij ponownie</button>
                  </div>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function render (config) {
  ReactDOM.render(
    <React.StrictMode>
      <App questions={config.questions} />
    </React.StrictMode>,
    document.getElementById(config.appendId)
  );
}

window.Quiz = {
  render
};
