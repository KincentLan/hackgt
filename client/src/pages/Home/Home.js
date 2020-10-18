import React, {useEffect, useState} from "react";
import app from "../../base";
import firebase from 'firebase/app';
import {useAuthState} from 'react-firebase-hooks/auth';
import 'firebase/auth';
import '../../css/home.css';
import '../../css/navbar-general.css'
import {Link} from "react-router-dom"

const Home = () => {
        return (<> <button id="homeButton" onClick={() => app.auth().signOut()}>Sign out</button> </>);
}

export default Home;
