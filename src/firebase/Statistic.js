import React, {Component} from 'react'
import {Bar, Line, Pie} from 'react-chartjs-2'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


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
render(){
    return(
        <div className="chart">
        <Pie
            data={this.state.chartData}
            options={{ 
                maintainAspectRatio: false 
            }}
            />
            <h3>your correct answer rate is 77%</h3>
        </div>
    )
}
}

export default Statistic;