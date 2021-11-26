import { combineReducers } from 'redux'

import groups from './groups'
import groupDetails from './groupDetails'
import groupDoors from './groupDoors'
import placeDoors from './placeDoors'

const rootReducer = combineReducers({
  groups,
  groupDetails,
  groupDoors,
  placeDoors
})

export default rootReducer
