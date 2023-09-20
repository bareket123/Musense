import {
    SET_USERNAME,
    SET_TOKEN,
    SET_PICTURE,
    SET_PLAYLIST,
    SET_PLAYED_RECENTLY,
    SET_IS_LOGGED_IN, RESET_STATE,
    SET_IS_SONG_PLAYING,
} from "./actions";



const initialState = {
    username:'guest',
    token:'',
    isLoggedIn : false ,
    picture : 'https://cdn-icons-png.flaticon.com/512/3271/3271191.png',
    playList : [],
    playedRecently: [],
    currentlyDelete:null,
    isPlaying:false,
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
        case SET_PICTURE:
            return {
                ...state,
                picture: action.payload,
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
        case SET_PLAYED_RECENTLY :
            if (!state.playedRecently.some(song => song.url === action.playedRecently.url)) {
                return {
                    ...state,
                    playedRecently: [...state.playedRecently, action.playedRecently],
                };
            }
            return state;
        case RESET_STATE:
            return initialState;

        case SET_IS_SONG_PLAYING:
            return {
                ...state,
                isPlaying: action.payload
            };

        default :
            return state ;
    }
}

export default reducer;

