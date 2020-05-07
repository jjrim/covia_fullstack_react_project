import React from 'react'
import { Link } from 'react-router-dom';
import './AbtUs.css';
import cindy from './TeamAvatar/Cindy.jpeg';
import erica from './TeamAvatar/Erica.jpeg';
import jay from './TeamAvatar/Jay.jpeg';
import luke from './TeamAvatar/Luke.jpeg';
import { Image } from 'semantic-ui-react'
import Staying from './StayHome';
import DevelopingApp from './AppDev'


const AboutUs = () =>{
    return(
        <body className="App-body">
            <div id = "abtUpperDiv" class = "ui vertical center aligned segment">
                <h1 id = "abtH1">
                    Meet Covia</h1>
                <p id = "introPara">
                    We designed “COVIA'' as an online trivia competition game that is made to supply people with more information about COVID-19 while interacting with other people online during the COVID-19 crisis. 
                </p>
                <div class = "ui container">
                    <DevelopingApp />
                </div>
                
            </div>



            <div class = "ui center aligned container" id = "abtCenterDiv">
                <h2 id = "headerTransitionColor">Meet the Team!</h2>
                <div class = "ui two column grid">
                    <div class = "row">
                        <div class = "column">
                            <div class="ui items">
                                <div class="item">
                                    <div class="ui small circular image"><img src={cindy} alt = "CindyPicture"/></div>
                                    <div class="content">
                                    <div class="header">Cindy</div>
                                    <div class="meta">Term 1 CST Student</div>
                                    <div class="description">Description</div>
                                    <div class="extra">
                                        <a class="mailto" href="mailto:cindy.lu18@hotmail.com"><i class = "envelope outline large icon"> </i> </a>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class = "column">
                            <div class="ui items">
                                <div class="item">
                                    <div class="ui small circular image"><img src={erica} alt = "EricaPicture"/></div>
                                    <div class="content">
                                    <div class="header">Erica</div>
                                    <div class="meta">Term 2 CST Student</div>
                                    <div class="description">Description</div>
                                    <div class="extra">
                                        <a class="mailto" href="mailto:heejaerica@gmail.com"><i class = "envelope outline large icon"> </i> </a>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class = "row">
                    <div class = "column">
                            <div class="ui items">
                                <div class="item">
                                    <div class="ui small circular image"><img src={jay} alt = "JayPicture"/></div>
                                    <div class="content">
                                    <div class="header">Jay</div>
                                    <div class="meta">Term 2 CST Student</div>
                                    <div class="description">Description</div>
                                    <div class="extra">
                                        <a class="mailto" href="mailto:jjyyrim@gmail.com"><i class = "envelope outline large icon"> </i> </a>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class = "column">
                            <div class="ui items">
                                <div class="item">
                                    <div class="ui small circular image"><img src={luke} alt = "LukePicture"/></div>
                                    <div class="content">
                                    <div class="header">Luke</div>
                                    <div class="meta">Term 1 CST Student</div>
                                    <div class="description">Description</div>
                                    <div class="extra">
                                        <a class="mailto" href="mailto:skystar505836915@gmail.com"><i class = "envelope outline large icon"> </i> </a>
                                    </div>
                                    
                                    
                                    
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div id = "abtStoryDiv" class = "ui vertical center aligned segment">
                <Staying />
                <h1 id = "abtH1">
                    Our Story</h1>
                <p id = "abtP">
                    COVIA was developed by a group of CST students from BCIT. This application in 2020 was created
                    for our 2800 projects class final project.
                </p>
                <p id = "abtP"> 
                Long quarantine duration makes people have negative psychological issues due to lack of socializing, and some people do not even realize exactly what COVID-19 is or how it affects their body. 
                </p>

                <p id = "abtP">
                We want to design an application that is suitable for all ages and gender.<br/>
                We hope to see an 80-year-old grandma is able to play this game with her 8-year-old grandson. <br/>
                We want this application can be single-user and multi-user.<br/>
                We hope it can unite our loved ones by encouraging online socializing while raising awareness about Coronavirus.
                </p>

                <p id = "abtP">
                    And then, we have COVIA.
                </p>

                <br/>
                <Link to='/'>   <button class="ui basic inverted button huge">Back</button>    </Link>

            </div>


        </body>

    );
}
export default AboutUs; 