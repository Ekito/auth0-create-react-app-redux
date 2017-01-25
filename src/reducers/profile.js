import { LOAD, SAVE } from 'redux-storage';

const todos = (state = {}, action) => {
  switch (action.type) {
    case 'RECEIVE_PROFILE_UPDATE':
      return Object.assign({}, state,
        {
          ...action.profile
        });
    case 'UPDATING_PROFILE':
      return Object.assign({}, state,
        {
          saving: action.saving,
          saved: action.saved
        });
    case 'UPDATE_PROFILE':
      return Object.assign({}, state,
        {
          ...action.profile,
          saving: action.saving,
          saved: action.saved
        });
    case 'LOGOUT':
      return {};
    case 'UPDATE_PROFILE_ERROR':
      return {};
    case LOAD:
      return state;
    case SAVE:
      console.log('Something has changed and written to disk!');
    default:
      return state
  }
}

export default todos
