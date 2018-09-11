import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import { fetchQuestions } from '../actions/questions';

export class Feedback extends React.Component {

    render() {
        // set feedback to nothing
        let feedback;

        // if answer is correct
        // if (correct) {
        //     feedback = <p>Your answer is correct!</p>;
        // }

        // if answer is incorrect
        // if (!correct) {
        //     feedback = <p>Your answer is incorrect. The correct answer was {this.props.currentQuestion.english}.</p>;
        // }

        return(
            <div>

            {/* {feedback} */}
            <p>Your answer is correct!</p>
            <p>Your answer is incorrect. The correct answer was {this.props.currentQuestion.english}.</p>
            
            <button onClick={() => this.props.dispatch(fetchQuestions())}>Next Question</button>

            </div>

        )
    }
}

const mapStateToProps = state => {
    const {currentUser} = state.auth;
    return {
        username: state.auth.currentUser.username,
        currentQuestion: state.questions.questions,
        prevQuestion: state.questions.prevQuestion,
        showFeedback: state.questions.showFeedback,
    };
};

export default requiresLogin()(connect(mapStateToProps)(Feedback));
