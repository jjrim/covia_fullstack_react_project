import React from 'react'
import {BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "../components/navbar.component"
import ExercisesList from "../components/exercises-list.component";
import EditExercise from "../components/edit-exercise.component";
import CreateExercise from "../components/create-exercise.component";
import CreateUser from "../components/create-user.component";
import Home from './Home'
import Main from './Main';
import Single from './Single';
import Statistics from './Statistic';
import Two from './Two'
import Multi from './Multi'


export default function Question() {
    return (
      <div>
        <Router>
      <Route path="/Question" component={Navbar} />
      <Route path="/exerciseslist" exact component={ExercisesList} />
      <Route path="/edit/:id" component={EditExercise} />
      <Route path="/create" component={CreateExercise} />
      <Route path="/user" component={CreateUser} />
      <Route path="/" component={Home} exact/>
        </Router>
        </div>
    )
}
