import React from 'react'
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Two from './Two';
import Join from './Join'

export default function Multiplayer() {
    return (
        <div>
            <Router>
            <Route path="/Join" component={Join} exact></Route>
            <Route path="/Two" component={Two} exact></Route>
            </Router>
        </div>
    )
}
