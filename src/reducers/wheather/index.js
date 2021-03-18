// type 
export const SEARCHING_REQUEST = 'wheather/SEARCHING_REQUEST';
export const SEARCHING_SUCCESS = 'wheather/SEARCHING_SUCCESS';
export const SEARCHING_FAILURE = 'wheather/SEARCHING_FAILURE';

// actions
const searchingRequest = (txt) => ({
    type: SEARCHING_REQUEST,
    payload: {
        txt
    }
})

const searchingSuccess = (wheather) => ({
    type: SEARCHING_SUCCESS,
    payload: {
        wheather
    }
})

const searchingError = (error) => ({
    type: SEARCHING_FAILURE,
    payload: {
        error
    }
})

// selectors
const getWheather = ({ wheather }) => wheather.wheather
const getError = ({ wheather }) => wheather.error

const initialization = {
    wheather: [],
    error: null,
}

export default function reducer(state = initialization, { type, payload }) {
    switch (type) {
        case SEARCHING_SUCCESS: {
            const { wheather } = payload;
            return {
                ...state,
                wheather,
                error: '',
            }
        }
        case SEARCHING_FAILURE: {
            return {
                ...state,
                wheather: [],
                error: payload.error,
            }
        }
        default: return state;
    }
}

export const actions = {
    searchingRequest,
    searchingSuccess,
    searchingError,
}

export const selectors = {
    getWheather,
    getError,
}