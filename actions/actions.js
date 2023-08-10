

let ADD_TO_PLAYED_RECENTLY='ADD_TO_PLAYED_RECENTLY';
export const addToPlayedRecently =(data)=>{
    // console.warn("action",data)

    return {
        type:ADD_TO_PLAYED_RECENTLY,
        data:data
    }
}
