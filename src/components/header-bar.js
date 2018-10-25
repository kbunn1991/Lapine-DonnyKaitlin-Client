import React from 'react';
import {connect} from 'react-redux';
import {clearAuth} from '../actions/auth';
import {clearAuthToken} from '../local-storage';
import { Link } from 'react-router-dom';
import './css/header-bar.css';


export class HeaderBar extends React.Component {
    
    constructor(props) {
        super(props);
        this.state ={
          stats : true
        }
      }

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

        // if (this.props.location.pathname = '/stats'
        let stats;
    
        if (window.location.pathname === '/stats') {
            stats = <Link to="/dashboard"><button onClick={e => {
                // console.log('Stats clicked!');
                this.setState({
                    stats : true
                  });
                }}>Dashboard
            </button></Link>
        } else {
            stats = <Link to="/stats"><button onClick={e => {
                // console.log('Stats clicked!');
                this.setState({
                    stats : false
                  });
                }}>My Stats
            </button></Link>
        }

        // console.log(this.props);
        return (
            <nav className="header-bar">
            <div className="buttons">
                    <div className="button">{logOutButton}</div>
                    <div className="button">{stats}</div>
            </div>
            </nav>
        );
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(HeaderBar);
