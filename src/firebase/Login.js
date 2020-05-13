import React , { Component } from "react";
import logo from './logo.png';
import fire from './fire.js';
import 'semantic-ui-react';
import { Link } from 'react-router-dom';
import MultiUserPlaying from './MultiPlayerLottie'
import Game from './EasterEgg'
import $ from 'jquery'



class Login extends Component {
    constructor(props)
    {
        super(props);
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.signup = this.signup.bind(this);
        this.state={
            email : "",
            password : ""
        }
    }
    login(e){
        e.preventDefault();
        fire.auth().signInWithEmailAndPassword(this.state.email,this.state.password).then((u)=>{
            console.log(u)
        }).catch((err)=>{
            alert("Username/Password do not match with record, please try again.");
        })
    }
    signup(e){
        e.preventDefault();
        fire.auth().createUserWithEmailAndPassword(this.state.email,this.state.password).then((u)=>{
            console.log(u)
        }).catch((err)=>{
            alert("The email address is already in use by another account. Please use another email address to sign up with.");
        })
    }
    handleChange(e){
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    

render()
{  
    const imageClick = () => {
        $('#eggDiv').css('display', 'block');
        $('#featureDiv').css('display', 'none');
      }

    return(
        <div>
            <body className="App-body">
            <div id = "upperDiv"> 
                <br />
                <br />
                <img src={logo} className="App-logo" alt="logo"/>
                <h2 class="ui inverted header" id = "loginAbt">ABOUT COVIA</h2>

                <p id ="explanation">Since COVID-19 is spread out as a pandemic disease,<br/> 
                “COVIA'' is here to give you an information what is COVID-19<br/>
                and how we can be safe from them.<br/>
                Test your knowledge about COVID-19 yourself or compete with your friends!<br/> 
                Welcome to COVIA world.</p>

            <Link to='/about'>   <button class="ui purple huge button">Learn More About Us </button>    </Link>
                <br/>

            </div>

            
            <div id = "loginDiv" class = "ui container"> 
                <h1 id="message" onClick={() => imageClick()}>COVIA WORLD</h1>
                <h3 id="signInMsg">Log-in to your account</h3>
                <form>
                
                    <div class="ui focus input"><input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="email"
                    onChange={this.handleChange}
                    value={this.state.email}
                    />
                    </div>
                    <br />

                    <div class="ui focus input"><input
                    name="password"
                    type= "password"
                    onChange={this.handleChange}
                    id="password"
                    placeholder="password"
                    value={this.state.password}
                    />
                    </div>
                    <br />
                    <br />
                    
                    <button class="ui ui purple basic button" onClick={this.login}> Login </button>
                    <button class="ui teal basic button" onClick={this.signup}>Register</button>
                


                </form>
            </div>

            <div class="ui container " id = "eggDiv"> 
                <Game />
            </div>

            <div id = "featureDiv" > 
            <MultiUserPlaying />
            <h1 id="sloGan0">Anyone</h1>
            <h1 id="sloGan1">Anytime</h1>
            <h1 id="message">Anyplace</h1>
            <h1 id="message">Any device</h1>
            </div>

            <div class="ui inverted vertical footer segment">
                <div class="ui container">
                    <div class="ui stackable inverted divided equal height stackable grid">
                        <div class="eight wide column">
                        <h4 class="ui inverted header">THE DEVELOPERS</h4>
                        <div class="ui inverted link list">
                            <a href="#" class="item">Cindy Lu</a>
                            <a href="#" class="item">Erica Jeong</a>
                            <a href="#" class="item">Jay Rim</a>
                            <a href="#" class="item">Luke Mei</a>
                        </div>
                        </div>
                        <div class="eight wide column">
                        <h4 class="ui inverted header">PRESENTED BY</h4>
                        <p> DTC_TEAM07_2020</p>
                        </div>
                    </div>

                </div>
            </div>
        </body>


    </div>
    )
}
}

export default Login;