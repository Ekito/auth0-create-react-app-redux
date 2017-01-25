import { combineReducers } from 'redux'
import profile from './profile'
import login from './login'

const authApp = combineReducers({
  profile,
  login
})

export default authApp