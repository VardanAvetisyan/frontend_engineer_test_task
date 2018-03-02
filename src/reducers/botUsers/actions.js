import * as types from './actionTypes'
import data from '../../bot-users.json'

export function getUsers () {
  return dispatch => {
    try {
      dispatch({type: types.GETTING_USERS})

      /* real call would look something like this

      axios.get(`${window.env.BASE_URL}/api/users?searchTerm=${valueFromArguments}`)
        .then((response) => {
          dispatch({type: types.GETTING_USERS, payload: response})
        })
        .catch((error) => {
          dispatch({type: types.GETTING_USERS_ERROR, payload: error})
        });

      */

      dispatch({type: types.GETTING_USERS_DONE, payload: data})

    } catch (err) {

      dispatch({type: types.GETTING_USERS_ERROR, payload: err})

    }
  }
}

