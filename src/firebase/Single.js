import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { render } from '@testing-library/react';
import "../Single.css";
import fire from "./fire";
import Main from './Main';
import { isCompositeComponentWithType } from 'react-dom/test-utils';
import { QuizData } from './QuizData';

class Single extends Component {
    state = {
        userAnswer: null,
        currentQuestion: 0,
        options: [],
        endQuiz: false,
        score: 0,
        disabled: true,
        time: 15
    }

        loadQuiz = () => {
            const {currentQuestion} = this.state;
            this.setState(() => {
                return {
                    questions: QuizData[currentQuestion].question,
                    options: QuizData[currentQuestion].options,
                    answers: QuizData[currentQuestion].answer
                }
            })
        }

    componentDidMount() {
        this.loadQuiz();
        // this.timer();
    }

    nextQuestionHandler = () => {

        if (this.state.currentQuestion === QuizData.length - 1) {
            this.endHandler();
        } else {
        const {userAnswer, answers, score} = this.state;
        this.setState({
            currentQuestion: this.state.currentQuestion + 1
        })
        console.log(this.state.currentQuestion)

        if (userAnswer === answers) {
            if(this.state.time >= 10){
                this.setState({
                    score: score + 200
         })}
            else{
                this.setState({
                    score: score + this.state.time * 20
                })
            }
        }
        this.setState({
            time: 15
        })
    }
}
    componentDidUpdate(prevProps, prevState) {
        const {currentQuestion} = this.state;
        if (this.state.currentQuestion !== prevState.currentQuestion) {
            this.setState(() => {
                return {
                    disabled: true,
                    questions: QuizData[currentQuestion].question,
                    options: QuizData[currentQuestion].options,
                    answers: QuizData[currentQuestion].answer
                };
            })
        }
    }

    checkAnswer = answer => {
        this.setState({
            userAnswer: answer,
            disabled: false
        })
    }

    endHandler = () => {
        const {userAnswer, answers, score} = this.state;
        if (this.state.currentQuestion === QuizData.length - 1) {
            this.setState({
                endQuiz: true
            })
        }

        if (userAnswer === answers) {
            if(this.state.time >= 10){
                this.setState({
                    score: score + 200
         })
        }else{
                this.setState({
                    score: score + this.state.time * 20
                })
            }
        }
        this.setState({
            time: -2
        })
    }
    

    // Add timer for the game
    // Also, NextQuestionHandle is also invoked in the timer
    timer = () => {
        setInterval(() => {
            this.setState((preState) =>({
              time: preState.time - 1,
            }), () =>{
                if(this.state.time === -1){
                    this.nextQuestionHandler()
                    this.setState({
                        time: 5
                    })
                }
                else if(this.state.time < -1) {
                    
                }
            }
            );
          }, 1000)
    }

    // componentDidMount () {
    //     const {question, currentQuestion, nextQuestion} = this.state;
    //     this.displayQuestions(question, currentQuestion, nextQuestion);
    // }

    // displayQuestions = (question = this.state.question, currentQuestion, nextQuestion) => {
    //     let {currentQuestionIndex} = this.state;
    //     if (isCompositeComponentWithType(this.state.question)) {
    //         question = this.state.question;
    //         currentQuestion = question[currentQuestionIndex];
    //         nextQuestion = question[currentQuestionIndex + 1];
    //         const answer = currentQuestion.answer;
    //         this.setState({
    //             currentQuestion,
    //             nextQuestion,
    //             answer
    //         });
    //     }

    // startTimer = () => {
    //     const countDown = Date.now() + 30000;
    //     this.interval = setInterval(() => {
    //         const now = new Date();
    //         const distance = countDown = now;

            
    //     })
    // }

    render () {
        const {questions, options, currentQuestion, userAnswer, endQuiz, time, score} = this.state;

            if(endQuiz) {
                return (
                    <div>
                        <h1>Game Over. Your final score is {this.state.score} points</h1>
                        <p></p>
                        <Link to="/"><button>Go Back</button></Link>
                    </div>
                )
            }

        return (
            <Fragment>
                <title>Question</title>
                <div className="question">
                    <p>
        <span className="clock">{time}</span>
                    </p>
        <div>Your Score: {score}</div>
                    <h5>{questions}</h5>
                    <span> {`Questions ${currentQuestion} out of ${QuizData.length - 1}`}</span>
                    {options.map(option => (
                        <p key={option.id} className= {`ui floating message options ${userAnswer === option ? "selected" : null}`} onClick ={() => this.checkAnswer(option)}>
                            {option}
                        </p>
                    ))}
                    <br /><br /><br /><br />
                    <div className="button-container">
                        {currentQuestion < QuizData.length - 1 && <button disabled={this.state.disabled} onClick={this.nextQuestionHandler}>Next</button>}
                        {currentQuestion === QuizData.length - 1 && <button onClick={this.endHandler}>End</button>}
                    </div>
                </div>
            </Fragment>
        );
    }
}
    

export default Single;