import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { getCurrentRequiredSkill } from "../../actions/skillsAction";
import Spinner from "../common/Spinner";
class RequiredSkills extends Component {
  componentDidMount() {
    this.props.getCurrentRequiredSkill();
  }

  render() {
    const { user } = this.props.auth;
    const { loading, requiredSkill } = this.props.requiredSkill;

    let dashboardContent;
    if (requiredSkill === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      //check if user is logged in or not
      if (Object.keys(requiredSkill) > 0) {
      } else {
        dashboardContent = (
          <div>
            <h1>Required skills are required</h1>
            <p>adsnfjnsfnj</p>
          </div>
        );
      }
    }
    return (
        <div>
            <h1>dsnfjn</h1>
            {dashboardContent}
        </div>
    )
  }
}



const mapStateToProps = state => ({
  auth: state.auth,
  requiredSkill: state.requiredSkill
});
export default connect(
  mapStateToProps,
  { getCurrentRequiredSkill }
)(RequiredSkills);
