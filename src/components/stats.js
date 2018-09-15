import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import { fetchAllQuestions } from '../actions/questions';
import StatsList from './statslist';
import './css/stats.css';

export class Stats extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchAllQuestions());
    
  }

  render() {
   

    //Currently calculators for the accuracy are done client size but it would make sense
    //to move most of these to the client side at an endpoint or a couple
    //TODO!

    let questions = this.props.questions.questions;
    console.log('username',this.props.username);
    // console.log(questions);
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
      
 
      successArray = successArray.sort((a,b) =>{ return a.percentCorrect > b.percentCorrect}) ;
   
      // console.log('successArray',successArray);
 
      
    }

   

   
    const mostObject = successArray[0];
    const leastObject = successArray[successArray.length-1];
    let mostWord=null;
    let leastWord=null;
    if(mostObject !== undefined){
    mostWord = successArray[successArray.length-1].lapineWord;
    // console.log('mostWord',mostWord);
    } else {
      mostWord = '____'
    }



    if(leastObject !== undefined){
      leastWord = successArray[0].lapineWord;
      // console.log('mostWord',leastWord);
      }

    let percent = Math.floor((totCorrect/totAttempts)*100)
    if (!percent){
      percent = 100;
    }
    return (
      <div className="stats statsCont">
        <div className="statsTitle">{this.props.username}'s Progress</div>
        <div className="statsDeets">
      
          <h1>{percent}% total accuracy</h1>

          <p>The word you know best: {mostWord} </p>      
          <p>The word you struggle with most :  { leastWord} </p>


          <hr></hr>
          <p>All Words</p>
          <StatsList wordList={successArray}/>
        </div>
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
