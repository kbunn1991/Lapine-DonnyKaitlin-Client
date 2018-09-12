import {
    FETCH_QUESTIONS_SUCCESS,
    FETCH_QUESTIONS_ERROR,
    MAKE_GUESS_SUCCESS,
    MAKE_GUESS_ERROR,
    FETCH_ATTEMPTS_SUCCESS,
    FETCH_ATTEMPTS_ERROR,
    FETCH_CORRECTANSWERS_SUCCESS,
    FETCH_CORRECTANSWERS_ERROR
} from '../actions/questions';

const initialState = {
    questions:'',
    prevQuestion:{},
    showFeedback:false,
    showGuessBox: true,
    correctAnswer: '',
    error: null
};


export default function reducer(state = initialState, action) {
    if (action.type === FETCH_QUESTIONS_SUCCESS) {
        console.log('IT WAS SUCCESSFUL', action);
        return Object.assign({}, state, {
            correctAnswer: '',
            questions: action.questions,
            // prevQuestion: action.questions.previous,
            showFeedback:false,
            showGuessBox: true,
            error: null
        });
    } else if (action.type === FETCH_QUESTIONS_ERROR) {
        console.log('IT WAS AN ERROR', action);
        return Object.assign({}, state, {
            error: action.error
        });
    } else if (action.type === FETCH_ATTEMPTS_SUCCESS) {
        return Object.assign({}, state, {
            attempts: action.attempts
        })
    } else if (action.type === FETCH_ATTEMPTS_ERROR) {
        return Object.assign({}, state, {
            error: action.error
        })
    } else if (action.type === FETCH_CORRECTANSWERS_SUCCESS) {
        return Object.assign({}, state, {
            correctAnswer: action.correctAnswer
        })
    } else if (action.type === FETCH_CORRECTANSWERS_ERROR) {
        return Object.assign({}, state, {
            error: action.error
        })   
    } else if (action.type === MAKE_GUESS_SUCCESS) {
        console.log('THE GUESS WAS SUCCESSFUL', action);
        return Object.assign({}, state, {
            correctAnswer: action.guess ? action.guess : '',
            showFeedback: true,
            showGuessBox: false,
            error: null
        })
    } else if (action.type === MAKE_GUESS_ERROR) {
        console.log('THE GUESS WAS AN ERROR');
        return Object.assign({}, state, {
            error: action.error
        });    
    }
    return state;
}
