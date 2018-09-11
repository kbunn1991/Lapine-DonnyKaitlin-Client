import {
    FETCH_QUESTIONS_SUCCESS,
    FETCH_QUESTIONS_ERROR,
    MAKE_GUESS_SUCCESS,
    MAKE_GUESS_ERROR
} from '../actions/questions';

const initialState = {
    questions:'',
    prevQuestion:{},
    showFeedback:false,
    showGuessBox: true,
    error: null
};

export default function reducer(state = initialState, action) {
    if (action.type === FETCH_QUESTIONS_SUCCESS) {
        console.log('IT WAS SUCCESSFUL', action);
        return Object.assign({}, state, {
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
    } else if (action.type === MAKE_GUESS_SUCCESS) {
        console.log('THE GUESS WAS SUCCESSFUL');
        return Object.assign({}, state, {
            // questions: action.questions.current,
            // prevQuestion: action.questions.previous,
            showFeedback:true,
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
