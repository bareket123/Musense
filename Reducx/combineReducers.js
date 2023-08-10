import {combineReducers} from 'redux'
import playedRecently from '../screens/reducer'

export default combineReducers({
    cardItems: playedRecently,
})
