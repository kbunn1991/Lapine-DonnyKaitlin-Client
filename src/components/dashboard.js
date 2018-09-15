import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import {fetchQuestion, makeGuess, fetchAttempts,fetchImage, fetchCorrectCount} from '../actions/questions';
import GuessForm from './guess-form';
import Feedback from './feedback';
import './css/app.css';
import './css/dashboard.css';

export class Dashboard extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchAttempts());
        this.props.dispatch(fetchCorrectCount());
        this.props.dispatch(fetchImage());
        this.props.dispatch(fetchQuestion());
    
    }

    onSubmit(values) {
       
        console.log('values',values)
        this.props.dispatch(makeGuess(values.guess))
      
       
    }
    
    
    render() {
        let lapineWord;
        if (this.props.currentQuestion) {
            // console.log('The question is', this.props.currentQuestion.lapine);
            // console.log('showFeedback value',this.props.showFeedback);
            // console.log('show guess box value', this.props.showGuessBox);
            // console.log('Prev Word',this.props.prevQuestion.lapine );
            lapineWord = this.props.currentQuestion;
            console.log(lapineWord);
        }
        let feedback;
        if (this.props.showFeedback) {
            feedback = <div><Feedback/></div>;
        }
        if (!this.props.showFeedback) {
            feedback = null;
        }

        let guessBox;
        if (this.props.showGuessBox) {
            guessBox = <div><GuessForm/></div>;
        }
        if (!this.props.showGuessBox) {
            guessBox = null;
        }

        let img = <img src={this.props.imageURL} alt="A hint of bunneh"></img>

        return (
            <div className="dashCont">
            <div className="dashboard-username">
                Hello, {this.props.username} !
            </div>
            <div className="dashboard fade-in">
            <div className="pxImage object">{img}</div>
                <div className="dashboard-questions">
                    <div className="questions">
                        {/* only pass the lapine word through redux, not the object, pull from array instead of LL */}
                        {/* <div className="testQuestion2 object">
                            Attempts for this word: {this.props.attempts}
                            Number of times you were correct: {this.props.correctCount}
                        </div> */}
                        <div className="testQuestion2">
                        {/* <div className="object">
                            Attempts: {this.props.attempts}<br />
                            Correct: {this.props.correctCount}
                        </div> */}
                        </div>
                    </div>
                  
                    <div className="word_container"><h3>{lapineWord}</h3>

                       
                    </div>
                
                  {guessBox}
                  {feedback}

                </div>

                 
            </div>

            <div className="testQuestion">You've attempted this word: <b>{this.props.attempts} times</b> 
                        <br />& Correctly answered: <b>{this.props.correctCount} times</b></div>

{/* <div class="object">
  hello world!
</div> */}

            </div>
        );
    }
}

const mapStateToProps = state => {
    const {currentUser} = state.auth;
    return {
        username: state.auth.currentUser.username,
        attempts: state.questions.attempts,
        imageURL:state.questions.imageURL,
        correctCount: state.questions.correctCount,
        currentQuestion: state.questions.question,
        prevQuestion: state.questions.prevQuestion,
        showFeedback:state.questions.showFeedback,
        showGuessBox: state.questions.showGuessBox
    };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
