import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import { fetchAllQuestions } from '../actions/questions';

export class Stats extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchAllQuestions());
  }

  render() {
    // percentage of total amount of correct answers over total number of attempts - percentage
    // most accurate word
    let questions = this.props.questions.questions;
    console.log(questions);
    let totAttempts = 0;
    let totCorrect = 0;

    for (let i = 0; i < questions.length; i++) {
      let currQuestion = questions[i];
      let attempts = currQuestion.attempts;
      totAttempts += attempts;

      let correct = currQuestion.correctAnswers;
      totCorrect += correct;
    }

    // least accurate word -- put up top -- lowest percentage of correct tries -- correct/attempts? x100
    // let leastSuccess = questions[0];
    let successArray = [];
    let percentCorrect;
    for (let i = 0; i < questions.length; i++) {
      let currQuestion = questions[i];
      let lapineWord = questions[i].question.lapineWord;
      let attempts = currQuestion.attempts;
      let correct = currQuestion.correctAnswers;
      // getting percentage of this question
      if(attempts === 0 && correct === 0) {
        percentCorrect = 0;
      } else {
        percentCorrect = (correct/attempts)*100;
      }
      successArray.push(percentCorrect);
    }

    console.log(successArray);

    // loop through successArray to find the least successful 
    // let leastSuccessful;
    // for (let i = 0; i < successArray.length; i++) {
    //   // loop through each item in the array
    // }

    // loop through successArray to find the most successful 
    let mostSuccessful = 0; 
    for (let i = 0; i < successArray.length; i++) {
      // loop through each item in the array
      if (successArray[i] > mostSuccessful) {
        mostSuccessful = i;
      }
    }
    // console.log(mostSuccessful);
    
    let mostSuccessfulAnswer = questions[mostSuccessful];
    console.log(mostSuccessfulAnswer);

    // console.log(JSON.stringify(this.props.questions))
    return (
      <div>
        <h2>{this.props.username}'s Progress</h2>
        <div>{totCorrect}/{totAttempts} questions correctly answered.</div>

        <div>Your most successful answer is: </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const {currentUser} = state.auth;
  return {
      username: state.auth.currentUser.username,
      attempts: state.questions.attempts,
      correctCount: state.questions.correctCount,
      questions: state.questions
  };
};

export default requiresLogin()(connect(mapStateToProps)(Stats));
