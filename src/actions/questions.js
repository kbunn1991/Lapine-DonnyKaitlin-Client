import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

export const FETCH_QUESTIONS_SUCCESS = 'FETCH_QUESTIONS_SUCCESS';
export const fetchQuestionsSuccess = questions => ({
    type: FETCH_QUESTIONS_SUCCESS,
    questions
});

export const FETCH_QUESTIONS_ERROR = 'FETCH_QUESTIONS_ERROR';
export const fetchQuestionsError = error => ({
    type: FETCH_QUESTIONS_ERROR,
    error
});

export const fetchQuestions = () => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/questions`, {
        method: 'GET',
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        // .then(res => console.log('This is the result', res))
        .then((questions) => dispatch(fetchQuestionsSuccess(questions)))
        .catch(err => {
            dispatch(fetchQuestionsError(err));
        });
};

export const MAKE_GUESS_SUCCESS = 'MAKE_GUESS_SUCCESS';
export const makeGuessSuccess = guess => ({
    type: MAKE_GUESS_SUCCESS,
    guess
})

export const MAKE_GUESS_ERROR = 'MAKE_GUESS_ERROR';
export const makeGuessError = error => ({
    type: MAKE_GUESS_ERROR,
    error
})

export const makeGuess = (guess) => (dispatch, getState) => {
    console.log('MAKE GUESS ACTION',guess);
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/questions`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${authToken}`,
            'content-type': 'application/json'
        },
        body: 
           JSON.stringify({guess:guess})
        
    })
    .then(res => res.json())
    .then((guess) => dispatch(makeGuessSuccess(guess)))
    .catch(err => {
        dispatch(makeGuessError(err));
    });
}