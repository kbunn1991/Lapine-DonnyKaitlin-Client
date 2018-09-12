import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import { fetchAllQuestions } from '../actions/questions';


const sortByKey = (array, key) => {
  return array.sort(function(a, b) {
      var x = a[key]; var y = b[key];
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  });
}

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

      let tempObject= {

        percentCorrect:percentCorrect,
        lapineWord:lapineWord
      }
      successArray.push(tempObject);
      successArray = sortByKey(successArray,percentCorrect);
      console.log('successArray',successArray);
    }

   

    // loop through successArray to find the least successful 
    // let leastSuccessful;
    // for (let i = 0; i < successArray.length; i++) {
    //   // loop through each item in the array
    // }

    // loop through successArray to find the most successful 
    // let mostSuccessful = 0; 
    // for (let i = 0; i < successArray.length; i++) {
    //   // loop through each item in the array
    //   if (successArray[i] > mostSuccessful) {
    //     mostSuccessful = i;
    //   }
    // }
    // // console.log(mostSuccessful);
    
    // let mostSuccessfulAnswer = questions[mostSuccessful];
    // if(mostSuccessfulAnswer !== undefined){
    // console.log('MOST SUCCESS',mostSuccessfulAnswer)
    // };

   
    const mostObject = successArray[0];
    const leastObject = successArray[successArray.length-1];
    let mostWord=null;
    let leastWord=null;
    if(mostObject !== undefined){
    mostWord = successArray[0].lapineWord;
    console.log('mostWord',mostWord);
    }

    if(leastObject !== undefined){
      leastWord = successArray[successArray.length-1].lapineWord;
      console.log('mostWord',leastWord);
      }
    return (
      <div>
        <h2>{this.props.username}'s Progress</h2>
        <div>{totCorrect}/{totAttempts} questions correctly answered.</div>

        <div>The word you know best: {mostWord} </div>
        <div>The word you struggle with most is : {leastWord} </div>
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
