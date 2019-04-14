import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import skillsReducer from "./skillsReducer";
import requiredSkillReducer from "./requiredSkillReducer";
import matchUserReducer from "./matchReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: skillsReducer,
  requiredSkill: requiredSkillReducer,
  finalUser: matchUserReducer
});
