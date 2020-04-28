import React , { Component } from "react";
import logo from './logo.png';


class Login extends Component {
constructor(props)
{
    super(props)
    this.state={
        email: "",
        password : ""
    }
}
render()
{
    return(


    <div>
                <img src={logo} className="App-logo" alt="logo" />

        <form>
            <input
            type="email"
            id="email"
            Placeholder="enter email address"
            onChange={this.HandleChange}
            value={this.state.email}
            />
<br />
<br />            <input
            type="password"
            id="password"
            Placeholder="enter password address"
            value={this.state.password}
            />
        </form>
    </div>
    )
}
}

export default Login;