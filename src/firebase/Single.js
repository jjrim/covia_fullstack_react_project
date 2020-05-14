import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { render } from '@testing-library/react';
import "../Single.css";
import fire from "./fire";
import Main from './Main';
import { isCompositeComponentWithType } from 'react-dom/test-utils';
import { QuizData } from './QuizData';
import { Icon } from 'semantic-ui-react'
import $ from 'jquery'
import leeke from './leeke.png'
import CreateUser from "../components/create-user.component";
import Music from './ButtonClicked'



// Shuffle the questions
let newArray = QuizData.sort(() => {
    return 0.5 - Math.random()
})
let fiveQuestions = newArray.slice(QuizData, 5)
// Shuffle the options
for(let i = 0; i < 5; i++){
    fiveQuestions[i].options.sort( () => {
        return 0.5 - Math.random()
    })
}
console.log(fiveQuestions)


class Single extends Component {
    state = {
        userAnswer: null,
        currentQuestion: 0,
        options: [],
        endQuiz: false,
        score: 0,
        disabled: true,
        time: 15,
        random: fiveQuestions,
        isClicked: false
    }

        loadQuiz = () => {
            const {currentQuestion, random} = this.state;
            this.setState(() => {
                return {
                    questions: random[currentQuestion].question,
                    options: random[currentQuestion].options,
                    answers: random[currentQuestion].answer
                }
            })
        }

    componentDidMount() {
        this.loadQuiz();
        this.timer();
    }

    nextQuestionHandler = () => {
        const {userAnswer, answers, score} = this.state;
        // Avoid Further Click
        this.setState({
            disabled: true
        })
        // If next question is the last one
        if (this.state.currentQuestion === this.state.random.length - 1) {
            this.endHandler();
        } 
        // After 2 seconds, switch to next question
        else {
        setTimeout(() => {
            this.setState({
                currentQuestion: this.state.currentQuestion + 1,
                isClicked: false
            });
            console.log(this.state.currentQuestion);
        }, 2000);
        
        // Get 200 marks if the remaining time is > or = 10
        // If you want to change the background color of correct option, modify the 'green' to others
        // Origin Background: background: linear-gradient(157.81deg, rgba(32, 139, 216, 0.3) 15%,rgba(173, 107, 204, 0.4361) 73%);
        if (userAnswer === answers) {
            $('.selected').css("cssText", 'background: #77bfa3 !important');
            if(this.state.time >= 10){
                this.setState({
                    score: score + 200
         })}
            else if(this.state.time <= 0){
                this.setState({
                    score: score 
                })
            }
            else{
                this.setState({
                    score: score + this.state.time * 20
                })
            }
        }
        // If choose wrong option
        else{
            $('.selected').css("cssText", 'background: #ef476f !important');
        }
        // Remove background of the selected option
        setTimeout(() => {
            $('.options').removeAttr("style");
        }, 1999);
        this.setState({
            time: 17
        })
    }
}
    componentDidUpdate(prevProps, prevState) {
        this.alertUserTime()
        this.changeTimeColor()
        const {currentQuestion} = this.state;
        if (this.state.currentQuestion !== prevState.currentQuestion) {
            let { random } = this.state
            this.setState(() => {
                return {
                    disabled: true,
                    questions: random[currentQuestion].question,
                    options: random[currentQuestion].options,
                    answers: random[currentQuestion].answer
                };
            })
        }
    }

    checkAnswer = answer => {
        this.setState({
            userAnswer: answer,
        })

        if(!(this.state.isClicked)){
            this.setState({
                disabled: false,
                isClicked: true
            })
        }
    }

    endHandler = () => {
        const {userAnswer, answers, score} = this.state;
        this.setState({
            disabled: true,
            isClicked: true
        })
        // End the game in 2 seconds
        if (this.state.currentQuestion === this.state.random.length - 1) {
            setTimeout(() => {
                this.setState({
                    endQuiz: true
                })
            }, 2000);
        }

        if (userAnswer === answers) {
            $('.selected').css("cssText", 'background: #77bfa3 !important');
            if(this.state.time >= 10){
                this.setState({
                    score: score + 400
         })
            }
            else if(this.state.time <= 0){
                this.setState({
                    score: score
                })
            }
            else{
                this.setState({
                    score: score + this.state.time * 40
                })
                }
        }
        else{
            $('.selected').css("cssText", 'background: #ef476f !important');
        }

        if(this.state.time <= 0){
            this.setState({
                endQuiz: true
            })
        }
        this.setState({
            time: 3
        })
    }

    logout(){
        fire.auth().signOut();
    };

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
                        time: 17
                    })
                }
                else if(this.state.time < -1) {
                    
                }
            }
            );
          }, 1000)
    }
    changeTimeColor = () => {
        if(this.state.time > 15){
            $('.clock').css('color', 'yellow')
        }
        if(this.state.time > 10 || this.state.time < 15){
            $('.clock').css('color', 'red')
        }

        if(this.state.time <= 10){
            $('.clock').css('color', '#016936')
        }
        if(this.state.time <= 4){
            $('.clock').css('color', '#B03060')
        }
    }
    
    alertUserTime = () =>{
        if(this.state.time < 6 && this.state.time > 0){
            if (this.state.currentQuestion ==4 && this.state.isClicked){
                $('#singleCountDownMsg').css('visibility', 'hidden')
            }else{
                $('#singleCountDownMsg').css('visibility', 'visible')
            }
           
        }else{
            $('#singleCountDownMsg').css('visibility', 'hidden')
        }
        
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
                    <div class = "ui center aligned container" id = "singleGameEnd">
                        <br></br>
                        <h1 className='ui blue header large'>Game Over. <br/>Your final score is {this.state.score} points</h1>
                        <br/>
                        <br/>
                        <CreateUser />

                        <Link to="/"><button className = "ui teal button">Go Back</button></Link>
                        <Link to='/'>   <button className = "ui violet button" onClick={this.logout}>Log Out</button> </Link> 
                    </div>
                )
            }
            if (endQuiz && this.state.score == 0){
                console.log('u sucks')
            }


        return (
            <Fragment>
                <div className = "ui vertical container singlePage">
                    <title>Question</title>
                    <div className="question">
                        <Link to='/'>  <Icon size='huge' name='arrow left' className='quit'/>  </Link>       
                        <Link to='/'>  <Icon size='huge' name='sign-out' className='home' onClick={this.logout}/>  </Link>  
                        <div className='ui basic inverted circular label large'>
                        <span className="clock">{time}</span>
                        </div>
                        <div className='ui horizontal huge inverted divider'>
                        <Music />
                        <span className="ui inverted huge header">Your Score is: </span> <span className="ui purple huge header">{score} </span></div>
                        <img src={leeke} className="leeke" alt="leeke" height="60" width='60'/>
                        <div id = "singleQuestionDiv" className = "ui container"> <h5 id = "singleQuestion">{questions}</h5></div>

                        <div id = "singleCountDownDiv">
                            <h1 id = "singleCountDownMsg"> You only have {time} second left! </h1>
                        </div>
                        <div id = "singleQuestionSpan" className = "ui container"> 
                            <span className = "ui large inverted header"> {`Questions ${currentQuestion + 1} out of ${this.state.random.length}`}</span>
                        </div>
                        {options.map(option => (
                            <p key={option.id} className= {`ui floating message options ${userAnswer === option ? "selected" : null}`} onClick ={() => this.checkAnswer(option)}>
                                {option}
                            </p>
                        ))}



                        <div className="button-container">
                            {currentQuestion < this.state.random.length - 1 && <button disabled={this.state.disabled} onClick={this.nextQuestionHandler} className='ui purple huge button'>Next</button>}
                            {currentQuestion === this.state.random.length - 1 && <button disabled={this.state.disabled} onClick={this.endHandler} className='ui purple huge button'>End</button>}
                        </div>
                    </div> 
                </div>
                
            </Fragment>
        );
    }
}
    

export default Single;