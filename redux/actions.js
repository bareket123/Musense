
export const SET_PLAYLIST = 'SET_PLAYLIST'
export const SET_PLAYED_RECENTLY = 'SET_PLAYED_RECENTLY'
export const SET_TOKEN = 'SET_TOKEN'
export const SET_USERNAME = 'SET_USERNAME'
export const SET_IS_LOGGED_IN = 'SET_IS_LOGGED_IN'
export const SET_DELETE_FROM_PLAYLIST= 'SET_DELETE_FROM_PLAYLIST'
export const SET_IS_SONG_PLAYING = 'SET_IS_SONG_PLAYING';
export const SET_PICTURE= 'SET_PICTURE'
export const RESET_STATE = 'RESET_STATE';
export const LOCAL_SERVER_URL='http://10.0.0.1:8989';
export const X_RAPID_API_KEY='652b7eb337msh4ef45dc4ece6476p15ddfajsnf639f273a72e';
export const X_RAPID_API_KEY2='ba25fd847cmsh949103eddc49af0p1977b0jsna6a90c98f463';
export const X_RAPID_API_HOST ='shazam.p.rapidapi.com';
export const X_RAPID_API_HOST7 ='shazam-api7.p.rapidapi.com';



export const setPlaylist = newSong => dispatch => {
    dispatch({
        type : SET_PLAYLIST ,
        playList : newSong
    });

};

    export const setToken = token => dispatch => {
        dispatch({
            type: SET_TOKEN,
            payload: token
        });
    }

export const setUsername = username => dispatch => {
    dispatch({
        type: SET_USERNAME,
        payload: username
    });
}
export const setPicture = pic => dispatch => {
    dispatch({
        type: SET_PICTURE,
        payload: pic
    });
}

export const setIsSongPlaying = isSongPlaying => dispatch=> {
    dispatch({
        type: SET_IS_SONG_PLAYING,
        payload: isSongPlaying,
    });
}
export const resetState = () => {
    return {
        type: RESET_STATE
    }
}
export const setDeleteSong = song => {
    console.log("delete song  "+song)
    return {
        type: SET_DELETE_FROM_PLAYLIST,
        payload: song
    };
};




