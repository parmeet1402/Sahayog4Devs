import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getCurrentUserSkills,
  getCurrentRequiredSkill
} from "../../actions/skillsAction";
import Spinner from "../common/Spinner";
import RequiredSkill from "./RequiredSkills";
class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentUserSkills();
  //  this.props.getCurrentRequiredSkill();
  }

  render() {
    const { user } = this.props.auth;
    const { userSkills, loading } = this.props.profile;
    //const { requiredSkill } = this.props.requiredSkill;
    let dashboardContent;

    if (userSkills === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      //check ig logged in user has userSkills
      if (Object.keys(userSkills).length > 0) {
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <h3 className="text-center">Your Skillset</h3>
            <ul className="list-group list-group-flush">
              {this.props.profile.userSkills.skills.map(skill => {
                return <li className="list-group-item">{skill}</li>;
              })}
            </ul>
          </div>
        );
      } else {
        //user is logged in but has no profile
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>You have not yet added your skills</p>
            <Link to="/add-skills" className="btn btn-lg btn-info">
              Add skills
            </Link>
          </div>
        );
      }
    }
    /* 
    let dashboardContent1;
    if (requiredSkill === null || loading) {
      dashboardContent1 = <Spinner />;
    } else {
      //checkg if logged in user has required skill
      if (Object.keys(requiredSkill).length > 0) {
        dashboardContent1 = (
          <div>
            <div className="text-muted lead" />
          </div>
        );
      } else {
        //user is logged in but has not setup required skill
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>What skill is Required by you?</p>
          </div>
        );
      }
    } */

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              <div>{dashboardContent}</div>
              {/* <div>{dashboardContent1}</div> */}
              {/* <RequiredSkill /> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Dashboard.propTypes = {
  getCurrentUserSkills: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
});
export default connect(
  mapStateToProps,
  { getCurrentUserSkills}
)(Dashboard);
