import * as types from './actionTypes'

export default function reducer(state = {
  botUsers: [],
  fetchingUsers: false,
  error: null
}, action) {
  switch (action.type) {
    case types.GETTING_USERS: {
      return {...state, fetchingUsers: true}
    }
    case types.GETTING_USERS_DONE: {
      return {...state, fetchingUsers: false, botUsers: action.payload}
    }
    case types.GETTING_USERS_ERROR: {
      return {...state, fetchingUsers: false, error: action.payload}
    }
    default: {
      return {...state}
    }
  }
}