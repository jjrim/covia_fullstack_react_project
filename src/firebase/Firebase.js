  import firebase from "firebase";
  
  var firebaseConfig = {
    apiKey: "AIzaSyB0KQUuIHKY-SIKWR0Y2vMvkHg2NMJNyNQ",
    authDomain: "covia-f2018.firebaseapp.com",
    databaseURL: "https://covia-f2018.firebaseio.com",
    projectId: "covia-f2018",
    storageBucket: "covia-f2018.appspot.com",
    messagingSenderId: "323853360394",
    appId: "1:323853360394:web:f29faa62a94a7b729deef3",
    measurementId: "G-CV8H9PL5BZ"
  };

const fire = firebase.initialize(firebaseConfig)

export default fire;