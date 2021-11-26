import { GET_GROUPS, GET_GROUP_DETAILS } from './types'

export const getGroupsAction = groups => ({
  type: GET_GROUPS,
  groups
})

export const getGroupDetailsAction = groupDetails => ({
  type: GET_GROUP_DETAILS,
  groupDetails
})
