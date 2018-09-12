// error validation

import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import Input from './input';
import {fetchAttempts,fetchCorrectCount, makeGuess} from '../actions/questions';
import {required, nonEmpty, matches, length, isTrimmed} from '../validators';


export class GuessForm extends React.Component {
    onSubmit(values) {
        console.log('values',values)
       return this.props.dispatch(makeGuess(values.guess))
             
    }
    
    render() {
        return (
                <div>
                <form onSubmit={this.props.handleSubmit(values => 
                this.onSubmit(values)
                )}>
                 <label htmlFor="guess"></label>
                    <Field
                    component={Input}
                    type="text"
                    name="guess"
                    id="guess" 
                    validate={[required, nonEmpty, isTrimmed]}
                />
                <button type="submit">Submit</button>
                </form>
          </div>         
        );
    }
}

export default reduxForm({
    form: 'guess'
})(GuessForm);
