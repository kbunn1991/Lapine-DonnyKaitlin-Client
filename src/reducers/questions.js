import {
    FETCH_QUESTIONS_SUCCESS,
    FETCH_QUESTIONS_ERROR,
    MAKE_GUESS_SUCCESS,
    MAKE_GUESS_ERROR
} from '../actions/questions';

const initialState = {
    questions:{},
    prevQuestion:{},
    showFeedback:false,
    error: null
};

export default function reducer(state = initialState, action) {
    // console.log('FETCH ACTION ',action.questions.previous);
    if (action.type === FETCH_QUESTIONS_SUCCESS) {
        return Object.assign({}, state, {
            questions: action.questions.current,
            prevQuestion: action.questions.previous,
            error: null
        });
    } else if (action.type === FETCH_QUESTIONS_ERROR) {
        return Object.assign({}, state, {
            error: action.error
        });
    } else if (action.type === MAKE_GUESS_SUCCESS) {
        return Object.assign({}, state, {
            // questions: action.questions.current,
            // prevQuestion: action.questions.previous,
            showFeedback:true,
            error: null
        })
    } else if (action.type === MAKE_GUESS_ERROR) {
        return Object.assign({}, state, {
            error: action.error
        });    
    }
    return state;
}
