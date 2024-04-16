import React, { useState } from 'react';
import questions from './questions.json';
function QuizApp() {
  // Sample quiz questions


  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [nextQ, setNextQ] = useState(0);
  const currentQuestion = questions[currentQuestionIndex];
  const [score, setScore] = useState(0);
  const handleNextQuestion = () => {
    document.getElementById('pre').disabled = false;
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      if (currentQuestionIndex == 8) {
        document.getElementById('nex').innerText = "Submit";
      }

    } else {
      // Handle end of quiz
      questions.forEach(element => {
        if (element.selected == element.answer) {
          setScore(score + 1);
        }
      });
      let html = `
      <div className="card container pp" style="margin:10px;padding:3px ; background-color: #f1dedec7; border-radius: 10px; border:1px solid black;display:flex;flex-direction:column;align-items:center;text-align:center;">
      <h2 className="card-header">You scored ${score} out of 10</h2>
      <div className="card-body">
      <h5 className="card-title">Congratulations</h5>
      <p className="card-text">You have completed the quiz</p>
      <a href="#" className="btn btn-primary">Go somewhere</a>
      </div>
      </div>
      `
      document.querySelector('.container').style.display = 'none';
      document.querySelector('#root').innerHTML += html;
    }
    let card1 = document.getElementById('card1');
    card1.classList.add('left')
    setTimeout(() => {
      card1.classList.remove('left')
    }, 500);
  };
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      document.getElementById('nex').innerText = "Next Question";
      if (currentQuestionIndex == 1) {
        document.getElementById('pre').disabled = true;
      }

    } else {
      // Handle end of quiz
      document.getElementById('pre').disabled = true;
    }
    let card1 = document.getElementById('card1');
    card1.classList.add('left')
    setTimeout(() => {
      card1.classList.remove('left')
    }, 500);
  };


  const Setanswer = (e) => {
    currentQuestion.selected = e.target.innerText;
    let a = e.target.parentNode
    for (let i = 0; i < a.childNodes.length; i++) {
      a.childNodes[i].style.backgroundColor = '#7070706b';
    }
    e.target.style.backgroundColor = 'green';
  }

  return (
    <>
      <div className="container">
        <h2>{currentQuestionIndex + 1}</h2>
        <section>
          <div id='card1'>
            <div className="card" style={{ width: "18rem" }}>
              <h2 className="card-header">{currentQuestion.question}</h2>
              <ul className="list-group list-group-flush">
                {currentQuestion.options.map((option, index) => (
                  <li className="list-group-item" key={option} onClick={
                    (e) => {
                      currentQuestion.selected = option;
                      e.target.style.backgroundColor = 'green';
                    }
                  }>{option}</li>
                ))}
              </ul>
            </div>
          </div>
          <div id='card2'>
            <div className="card" style={{ width: "18rem" }}>
              <h2 className="card-header">{currentQuestion.question}</h2>
              <ul className="list-group list-group-flush">
                {currentQuestion.options.map((option, index) => {

                  if (currentQuestion.selected == option) {
                    return (
                      <li className="list-group-item " style={{ background: 'green' }} key={option} onClick={
                        (e) => {
                          Setanswer(e)
                        }}
                      >{option}</li>
                    )
                  }
                  else {
                    return (


                      <li className="list-group-item" style={{ background: "#7070706b" }} key={option} onClick={
                        (e) => {
                          Setanswer(e)
                        }
                      }>{option}</li>
                    )
                  }
                })}
              </ul>
            </div>
          </div>




        </section>
        <div className="buttons">
          <button id='pre' className='btn' onClick={handlePreviousQuestion}>Previous Question</button>
          <button id='nex' className='btn' onClick={handleNextQuestion}>Next Question</button>
        </div>
      </div>
    </>
  );
}

export default QuizApp;
