import React , { Component } from "react";

class Home extends Component {
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
    <div>
        <form>
            <input
            type="email"
            id="email"
            Placeholder="enter email address"
            onChange={this.HandleChange}
            value={this.state.email}
            />

            <input
            type="password"
            id="password"
            Placeholder="enter password address"
            value={this.state.password}
            />
        </form>
    </div>
}