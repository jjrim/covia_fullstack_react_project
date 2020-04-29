import React , { Component } from "react";
import fire from "./fire";


class Main extends Component {
constructor(props)
{
    super(props)
    this.state={

    }
}
logout(){
    fire.auth().signOut();
}

render()
{
    return(


    <div>
        <h1>Welcome to Covia</h1>
        <h1>You are logged in</h1>
        <button onClick={this.logout}>Logout</button>
        <button>Single Player</button>
        <button>Multi Player</button>
        <button>Create your Custom Question</button>
        <button>Statistics</button>


    </div>
    )
}
}

export default Main;