import {
  ADD_GROUP_DOOR,
  DELETE_GROUP_DOOR,
  GET_GROUP_DOORS
} from '../actions/groupDoors/types'

const initialState = {
  groupDoors: []
}

const groupDoors = (state = initialState, action) => {
  switch (action.type) {
    case GET_GROUP_DOORS:
      return { ...state, groupDoors: action.groupDoors }
    case DELETE_GROUP_DOOR:
      return {
        ...state,
        groupDoors: state.groupDoors.filter(
          door => door.id !== action.doorObjectId
        )
      }
    case ADD_GROUP_DOOR:
      return {
        ...state,
        groupDoors: [action.groupDoor, ...state.groupDoors]
      }
    default:
      return state
  }
}

export default groupDoors
