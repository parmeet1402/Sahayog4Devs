import {
  SET_MATCHED_USER,
  MATCH_LOADING,
  CLEAR_CURRENT_MATCH
} from "../actions/types";
const initialState = {
  finalUser: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_MATCHED_USER:
      return {
        ...state,
        finalUser: action.payload,
        loading: false
      };
    case CLEAR_CURRENT_MATCH:
      return {
        ...state,
        finalUser: null
      };
    default:
      return state;
  }
}
