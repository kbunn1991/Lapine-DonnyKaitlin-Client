import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import {fetchQuestions, makeGuess} from '../actions/questions';
import GuessForm from './guess-form';

export class Dashboard extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchQuestions());
    }

    onSubmit(values) {
        console.log('values',values)
        return  this.props.dispatch(makeGuess(values.guess));
    }
    

    render() {
        let lapineWord;
        if (this.props.currentQuestion && this.props.prevQuestion) {
            console.log('The question is', this.props.currentQuestion.lapine);
            console.log('Prev Word',this.props.prevQuestion.lapine );
            lapineWord = this.props.currentQuestion.lapine;
        }
        return (
            <div className="dashboard">
                <div className="dashboard-username">
                     Hello {this.props.username} !
                </div>
               
                <div className="dashboard-questions">
                    <h3>{lapineWord}</h3>

                  <GuessForm/>

                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {currentUser} = state.auth;
    return {
        username: state.auth.currentUser.username,
        currentQuestion: state.questions.questions,
        prevQuestion: state.questions.prevQuestion
    };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
