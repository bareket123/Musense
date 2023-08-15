import {SET_PLAYLIST,SET_PLAYED_RECENTLY} from "./actions";



const initialState = {
    playList : [],
    playedRecently: []
}

function reducer (state = initialState,action){
    switch (action.type) {
        case SET_PLAYLIST :
            return{
                ...state ,
                playList: [...state.playList,action.playList]
            }
        case SET_PLAYED_RECENTLY :
            return {
                ...state ,
                playedRecently: [...state.playedRecently,action.playedRecently]
            }
        default :
            return state ;
    }
}

export default reducer;