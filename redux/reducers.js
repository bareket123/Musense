import {SET_USERNAME,SET_IS_LOGGED_IN,SET_TOKEN,SET_PLAYLIST,SET_PLAYED_RECENTLY,SET_CURRENTLY_DELETE} from "./actions";



const initialState = {
    username:"",
    token:"",
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
                ...state ,
                token: action.payload
            }
        case SET_IS_LOGGED_IN:
            return {
                ...state ,
                isLoggedIn: action.payload
            }
        case SET_PLAYLIST :
            return{
                ...state ,
                playList: [...state.playList,action.playList]
            }
        case SET_CURRENTLY_DELETE :
            return{
                ...state,
                currentlyDelete: action.payload
            }

        case SET_PLAYED_RECENTLY :

            if (!(state.playedRecently.includes(action.playedRecently))) {
                return {
                    ...state,
                    playedRecently: [...state.playedRecently, action.playedRecently]
                };
            }
            return state;

        default :
            return state ;
    }
}

export default reducer;

