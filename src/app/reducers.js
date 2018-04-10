import { combineReducers } from 'redux'
import PROFILE_REDUCERS from '../profile/reducers'
import LOGIN_REDUCERS from '../login/reducers'

const authApp = combineReducers({
  profile: PROFILE_REDUCERS,
  login: LOGIN_REDUCERS
})

export default authApp
