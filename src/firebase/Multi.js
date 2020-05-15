import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link , Switch } from 'react-router-dom';
import Join from './Join'
import Two from './Two'


export default class Multi extends Component {
    render() {
        return (
            <div>
        <Router> 
            <Route path='/mul/Join' component={Join} exact></Route>
            <Route path='/mul/Two' component={Two} exact></Route>
        </Router>
            </div>
        )
    }
}
