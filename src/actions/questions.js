import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

export const FETCH_QUESTION_SUCCESS = 'FETCH_QUESTIONS_SUCCESS';
export const fetchQuestionSuccess = question => ({
    type: FETCH_QUESTION_SUCCESS,
    question
});

export const FETCH_QUESTION_ERROR = 'FETCH_QUESTIONS_ERROR';
export const fetchQuestionError = error => ({
    type: FETCH_QUESTION_ERROR,
    error
});

export const fetchQuestion = () => (dispatch, getState) => {
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
        // .then(res => console.log('This is the response', res))
        .then((question) => dispatch(fetchQuestionSuccess(question)))
        // .then(question => console.log(question))
        .catch(err => {
            dispatch(fetchQuestionError(err));
        });
};

export const FETCH_IMAGE_SUCCESS = 'FETCH_IMAGE_SUCCESS';
export const fetchImageSuccess = imageURL => ({
    type: FETCH_IMAGE_SUCCESS,
    imageURL
});

export const FETCH_IMAGE_ERROR = 'FETCH_IMAGE_ERROR';
export const fetchImageError = error => ({
    type: FETCH_IMAGE_ERROR,
    error
});
export const fetchImage = () => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/questions/image`, {
        method: 'GET',
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        // .then(res => console.log('This is the response', res))
        .then((imageURL) => dispatch(fetchImageSuccess(imageURL)))
        // .then(question => console.log(question))
        .catch(err => {
            dispatch(fetchImageError(err));
        });
};


export const FETCH_ALL_QUESTIONS_SUCCESS = 'FETCH_ALL_QUESTIONS_SUCCESS';
export const fetchAllQuestionSuccess = questions => ({
    type: FETCH_ALL_QUESTIONS_SUCCESS,
    questions
});

export const FETCH_ALL_QUESTIONS_ERROR = 'FETCH_ALL_QUESTIONS_ERROR';
export const fetchAllQuestionError = error => ({
    type: FETCH_ALL_QUESTIONS_ERROR,
    error
});

export const fetchAllQuestions = () => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/questions/all`, {
        method: 'GET',
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`
        }
    })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    // .then(res => console.log('This is the response', res))
    .then((questions) => dispatch(fetchAllQuestionSuccess(questions)))
    // .then(question => console.log(question))
    .catch(err => {
        dispatch(fetchAllQuestionError(err));
    });
}

export const FETCH_HINT_SUCCESS = 'FETCH_HINT_SUCCESS';
export const fetchHintSuccess = hint => ({
    type: FETCH_HINT_SUCCESS,
    hint
})

export const FETCH_HINT_ERROR = 'FETCH_HINT_ERROR';
export const fetchHintError = error => ({
    type: FETCH_HINT_ERROR,
    error
})

export const fetchHint = () => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/questions/hint`, {
        method: 'GET',
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`
        }
    })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    // .then(res => console.log('This is the response', res))
    .then((hint) => dispatch(fetchHintSuccess(hint)))
    // .then(question => console.log(question))
    .catch(err => {
        dispatch(fetchHintError(err));
    });
}

export const FETCH_ATTEMPTS_SUCCESS = 'FETCH_ATTEMPTS_SUCCESS';
export const fetchAttemptsSuccess = attempts => ({
    type: FETCH_ATTEMPTS_SUCCESS,
    attempts
});

export const FETCH_ATTEMPTS_ERROR = 'FETCH_ATTEMPTS_ERROR';
export const fetchAttemptsError = error => ({
    type: FETCH_ATTEMPTS_ERROR,
    error
});

export const fetchAttempts = () => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/questions/attempts`, {
        method: 'GET',
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`
        }
    })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then((attempts) => dispatch(fetchAttemptsSuccess(attempts)))
    .catch(err => {
        dispatch(fetchAttemptsError(err));
    });
}

export const FETCH_CORRECTCOUNT_SUCCESS = 'FETCH_CORRECTANSWERS_SUCCESS';
export const fetchCorrectCountSuccess = correctCount => ({
    type: FETCH_CORRECTCOUNT_SUCCESS,
    correctCount
});

export const FETCH_CORRECTCOUNT_ERROR = 'FETCH_CORRECTANSWERS_ERROR';
export const fetchCorrectCountError = error => ({
    type: FETCH_CORRECTCOUNT_ERROR,
    error
});

export const fetchCorrectCount= () => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/questions/correct`, {
        method: 'GET',
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`
        }
    })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then((correctCount) => dispatch(fetchCorrectCountSuccess(correctCount)))
    .catch(err => {
        dispatch(fetchCorrectCountError(err));
    });
}

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
    // console.log('MAKE GUESS ACTION',guess);
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

    .then(res => res.json()) // english word comes back
    .then((guess) =>{
        // console.log('GUEUSS MAKE',guess)
        dispatch(makeGuessSuccess(guess));
    }) 
    .catch(err => {
        // console.log('makeguessError',err);
        dispatch(makeGuessError(err));
    });
}