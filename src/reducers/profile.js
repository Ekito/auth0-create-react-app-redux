import { LOAD, SAVE } from 'redux-storage';
import { RECEIVE_PROFILE_UPDATE, UPDATING_PROFILE, UPDATE_PROFILE_ERROR, LOGOUT} from '../actions/profile'

const profile = (state = {}, action) => {
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
    case LOGOUT:
      return {};
    case UPDATE_PROFILE_ERROR:
      return {};
    case LOAD:
      return state;
    case SAVE:
      console.log('Something has changed and written to disk!');
      break;
    default:
      return state
  }
}

export default profile
