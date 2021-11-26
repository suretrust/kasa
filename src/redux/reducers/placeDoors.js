import { GET_PLACE_DOORS } from '../actions/placeDoors/types'

const initialState = {
  placeDoors: []
}

const placeDoors = (state = initialState, action) => {
  switch (action.type) {
    case GET_PLACE_DOORS:
      return { ...state, placeDoors: action.placeDoors }
    default:
      return state
  }
}

export default placeDoors
