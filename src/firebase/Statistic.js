import React, {Component} from 'react'
import {Bar, Line, Pie} from 'react-chartjs-2'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Leaderboard from '../components/user-list.component';


class Statistic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData:{
                labels: ['Correct Answers', 'Wrong Answers'],
    
            datasets:[
                {
                    label:'rate',
                    data:[
                        617594,
                        181045,
                    ],
                    backgroundColor:[
                        'red', 'blue'
    
                    ]
                }
            ]
        }
    }
}
render () {
    return (

    <div >

        <Leaderboard />

    </div>
    )
}
}

export default Statistic;