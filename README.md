# Covia App Documentation
DTC07's project for COMP 2800.

## Overview

### Folder Organization
The "backend" folder contains everything that is used to connect to the database. The "server" folder contains the socket server of the multiplayer game. The "public" folder contains our logo and index page when we host the project on Heroku, Heroku would serve the files in public as static. The "src" folder contains all the react.js components.


### Team Members

|Name|Github ID|Email|
|---|---|---|
|Cindy Lu|dafu2020|cindylu26810@gmail.com|
|Erica Jeong|ericaheeja|heejaerica@gmail.com|
|Jay Rim|jjrim|jjyyrim@gmail.com|
|Luke Mei|Bmeimei|skystar505836915@gmail.com|


## Setting up a Development Environment

### Run this app Easily
- To run it easily, go to `Master branch`
- clone this repository to local (download the zip/ clone to github desktop)
- Open the project with VsCode (Visual Studio Code)
- In the terminal, please type:  
  1) `npm install`    
  2) `npm start`   
- If not automatically open, in your browser, navigate to http://localhost:3000/ (port is 3000 if you copied the config)
- Multi-player server url: https://covia-server.herokuapp.com/
- Database server url: https://covia-backend.herokuapp.com/


### Run this app locally
- To run it locally, go to `Local branch`
- clone this repository to local (download the zip/ clone to github desktop)
- Open the project with VsCode (Visual Studio Code)
- Open a terminal in VsCode, split it into three
- Run database - In the first terminal     
  1) `cd backend`  
  2) `npm install`  
  3) `node server.js`   
- Run multi-player server - In the second terminal   
  1) `cd server`   
  2) `npm install`     
  3) `npm start`   
- Run overall app -  In the last terminal   
  1) `npm install`    
  2) `npm start`   
- If not automatically open, in your browser, navigate to http://localhost:3000/ (port is 3000 if you copied the config)

#### 3rd Party APIs
- Coronavirus Data API
   1) Homepage: https://documenter.getpostman.com/view/8854915/SzS7R74n?version=latest
   2) Global Statistics API (NO KEY): https://api.thevirustracker.com/free-api?global=stats
- Twitter API - used for tweet a custom post from our app to twitter(no key)
  1)https://developer.twitter.com/en/docs/twitter-for-websites/tweet-button/overview
- Weibo API - used for post a custom post from our app to weibo(no key)
  2)https://open.weibo.com/wiki/API%E6%96%87%E6%A1%A3/en

#### Configurations
- server:
  - Multi-player server url: https://covia-server.herokuapp.com/
  - Database server url: https://covia-backend.herokuapp.com/
- database: 
  - MongoDB
    - id:root; password:root
  
  

#### To participate as a developer, please read [Contributing Guidelines](https://github.com/jjrim/COMP-2800-Team-DTC-07-Covia/blob/master/contributing.md).

> Please make sure to submit a Pull Request to the *dev* branch.

#### Test plan: https://docs.google.com/spreadsheets/d/1lEzNY608hqBYMJP-z6VGBPWVmc0KbzmYbEAqUhN5Vis/edit?usp=sharing

#### Live on: https://covia.herokuapp.com/

#### Citation
- For the Multi-Player, the tutorial is from https://www.youtube.com/watch?v=ZwFA3YMfkoc&t=6015s -- Build and Deploy a Realtime Chat Application - Socket.io, Node.js, and React.js
- For the Single-Player, the tutorial is from https://youtu.be/2i2-LTJ5nF4 -- which states are needed and how to load quiz - React.js, Semantic UI
- For EasterEgg, the tutorial is from https://www.youtube.com/watch?v=it54tShOsuI&t=829s -- which shows me the step and logic to build a mini tic tac toe game with react.js
- For the use of lottieFiles, the tutorial is from https://www.youtube.com/watch?v=LIoRZZ_va_o -- this tutorial shows me how to implement a lottie animation in a react.js system

For connecting frontend to backend(MERN stack) tutorial is from: https://www.youtube.com/watch?v=PZquB8XdU9k 
For firebase authentication tutorial is from: https://www.youtube.com/watch?v=PZquB8XdU9k
