import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import {fetchQuestions, makeGuess} from '../actions/questions';

export class Dashboard extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchQuestions());
    }
    

    render() {
        let lapineWord;
        if (this.props.questions) {
            console.log('The question is', this.props.questions.lapine);
            lapineWord = this.props.questions.lapine;
        }
        return (
            <div className="dashboard">
                <div className="dashboard-username">
                     Hello {this.props.username} !
                </div>
               
                <div className="dashboard-questions">
                    <h3>{lapineWord}</h3>

                    <form onSubmit={(e) => {
                        e.preventDefault();
                        this.props.dispatch(makeGuess())
                    }}>
                        <input type="text"></input>
                        <button type="submit">Submit</button>
                    </form>

                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {currentUser} = state.auth;
    return {
        username: state.auth.currentUser.username,
        questions: state.questions.questions
    };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
