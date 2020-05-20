import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import io from 'socket.io-client';
import queryString from 'query-string';
import $ from 'jquery'
import "../Single.css";
import fire from "./fire";
import Main from './Main';
import { QuizData } from './Twoquizdata';
import { Icon } from 'semantic-ui-react'
import leeke from './leeke.png'

// sound effects
import ClickSound from './SoundClips/Button_Clicking.mp3'
import Bgm from './SoundClips/Bgm.mp3'
import Right from './SoundClips/right.mp3'
import Wrong from './SoundClips/wrong.wav'

const PORT = process.env.PORT || ":5000"
let socket = io(PORT)

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
export default class Two extends Component {
    clickAudio = new Audio(ClickSound);
    bgmAudio = new Audio(Bgm);
    right = new Audio(Right)
    Wrong = new Audio(Wrong)
    constructor(props){
        super(props);
        const { name, room } = queryString.parse(this.props.location.search)
        this.state = {
            username: name,
            room: room,
            friend: 'No One',
            friendScore: 0,
            status: 'disconnected',
            userAnswer: null,
            currentQuestion: 0,
            clickPlay:false,
            bgmPlay:false,
            bgmPause:true,
            options: [],
            endQuiz: false,
            score: 0,
            disabled: true,
            time: 15,
            random: fiveQuestions,
            isClicked: false,
            isNext: false,
            isStart: false,
            isSend: false,
            rightPlay: false,
            wrongPlay: false,
        }
        
    }

    clickPlay = () => {
        this.setState({ clickPlay: true})
        this.clickAudio.play();
        }

    bgmPlay = () => {
        this.setState({ bgmPlay: true, bgmPause: false })
        this.bgmAudio.play();
    }
    bgmPause = () => {
        this.setState({ bgmPlay: false, bgmPause: true })
            this.bgmAudio.pause();
    }

    rightPlay = () => {
        this.setState({ rightPlay: true })
        this.right.play()
    }

    wrongPlay = () => {
        this.setState({ wrongPlay: true })
        this.Wrong.play()
    }

    startGame(){
        let name = $('.name').val();
        // eslint-disable-next-line react/no-direct-mutation-state
        this.state.username = name
        this.setState({
            username: name,
        })
    }

    sendName(){
        const { username, room, status, isClicked, score, friend} = this.state
        socket.emit('sendMyName', { username, room })
    }

    initSocket(){
        const { username, room, status, isClicked, score, friend} = this.state
        
            socket.on('connection', () => {
                console.log('Data received')
            });
            socket.on('disconnect', () => {
                console.log('I am out!')
            });

            socket.emit('join', { username, room })

            socket.emit('sendUserName', { username, room })

            socket.on('addUser', ({ username, room }) => {
                if(this.state.username === username){
                    username = username + '_1'
                }
                this.setState({
                    friend: username
                })
                console.log(this.state.friend)
            })

            console.log('Me:', username, ' My Friend: ', friend)

            socket.on('receiveRoomOwnerName', ( friend, room )=> {
                if(friend === this.state.username){
                    friend = friend + '_1'
                }
                this.setState({
                    friend: friend
                })
            })
    }

    // Players in the samt time
    startAll(){
        let { isStart, username, room } = this.state
        if(this.state.friend !== 'No One'){
            socket.emit('startAll', { isStart, username, room })
            this.timer()
        }
    }

    readyStart(){
        let { isStart } = this.state
        socket.on("readyForStart", ( start ) => {
            console.log('Start the Game?', start)
            if(start){
                this.timer()
            }
        })
    }

    // Players in the same questions

    sendQuiz(){
        let { random, username, isSend, room } = this.state
        if(!isSend){
        socket.emit("sendQuiz", ( { random, username, room }))
        this.setState({
            isSend: true
        })
        }
    }

    receiveQuiz(){
        socket.on("receiveQuiz", ( random ) => {
            this.state.random = random
            this.state.isSend = true
            this.loadQuiz()
        })
    }

    // Send Score
    sendScore(){
        let { score, username, room } = this.state
        socket.emit("sendScore", ({ score, username, room }))
        
    }
    
    // Receive Score
    receiveScore(){
        socket.on("receiveScore", ( friendScore ) => {
            this.state.friendScore = friendScore
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
        this.initSocket()
        this.receiveScore()
        this.readyStart()
        this.receiveQuiz()
        this.loadQuiz()
    }
nextQuestionHandler = () => {
    const {userAnswer, answers, score} = this.state;
    this.setState({
        disabled: true,
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
        if(!this.state.endQuiz){
            this.rightPlay()
        }
        $('.selected').css("cssText", 'background: #77bfa3 !important');
        if(this.state.time >= 10){
            this.state.score = this.state.score + 200}
        else if(this.state.time <= 0){
            this.state.score = this.state.score
        }
        else{
            this.state.score = this.state.score + this.state.time * 20
        }
    }
    else{
        if(!this.state.endQuiz){
            this.wrongPlay()
        }
        $('.selected').css("cssText", 'background: #ef476f !important');
    }
    setTimeout(() => {
        $('.options').removeAttr("style");
    }, 1999);
    this.setState({
        time: 17,
    })
    this.sendScore()
}
}   
    

    
    componentDidUpdate(prevProps, prevState) {
        this.startAlert()
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
        this.clickPlay();
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
        const {userAnswer, answers, score, friendScore} = this.state;
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
            this.rightPlay()
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
            if(!this.state.endQuiz){
                this.wrongPlay()
            }
            $('.selected').css("cssText", 'background: #ef476f !important');
        }
        this.sendScore()

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
        this.bgmPause();
        fire.auth().signOut();
    };

    timer = () => {
        if(!this.state.isStart){
                this.setState({
                    isStart: true
                })

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
            
    }   else{
        console.log('Guess what, Game is already started, so this function would not be invoked again!')
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

    alertUserTime = () =>{
        if(this.state.time < 6 && this.state.time > 0){
            if (this.state.currentQuestion === 4 && this.state.isClicked){
                $('#singleCountDownMsg').css('visibility', 'hidden')
            }else{
                $('#singleCountDownMsg').css('visibility', 'visible')
            }
           
        }else{
            $('#singleCountDownMsg').css('visibility', 'hidden')
        }
        
    } 

    startAlert = () => {
        if(this.state.isStart){
            $("#startAlert").css('visibility', 'hidden')
        }
        else{
            $("#startAlert").css('visibility', 'visible')
        }
    }

    // Single Page Over

    render() {
            let {questions, options, currentQuestion, userAnswer, endQuiz, time, score, username, friend, friendScore} = this.state;
            if(friend === 'No One'){
                return(
                    <Fragment>
                    <div className = "ui vertical container singlePage">
                        <title>Question</title>
                        <div className="question">
                            <Link to='/'>  <Icon size='huge' name='arrow left' className='quit'  onClick={this.bgmPause} />  </Link>       
                            <Link to='/'>  <Icon size='huge' name='sign-out' className='home' onClick={this.logout && this.bgmPause}/>  </Link> 
                            <div className='ui basic inverted circular label large'>
                            <span className="clock">{time}</span>
                            </div>
                            <div id = "bgmDiv">
                                <button class="ui violet small button" onClick={this.bgmPlay}><i class = "play icon" ></i>Play Music</button>
                                <button class="ui teal small button" onClick={this.bgmPause}><i class = "pause icon" ></i>Pause Music</button> 
                            </div>
                            <div className='ui horizontal huge inverted divider'><span className="ui inverted huge header">{username}: </span> <span className="ui purple huge header">{score} </span></div>
                            <div className='ui horizontal huge inverted divider'><span className="ui inverted huge header">{friend}: </span> <span className="ui purple huge header">{friendScore} </span></div>
                            <img src={leeke} className="leeke" alt="leeke" height="60" width='60'/>
                            <h1 className="ui large inverted header red ">Waiting for other player to join...</h1>
                            <h1 className="ui large inverted header red ">To Start The Game, Click Any Options When Someone Joins In</h1>
                            
                            
                        </div> 
                    </div>
                    
                </Fragment>


                )
            }
            // Win
            if(endQuiz) {
                if(score >= friendScore){
                return (
                    <div class = "ui center aligned container" id = "singleGameEnd">
                        <br></br>
                        <h1 className='ui blue header large'>Game Over. <br/>Your final score is {this.state.score} points</h1>
                        <h1 className='ui blue header large'>{friend}'s score is {this.state.friendScore} points</h1>
                        <br/>
                        <h1 className='ui blue header large'>YOU WIN</h1>
                        <Link to="/"><button className = "ui inverted blue button" onClick={this.bgmPause}>Go Back</button></Link>
                        <Link to='/'>   <button className = "ui inverted violet button" onClick={this.logout}>Log Out</button> </Link> 
                    </div>
                )
            }
            else{
                return (
                    <div class = "ui center aligned container" id = "singleGameEnd">
                        <br></br>
                        <h1 className='ui blue header large'>Game Over. <br/>Your final score is {this.state.score} points</h1>
                        <h1 className='ui blue header large'>{friend}'s score is {this.state.friendScore} points</h1>
                        <br/>
                        <h1 className='ui blue header large'>YOU LOSE</h1>
                        <Link to="/"><button className = "ui inverted blue button" onClick={this.bgmPause}>Go Back</button></Link>
                        <Link to='/'>   <button className = "ui inverted violet button" onClick={this.logout}>Log Out</button> </Link> 
                    </div>
                )
            }
        }
        return (
            <Fragment>
                <div className = "ui vertical container singlePage">
                    <title>Question</title>
                    <div className="question">
                        <Link to='/'>  <Icon size='huge' name='arrow left' className='quit'  onClick={this.bgmPause} />  </Link>       
                        <Link to='/'>  <Icon size='huge' name='sign-out' className='home' onClick={this.logout && this.bgmPause}/>  </Link> 
                        <div className='ui basic inverted circular label large'>
                        <span className="clock">{time}</span>
                        </div>
                        <div id = "bgmDiv">
                            <button class="ui violet small button" onClick={this.bgmPlay}><i class = "play icon" ></i>Play Music</button>
                            <button class="ui teal small button" onClick={this.bgmPause}><i class = "pause icon" ></i>Pause Music</button> 
                        </div>
                        <div className='ui horizontal huge inverted divider'><span className="ui inverted huge header">{username}: </span> <span className="ui purple huge header">{score} </span></div>
                        <div className='ui horizontal huge inverted divider'><span className="ui inverted huge header">{friend}: </span> <span className="ui purple huge header">{friendScore} </span></div>
                        <img src={leeke} className="leeke" alt="leeke" height="60" width='60'/>
                        <div id = "singleQuestionDiv" className = "ui container"> <h5 id = "singleQuestion">{questions}</h5></div>
                        <div>
                            <h1 className="ui large inverted header red " id="startAlert">Press Any Buttons To Start The Game</h1>
                        </div>
                        <div id = "singleCountDownDiv">
                            <h1 id = "singleCountDownMsg"> You only have {time} second left! </h1>
                        </div>

                        <div id = "singleQuestionSpan" className = "ui container"> 
                            <span className = "ui inverted header"> {`Questions ${currentQuestion + 1} out of ${this.state.random.length}`}</span>
                        </div>
                        {options.map(option => (
                            <p key={option.id} className= {`ui floating message options ${userAnswer === option ? "selected" : null}`} onClick ={() => {this.checkAnswer(option); this.sendName(); this.startAll(); this.sendQuiz()}}>
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