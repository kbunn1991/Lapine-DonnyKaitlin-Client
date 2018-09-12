import React from 'react';
import {connect} from 'react-redux';
import {clearAuth} from '../actions/auth';
import {clearAuthToken} from '../local-storage';
import { Link } from 'react-router-dom'

export class HeaderBar extends React.Component {
    logOut() {
        this.props.dispatch(clearAuth());
        clearAuthToken();
    }

    render() {
        // Only render the log out button if we are logged in
        let logOutButton;
        if (this.props.loggedIn) {
            logOutButton = (
                <button onClick={() => this.logOut()}>Log out</button>
            );
        }
        // if the current page is STATS

        // <button onClick={e => {
        //     e.preventDefault();
        //     console.log('Back to App')
        //     }}>Back to App
        // </button>
                
        // else
        let stats = <Link to="/stats"><button onClick={e => {
            console.log('Stats clicked!')
            }}>My Stats
            </button></Link>
       
        return (
            <div className="header-bar">
                <Link to="/"><h1>Foo App</h1></Link>
                {logOutButton}
                {stats}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(HeaderBar);
