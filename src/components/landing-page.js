import React from 'react';

import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import LoginForm from './login-form';

import './css/landingpage.css';

export function LandingPage(props) {
   
    // If we are logged in redirect straight to the user's dashboard
    if (props.loggedIn) {
        return <Redirect to="/dashboard" />;
    }

    return (
        <div className="container">
      
       
           {/* <div className="sliding-background"></div> */}
            <div className="home">
               
                <h5>Lapine is a fictional language created by author Richard Adams for his 1972 novel Watership Down, where it is spoken by rabbit characters. 
                    Now you can learn to speak to the bunnies too!
                </h5>
                <LoginForm />
                <Link to="/register">Register</Link>
            </div>
         
        </div>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);
