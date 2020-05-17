import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link , Switch } from 'react-router-dom';
import Join from './Join'
import Two from './Two'
import Main from './Main';
import Single from './Single';
import Statistics from './Statistic';
import Question from './Question';

export default class Multi extends Component {
    render() {
        return (
            <div>
        <Router> 
            <Route path='/' component={Main} exact></Route>
            <Route path='/mul/Join' component={Join} exact></Route>
            <Route path='/mul/Two' component={Two} exact></Route>
            <Route path='/Single' component={Single} exact></Route>
            <Route path='/Statistics' component={Statistics} exact></Route>
            <Route path='/Question' component={Question} exact></Route>
        </Router>
            </div>
        )
    }
}
