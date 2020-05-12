import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import io from 'socket.io-client';
import $ from 'jquery'
import "../Single.css";
import fire from "./fire";
import Main from './Main';
import { QuizData } from './QuizData';
import { Icon } from 'semantic-ui-react'
import leeke from './leeke.png'
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

const PORT = 'localhost:5000/'

export default class Two extends Component {
    constructor(props){
        super(props);

        this.state = {
            username: null,
            status: 'disconnected',
            userAnswer: null,
            currentQuestion: 0,
            options: [],
            endQuiz: false,
            score: 0,
            disabled: true,
            time: 15,
            random: fiveQuestions,
            isClicked: false,
            isStart: false
        }

    }

    startGame(){
        let name = $('.name').val();
        // eslint-disable-next-line react/no-direct-mutation-state
        this.state.username = name
        this.setState({
            username: name,
        })
    }

    initSocket(){
        const { username, status, isClicked} = this.state
        
            let socket = io(PORT)
            socket.on('connect', () => {
                console.log('Data received')
            });
            socket.on('disconnect', () => {
                console.log('I am out!')
            });

            socket.on('addUser', (data) =>{
                console.log(this.state.username)
            })

            socket.on('start', ( {start} ) => {
                this.setState({
                    isStart: start
                })
                this.timer()
            })

            socket.emit('addUser', { username }, ( quizdata ) => {
                // this.timer()
                console.log(quizdata)
                console.log(socket)
            })
            
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
       
    }
nextQuestionHandler = () => {
    const {userAnswer, answers, score} = this.state;
    this.setState({
        disabled: true
    })
    if (this.state.currentQuestion === this.state.random.length - 1) {
        this.endHandler();
    } 
    else {
    setTimeout(() => {
        this.setState({
            currentQuestion: this.state.currentQuestion + 1,
            isClicked: false
        });
        console.log(this.state.currentQuestion);
    }, 2000);
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
    else{
        $('.selected').css("cssText", 'background: #ef476f !important');
    }
    setTimeout(() => {
        $('.options').removeAttr("style");
    }, 1999);
    this.setState({
        time: 17
    })
}
}
    componentDidUpdate(prevProps, prevState) {
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

    timer = () => {
        if(this.state.isStart){
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
    // Single Page Over

    render() {
        let { username } = this.state
        if( username === null ){
            return (
                <div>
                    <br></br>
                 Name:   <input className="name ui input instagram"></input>
                    <br></br><br></br>
                <button className="ui button instagram" onClick={() =>{ this.startGame(); this.initSocket()}}>Join</button>
                </div>
            )
        }
        else{
            const {questions, options, currentQuestion, userAnswer, endQuiz, time, score} = this.state;

            if(endQuiz) {
                return (
                    <div class = "ui center aligned container" id = "singleGameEnd">
                        <br></br>
                        <h1 className='ui blue header large'>Game Over. <br/>Your final score is {this.state.score} points</h1>
                        <br/>
                        <br/>
                        <Link to="/"><button className = "ui teal button">Go Back</button></Link>
                        <Link to='/'>   <button className = "ui violet button" onClick={this.logout}>Log Out</button> </Link> 
                    </div>
                )
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
                        <div className='ui horizontal huge inverted divider'><span className="ui inverted huge header">Your Score is: </span> <span className="ui purple huge header">{score} </span></div>
                        <img src={leeke} className="leeke" alt="leeke" height="60" width='60'/>
                        <div id = "singleQuestionDiv" className = "ui container"> <h5 id = "singleQuestion">{questions}</h5></div>
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

}