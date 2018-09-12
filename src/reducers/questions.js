import {
    FETCH_QUESTION_SUCCESS,
    FETCH_QUESTION_ERROR,
    MAKE_GUESS_SUCCESS,
    MAKE_GUESS_ERROR,
    FETCH_ATTEMPTS_SUCCESS,
    FETCH_ATTEMPTS_ERROR,
    FETCH_CORRECTCOUNT_SUCCESS,
    FETCH_CORRECTCOUNT_ERROR,
    FETCH_ALL_QUESTIONS_SUCCESS,
    FETCH_ALL_QUESTIONS_ERROR
} from '../actions/questions';

const initialState = {
    questions: [],
    question:'',
    prevQuestion:{},
    correctCount:null,
    showFeedback:false,
    showGuessBox: true,
    attempts:null,
    correctAnswer: '',
    error: null
};


export default function reducer(state = initialState, action) {
    if (action.type === FETCH_QUESTION_SUCCESS) {
        console.log('IT WAS SUCCESSFUL', action);
        return Object.assign({}, state, {
            correctAnswer: '',
            question: action.question,
            // prevQuestion: action.questions.previous,
            showFeedback:false,
            showGuessBox: true,
            error: null
        });
    } else if (action.type === FETCH_QUESTION_ERROR) {
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
    } else if (action.type === FETCH_CORRECTCOUNT_SUCCESS) {
        return Object.assign({}, state, {
            correctCount: action.correctCount
        })
    } else if (action.type === FETCH_CORRECTCOUNT_ERROR) {
        return Object.assign({}, state, {
            error: action.error
        })   
    } else if (action.type === MAKE_GUESS_SUCCESS) {
        console.log('THE GUESS WAS SUCCESSFUL', action);
        return Object.assign({}, state, {
            correctAnswer: action.guess ? action.guess.answer : '',
            attempts: action.guess.attempts,
            correctCount: action.guess.correctCount,
            showFeedback: true,
            showGuessBox: false,
            error: null
        })
    } else if (action.type === MAKE_GUESS_ERROR) {
        console.log('THE GUESS WAS AN ERROR');
        return Object.assign({}, state, {
            error: action.error
        });    
    } else if (action.type === FETCH_ALL_QUESTIONS_SUCCESS) {
        console.log('ACTION QUESTIONS FETCH',action.questions);
        return Object.assign({}, state, {
            questions: action.questions
        })
    } else if (action.type === FETCH_ALL_QUESTIONS_ERROR) {
        return Object.assign({}, state, {
            error: action.error
        })
    }
    return state;
}
