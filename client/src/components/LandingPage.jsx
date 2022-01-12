import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage(){
    return (
        <div>
            <h1>Welcome</h1>
            <Link to='/home'>
                <button className="btn">Enter the page</button>
            </Link>
        </div>
    );
};