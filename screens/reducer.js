import { legacy_createStore as createStore} from 'redux'
const ADD_TO_PLAYED_RECENTLY = 'ADD_TO_PLAYED_RECENTLY';

const initialState = {
    cardData: []
};

export default function playedRecently(state = initialState, action) {
    switch (action.type) {
        case ADD_TO_PLAYED_RECENTLY:
            if (!state.cardData.some(song => song.url === action.data.url)) {
                return {
                    ...state,
                    cardData: [...state.cardData, action.data]
                };
            }
            return state; // Return the current state if the song already exists
        default:
            return state;
    }
}

export const store = createStore(playedRecently);


