import React, { useState } from 'react';
import qu from './questions.json';
import { useEffect } from 'react';

function QuizApp() {
  // Sample quiz questions

  const [questions, setQuestions] = useState(qu);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [nextQ, setNextQ] = useState(0);
  const currentQuestion = questions[currentQuestionIndex];
  const [score, setScore] = useState(0);
  const [startTest, SetStartTest] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  if (localStorage.getItem('question') != null) {
    let q = JSON.parse(localStorage.getItem('question'));
    setQuestions(q);
    localStorage.removeItem('question');

  }
  else {
    localStorage.setItem('question', JSON.stringify(questions));
  }
  const handleNextQuestion = () => {
    let b = questions
    localStorage.setItem('question', JSON.stringify(b));
    let a = currentQuestionIndex;
    localStorage.setItem('currentQuestion', a);
    document.getElementById('pre').disabled = false;
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      if (currentQuestionIndex == 8) {
        document.getElementById('nex').innerText = "Submit";
      }

    } else {
      // Handle end of quiz
      let num = 0;
      questions.forEach(question => {
        if (question.selected == question.answer) {
          num += 1
        }
      });
      setScore(num);
      let html = `
      <div className="card container pp" style="margin:10px;padding:3px ; background-color: #f1dedec7; border-radius: 10px; border:1px solid black;display:flex;flex-direction:column;align-items:center;text-align:center;">
      <h2 className="card-header">You scored ${num - nextQ} out of 10</h2>
      <div className="card-body">
      <h5 className="card-title">Congratulations</h5>
      <p className="card-text">You have completed the quiz</p>
      <a href="#" className="btn btn-primary">Go somewhere</a>
      </div>
      </div>
      `
      document.querySelector('.container').style.display = 'none';
      document.querySelector('#root').innerHTML += html;
      if (localStorage.getItem('question') != null) {
        localStorage.removeItem('question');
      }
    }

    let card1 = document.getElementById('card1');
    card1.classList.add('left')
    setTimeout(() => {
      card1.classList.remove('left')
    }, 500);
  };


  const handlePreviousQuestion = () => {
    localStorage.setItem('question', JSON.stringify(questions));
    let a = currentQuestionIndex;
    localStorage.setItem('currentQuestion', a);
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

  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && !document.fullscreenElement) {
        setNextQ(nextQ + 1);
        alert("You are now back in the page", 'your mark is minus 1 from your total mark');
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullScreen(true);
      }).catch((err) => {
        alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullScreen(false);
      }).catch((err) => {
        alert(`Error attempting to exit full-screen mode: ${err.message} (${err.name})`);
      });
    }
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
      {
        startTest ? (
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
        ) : (
          <div className="container c">
            <h2>Start Quiz</h2>
            <button className='btn abs' onClick={() => { SetStartTest(true); toggleFullScreen() }}>Start Quiz</button>
          </div>
        )

      }
    </>
  );
}

export default QuizApp;
