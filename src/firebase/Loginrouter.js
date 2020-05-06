import React from 'react'
import { BrowserRouter as Router, Route} from 'react-router-dom';
import AboutUs from './AboutUs';
import Login from './Login';


export default function Loginrouter() {
    return (
        <div>
            <Router>
                <Route path='/' component={Login} exact></Route>
                <Route path='/about' component={AboutUs} exact></Route>
            </Router>
        </div>
    )
}
