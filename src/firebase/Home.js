import React from 'react'
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Main from './Main';
import Single from './Single';
import Statistics from './Statistic';
import Question from './Question';
import Two from './Two'
import Multi from './Multi'

export default function Home() {
    return (    
        <div>
        <Router> 
            <Route path='/' component={Main} exact></Route>
            <Route path='/Single' component={Single} exact></Route>
            <Route path='/mul/Join' component={Multi} exact></Route>
            <Route path='/Statistics' component={Statistics} exact></Route>
            <Route path='/Question' component={Question} exact></Route>
        </Router>
            
        </div>
        
    )
}
