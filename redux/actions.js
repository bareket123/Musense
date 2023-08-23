export const SET_PLAYLIST = 'SET_PLAYLIST'
export const SET_PLAYED_RECENTLY = 'SET_PLAYED_RECENTLY'
export const SET_TOKEN = 'SET_TOKEN'
export const SET_USERNAME = 'SET_USERNAME'
export const SET_IS_LOGGED_IN = 'SET_IS_LOGGED_IN'
export const SET_CURRENTLY_DELETE = 'SET_CURRENTLY_DELETE'

export const LOCAL_SERVER_URL='http://192.168.1.178:8989';

export const setPlaylist = newSong => dispatch => {
    dispatch({
        type : SET_PLAYLIST ,
        playList : newSong
    });

};

export const setPlayedRecently = newSong => dispatch => {
    dispatch({
        type: SET_PLAYED_RECENTLY,
        playedRecently: newSong
    });
}
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

export const setIsLoggedIn = isLogged => dispatch => {
    dispatch({
        type: SET_USERNAME,
        payload: isLogged
    });
}
    export const setCurrentlyDelete = song => dispatch => {
        dispatch({
            type: SET_CURRENTLY_DELETE,
            payload: song
        })
    }



