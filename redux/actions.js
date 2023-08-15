export const SET_PLAYLIST = 'SET_PLAYLIST'
export const SET_PLAYED_RECENTLY = 'SET_PLAYED_RECENTLY'

export const setPlaylist = newSong => dispatch => {
    dispatch({
        type : SET_PLAYLIST ,
        playList : newSong
    });

};

export const setPlayedRecently = newSong => dispatch => {
    dispatch({
        type : SET_PLAYED_RECENTLY ,
        playedRecently : newSong
    });



};
