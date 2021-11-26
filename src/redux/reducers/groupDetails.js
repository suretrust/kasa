import { GET_GROUP_DETAILS } from '../actions/groups/types'

const initialState = {
  groupDetails: {}
}

const groupDetails = (state = initialState, action) => {
  switch (action.type) {
    case GET_GROUP_DETAILS:
      return { ...state, groupDetails: action.groupDetails }
    default:
      return state
  }
}

export default groupDetails
