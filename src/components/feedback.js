import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import { fetchQuestion, fetchAttempts, fetchCorrectCount } from '../actions/questions';

export class Feedback extends React.Component {

     refreshInfo = () =>{
        this.props.dispatch(fetchQuestion());
        this.props.dispatch(fetchAttempts());
        this.props.dispatch(fetchCorrectCount());


    }

    render() {
        // set feedback to nothing
        let feedback;

        // if answer is correct
        if (this.props.correctAnswer === '') {
            feedback = <p>Your answer is correct!</p>;
        }

        // if answer is incorrect
        if (this.props.correctAnswer) {
            feedback = <p>Your answer is incorrect. The correct answer was {this.props.correctAnswer}.</p>;
        }

        return(
            <div>

            {feedback}
            {/* <p>Your answer is correct!</p>
            <p>Your answer is incorrect. The correct answer was {this.props.correctAnswer}.</p>
             */}
            <button onClick={() => this.refreshInfo()}>Next Question</button>

            </div>

        )
    }
}

const mapStateToProps = state => {
    const {currentUser} = state.auth;
    return {
        username: state.auth.currentUser.username,
        correctAnswer: state.questions.correctAnswer,
        prevQuestion: state.questions.prevQuestion,
        showFeedback: state.questions.showFeedback,
    };
};

export default requiresLogin()(connect(mapStateToProps)(Feedback));
