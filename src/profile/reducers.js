import { LOAD } from 'redux-storage';
import { RECEIVE_PROFILE_UPDATE, UPDATING_PROFILE, UPDATE_PROFILE_ERROR, RECEIVE_PROFILE, REQUEST_PROFILE} from './actions'
import {LOGOUT} from '../login/actions'

const reducers = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_PROFILE_UPDATE:
      return Object.assign({}, state,
        {
          ...action.profile,
          saving: action.saving,
          saved: action.saved
        });
    case UPDATING_PROFILE:
      return Object.assign({}, state,
        {
          saving: action.saving,
          saved: action.saved
        });
    case RECEIVE_PROFILE: {
      return Object.assign({}, state, { received: true, ...action.profile })
    }
    case REQUEST_PROFILE: {
      return Object.assign({}, state, { received: false })
    }
    case LOGOUT:
      return {};
    case UPDATE_PROFILE_ERROR:
      return {};
    case LOAD:
      return state;
    default:
      return state
  }
}

export default reducers
