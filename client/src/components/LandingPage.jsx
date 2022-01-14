import React from "react";
import { Link } from "react-router-dom";
import styles from './LandingPage.module.css';

export default function LandingPage(){
    return (
        <div className={styles.landing}>
            <h2 className={styles.find}>Find your</h2>
            <h2 className={styles.fav}>Favourite</h2>
            <h1>Dog!</h1>
            <p>
                <span>On this site you can find a lot of beautiful dogs to admire, </span>
                <span>you can even create a new breed. What are you waiting for </span>
                <span>meeting your new best friend!</span>
            </p>
            <Link to='/home'>
                <button>Enter the page</button>
            </Link>
            <img src="https://www.dogboardingandtrainingmiami.com/wp-content/uploads/2014/04/Screen-Shot-2014-04-19-at-10.55.35-PM.png" alt="img perritos" />
        </div>
    );
};