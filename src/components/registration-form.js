import React from 'react';
import {Field, reduxForm, focus,reset} from 'redux-form';
import {registerUser} from '../actions/users';
import {login} from '../actions/auth';
import Input from './input';
import {required, nonEmpty, matches, length, isTrimmed} from '../validators';
const passwordLength = length({min: 10, max: 72});
const matchesPassword = matches('password');

export class RegistrationForm extends React.Component {
    onSubmit(values) {
        const {username, password, firstName, lastName} = values;
        const user = {username, password, firstName, lastName};
        return this.props
            .dispatch(registerUser(user))
            .then(() => this.props.dispatch(login(username, password)));
    }

    reset=()=>this.props.reset()

    render() {
        return (
            <form name="myForm" id="myForm" autoComplete="newoff"
                className="registration-form"
                onSubmit={this.props.handleSubmit(values =>
                    this.onSubmit(values)
                )}>
                 <input type='hidden' value='something'/>
                <label htmlFor="new-username">Username</label>
                <Field
                    component={Input}
                    type="text"
                    name="new-username"
                    autocomplete="new-user-username"
                    validate={[required, nonEmpty, isTrimmed]}
                />
                <label htmlFor="new-password">Password</label>
                <Field
                    component={Input}
                    type="password"
                    name="new-password"
                    autocomplete="new-user-password"
                    validate={[required, passwordLength, isTrimmed]}
                />
                <label htmlFor="passwordConfirm">Confirm password</label>
                <Field
                    component={Input}
                    type="password"
                    name="new-passwordConfirm"
                    validate={[required, nonEmpty, matchesPassword]}
                />

                <div className="buttons-form-container">
                <button
                    className="button1"
                    type="submit"
                    disabled={this.props.pristine || this.props.submitting}>
                    Register
                </button>

                  <button className="button1" onClick={(e)=>{e.preventDefault(); this.props.cancelHandler()}} >
                    Cancel
                </button>
                </div>
       
            </form>
        );
    }
}

export default reduxForm({
    form: 'registration',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('registration', Object.keys(errors)[0]))
})(RegistrationForm);
