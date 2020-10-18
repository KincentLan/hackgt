import React, {useEffect, useState} from "react";
import app from "../../base";
import firebase from 'firebase/app';
import {useAuthState} from 'react-firebase-hooks/auth';
import 'firebase/auth';
import '../../css/home.css';
import '../../css/navbar.css'
import {Link} from "react-router-dom"

const Home = () => {
    return (<>
        <div className="navbar">
            <div className="left-title">Dashboard</div>
            <div className="dropdown">
                <button className="dropbtn"> OnlyFans </button>
                <div className="dropdown-content">
                    <a href="#">
                        <button id="homeButton" onClick={() => app.auth().signOut()}>Sign out</button>
                    </a>
                </div>
            </div>
        </div>
    </>);
}

export default Home;
