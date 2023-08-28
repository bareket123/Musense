import {
    SET_USERNAME,
    SET_TOKEN,
    SET_PLAYLIST,
    SET_PLAYED_RECENTLY,
    SET_IS_LOGGED_IN, RESET_STATE,
    SET_DELETE_FROM_PLAYLIST
} from "./actions";



const initialState = {
    username:'guest',
    token:'',
    isLoggedIn : false ,
    playList : [],
    playedRecently: [],
    currentlyDelete:null,
}

function reducer (state = initialState,action){
    switch (action.type) {
        case SET_USERNAME:
            return {
                ...state ,
               username: action.payload
            }
        case SET_TOKEN:
            return {
                ...state,
                token: action.payload,
                isLoggedIn: !!action.payload,
            }
        case SET_IS_LOGGED_IN:
            return {
                ...state,
                isLoggedIn: action.payload,
            }
        case SET_PLAYLIST :
            return{
                ...state ,
                playList: [...state.playList,action.playList]
            }
        case SET_DELETE_FROM_PLAYLIST:
            const updatedPlayList = state.playList.filter(song => song.url !== action.payload.url);
            return {
                ...state,
                playList: updatedPlayList
            };
        case SET_PLAYED_RECENTLY :

            if (!(state.playedRecently.includes(action.playedRecently))) {
                return {
                    ...state,
                    playedRecently: [...state.playedRecently, action.playedRecently]
                };
            }
            return state;
        case RESET_STATE:
            return initialState;
        default :
            return state ;
    }
}

export default reducer;

