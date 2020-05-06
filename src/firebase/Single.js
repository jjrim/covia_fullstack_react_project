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
        quitQuiz: false,
        score: 0,
        disabled: true
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
    }

    nextQuestionHandler = () => {
        const {userAnswer, answer, score} = this.state;
        this.setState({
            currentQuestion: this.state.currentQuestion + 1
        })
        // console.log(this.state.currentQuestion)

        if (userAnswer === answer) {
            this.setState({
                score: score + 1
            })
        }
    }

    componentDidUpdate(props, state) {
        const {currentQuestion} = this.state;
        if (this.state.currentQuestion !== state.currentQuestion) {
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
        if (this.state.currentQuestion === QuizData.length - 1) {
            this.setState({
                endQuiz: true
            })
        }
    }
    
    quitHandler = () => {
        this.setState({
            quitQuiz: true
        })
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
        const {questions, options, currentQuestion, userAnswer, endQuiz, quitQuiz, score} = this.state;

            if(endQuiz) {
                return (
                    <div>
                        <h1>Game Over. Your final score is {this.state.score} points</h1>
                        <p></p>
                    </div>
                )
            }

            if(quitQuiz) {
                return (
                    <div>
                        <h1>Your score is: </h1>
                    </div>
                )
            }

        return (
            <Fragment>
                <title>Question</title>
                <div className="question">
                    <p>
                        <span className="clock">00:15</span>
                    </p>
                    <h5>{questions}</h5>
                    <span> {`Questions ${currentQuestion} out of ${QuizData.length-1}`}</span>
                    {options.map(option => (
                        <p key={option.id} className= {`ui floating message options ${userAnswer === option ? "selected" : null}`} onClick ={() => this.checkAnswer(option)}>
                            {option}
                        </p>
                    ))}
                    <br /><br /><br /><br />
                    <div className="button-container">
                        {currentQuestion < QuizData.length - 1 && <button disabled={this.state.disabled} onClick={this.nextQuestionHandler}>Next</button>}
                        {currentQuestion < QuizData.length - 1 && <button onClick={this.quitHandler}>Quit</button>}
                        {currentQuestion === QuizData.length - 1 && <button onClick={this.endHandler}>End</button>}
                    </div>
                </div>
            </Fragment>
        );
    }
}
    

export default Single;