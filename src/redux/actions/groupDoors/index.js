import { ADD_GROUP_DOOR, DELETE_GROUP_DOOR, GET_GROUP_DOORS } from './types'

export const getGroupDoorsAction = groupDoors => ({
  type: GET_GROUP_DOORS,
  groupDoors
})

export const addGroupDoorAction = groupDoor => ({
  type: ADD_GROUP_DOOR,
  groupDoor
})

export const deleteGroupDoorAction = doorObjectId => ({
  type: DELETE_GROUP_DOOR,
  doorObjectId
})
