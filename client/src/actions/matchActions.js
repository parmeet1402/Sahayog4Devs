import axios from "axios";
import {
  GET_ERRORS,
  MATCH_LOADING,
  CLEAR_CURRENT_MATCH,
  SET_MATCHED_USER
} from "./types";

//addUserSkills
export const matchUser = data => dispatch => {
  //dispatch(setMatchLoading());
  axios
    .post("/api/match/", data)
    .then(res =>
      dispatch({
        type: SET_MATCHED_USER,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: SET_MATCHED_USER,
        payload: {}
      })
    );
};

//user skills loading
export const setMatchLoading = () => {
  return {
    type: MATCH_LOADING
  };
};

//clear skills
export const clearCurrentMatch = () => {
  return {
    type: CLEAR_CURRENT_MATCH
  };
};
