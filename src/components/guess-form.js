// error validation


import React from 'react';
import {Field, reduxForm} from 'redux-form';
import Input from './input';
import {makeGuess, fetchHint} from '../actions/questions';
import {required, nonEmpty,isTrimmed} from '../validators';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import './css/guessForm.css';


export class GuessForm extends React.Component {

    onSubmit(values) {
    //    console.log('values',values)
       return this.props.dispatch(makeGuess(values.guess))
             
    }
    
    render() {

        // let hintBoolean = false;
        let hint = "Guess";
       
        if(this.props.hint) {
            hint = this.props.hint
        }

        return (
            <div className="guessForm">
                <form autoComplete="off" onSubmit={this.props.handleSubmit(values => 
                this.onSubmit(values)
                )}>
                 <label htmlFor="guess"></label>
                    <Field
                    component={Input}
                    type="text"
                    name="guess"
                    id="guess" 
                    placeholder={hint}
                    validate={[required, nonEmpty, isTrimmed]}
                />
                <button className="guessButton" type="submit">Submit</button>
                <button className="guessButton" type="button" onClick={() => {
                    console.log('Hint button works');
                    this.props.dispatch(fetchHint())
                }}>Get a Hint</button>
                </form>
          </div>         
        );
    }
}

const mapStateToProps = state => {
    // const {currentUser} = state.auth;
    return {
        username: state.auth.currentUser.username,
        hint: state.questions.hint
    };
};
  

GuessForm = reduxForm({
    form: 'guess'
})(GuessForm);

// Then connect the whole with the redux store
export default requiresLogin()(connect(mapStateToProps)(GuessForm));