import {
    REQUIRED_SKILL_LOADING,
    GET_REQUIRED_SKILL,
    CLEAR_CURRENT_REQUIRED_SKILL
  } from "../actions/types";
  const initialState = {
    userSkills: null,
    requiredSkill: null,
    loading: false
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case REQUIRED_SKILL_LOADING:
        return {
          ...state,
          loading: true
        };
      case GET_REQUIRED_SKILL:
        return {
          ...state,
          requiredSkill: action.payload,
          loading: false
        };
      case CLEAR_CURRENT_REQUIRED_SKILL:
        return {
          ...state,
          requiredSkill: null
        };
      default:
        return state;
    }
  }
  