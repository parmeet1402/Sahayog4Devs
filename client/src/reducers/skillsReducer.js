import {
  GET_USER_SKILLS,
  USER_SKILLS_LOADING,
  CLEAR_CURRENT_USER_SKILLS
} from "../actions/types";
const initialState = {
  userSkills: null,
  requiredSkill: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case USER_SKILLS_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_USER_SKILLS:
      return {
        ...state,
        userSkills: action.payload,
        loading: false
      };
    case CLEAR_CURRENT_USER_SKILLS:
      return {
        ...state,
        userSkills: null
      };
    default:
      return state;
  }
}
