import React , { Component } from "react";
import logo from './logo.png';
import fire from './fire.js';
import { Button, Form, Grid, Header, Image, Message, Segment, Input } from 'semantic-ui-react';



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
            console.log(err);
        })
    }
    signup(e){
        e.preventDefault();
        fire.auth().createUserWithEmailAndPassword(this.state.email,this.state.password).then((u)=>{
            console.log(u)
        }).catch((err)=>{
            console.log(err);
        })
    }
    handleChange(e){
        this.setState({
            [e.target.name] : e.target.value
        })
    }

render()
{  

    return(
        <div>
            <body className="App-body">

            <br />
            <br />
            <img src={logo} className="App-logo" alt="logo" />

            <p id ="explanation">Since COVID-19 is spread out as a pandemic disease,<br/> 
            “COVIA'' is here to give you an information what is COVID-19<br/>
            and how we can be safe from them.<br/>
            Test your knowledge about COVID-19 yourself or compete with your friends!<br/> 
            Welcome to COVIA world.</p><br/>

            <h1 id="message">COVIA WORLD</h1>
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
            
            <button class="ui primary button" onClick={this.login}>Login</button>
            <button class="ui secondary button" onClick={this.signup}>Signup</button>

            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />

            <p id="team">TEAM7<br/>
            Cindy L<br/>
            Erica Jeong<br/>
            Jay Rim<br/>
            Luke Mei</p><br/>

        </form>
        </body>


    </div>
    )
}
}

export default Login;