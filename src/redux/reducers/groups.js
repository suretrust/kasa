import { GET_GROUPS } from '../actions/groups/types'

const initialState = {
  groups: []
}

const groups = (state = initialState, action) => {
  switch (action.type) {
    case GET_GROUPS:
      return { ...state, groups: action.groups }
    default:
      return state
  }
}

export default groups
