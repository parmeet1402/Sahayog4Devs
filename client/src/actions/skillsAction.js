import axios from "axios";
import {
  GET_USER_SKILLS,
  GET_ERRORS,
  USER_SKILLS_LOADING,
  CLEAR_CURRENT_USER_SKILLS,
  GET_REQUIRED_SKILL,
  REQUIRED_SKILL_LOADING,
  CLEAR_CURRENT_REQUIRED_SKILL
} from "./types";

//get user skills
export const getCurrentUserSkills = () => dispatch => {
  dispatch(setUserSkillsLoading());
  axios
    .get("/api/skills/user")
    .then(res =>
      dispatch({
        type: GET_USER_SKILLS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_USER_SKILLS,
        payload: {}
      })
    );
};
//add user skills
export const addUserSkills = (skills, history) => dispatch => {
  dispatch(setUserSkillsLoading());
  axios
    .post("/api/skills/user",skills)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};


//get required skills
export const getCurrentRequiredSkill = () => dispatch => {
  dispatch(setRequiredSkillLoading());
  axios
    .get("/api/skills/required")
    .then(res =>
      dispatch({
        type: GET_REQUIRED_SKILL,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_REQUIRED_SKILL,
        payload: {}
      })
    );
};


//add user skills
export const addRequiredSkill = (reqSkill, history) => dispatch => {
  dispatch(setRequiredSkillLoading());
  axios
    .post("/api/skills/required",reqSkill)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};


//user skills loading
export const setUserSkillsLoading = () => {
  return {
    type: USER_SKILLS_LOADING
  };
};

//clear skills
export const clearCurrentUserSkills = () => {
  return {
    type: CLEAR_CURRENT_USER_SKILLS
  };
};

//user skills loading
export const setRequiredSkillLoading = () => {
  return {
    type: REQUIRED_SKILL_LOADING
  };
};

//clear skills
export const clearCurrentRequiredSkill = () => {
  return {
    type: CLEAR_CURRENT_REQUIRED_SKILL
  };
};
