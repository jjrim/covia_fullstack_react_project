import React from 'react'
import { BrowserRouter as Router, Route, Link , Switch, withRouter} from 'react-router-dom';
import Main from './Main';
import Single from './Single';
import Two from './Two';
import Statistics from './Statistic';
import Question from './Question'

export default function Home() {
    return (    
        <div>
        <Router> 
            <Route path='/' component={Main} exact></Route>
            <Route path='/Single' component={Single} exact></Route>
            <Route path='/Two' component={Two} exact></Route>
            <Route path='/Statistics' component={Statistics} exact></Route>
            <Route path='/Question' component={Question} exact></Route>
        </Router>
            
        </div>
        
    )
}
