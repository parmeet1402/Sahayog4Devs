import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { matchUser } from "../../actions/matchActions";
import classnames from "classnames";
import Spinner from "../common/Spinner";
import Dashboard from "../dashboard/Dashboard";
class MatchProfile extends Component {
  constructor() {
    super();
    this.state = {
      submitted: false,
      requiredSkill: "",
      choice: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    /*   if (this.props.profile.userSkills.skills.length === 0) {
      this.props.history.push("/dashboard");
    } */
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const data = {
      requiredSkill: this.state.requiredSkill,
      choice: this.state.choice
    };

    if (this.state.requiredSkill !== "" && this.state.choice !== "") {
      this.setState({
        submitted: true
      });
    }

    this.props.matchUser(data);

    //add logic to select route and produce error
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    const { errors } = this.state;
    const { user } = this.props.auth;
    const { loading } = this.props.profile;
    const { finalUser } = this.props.finalUser;
    let matchUpperContent;
    let matchUI;

    if (this.state.submitted) {
      if (this.props.finalUser.finalUser) {
        const { finalUser } = this.props.finalUser;
        const link = `https://www.codechef.com/users/${finalUser.codechefId}`;
        const emailLink = `mailto:${finalUser.email}`;
        matchUI = (
          <div
            className="card center-block text-center"
            style={{
              width: "500px",
              backgroundColor: "#ecf0f1",
              margin: "0 auto",
              marginTop: "15px"
            }}
          >
            <h1 className="card-body">Found a Match for you!</h1>
            <h2 className="card-body">{finalUser.name}</h2>
            <div className="card-body">
              <a href={link}>
                <button class="btn btn-primary">View Codechef Profile</button>
              </a>
              <a href={emailLink}>
                <button class="btn btn-success ml-3">Send Email</button>
              </a>
            </div>
          </div>
        );
      }
    }

    /*  if (this.state.submitted) {
      matchUI = (
        <div>
          <h1>SUBMITTED</h1>
        </div>
      );
    } else {
      matchUI = (
        <div>
          <h1>NOT SUBMITTED</h1>
          <h1>NOT SUBMITTED</h1>
        </div>
      );
    }
 */
    if (user.interest == "development") {
      matchUpperContent = (
        <div>
          <select
            onChange={this.onChange}
            className="form-control form-control-lg"
            name="requiredSkill"
            value={this.state.requiredSkill}
          >
            <option value="">What skill you want in your match</option>
            <option value="Static Website">Static Website</option>
            <option value="Python Full-Stack Web App">
              Python Full-Stack Web App
            </option>
            <option value="MEAN Full-Stack Web App">
              MEAN Full-Stack Web App
            </option>
            <option value="MERN Full-Stack Web App">
              MERN Full-Stack Web App
            </option>
            <option value="Progressive Web Apps(PWAs)">
              Progressive Web Apps(PWAs)
            </option>
            <option value="Android App">Android App</option>
            <option value="iOS App">iOS App</option>
            <option value="Cross-Platform Mobile Apps">
              Cross-Platform Mobile Apps
            </option>
            <option value="Cross-Platform Desktop Apps">
              Cross-Platform Desktop Apps
            </option>
            <option value="Web Browser Extensions">
              Web Browser Extensions
            </option>
          </select>
        </div>
      );
    } else {
      matchUpperContent = (
        <div>
          <select
            onChange={this.onChange}
            name="requiredSkill"
            value={this.state.requiredSkill}
            className="form-control form-control-lg"
          >
            <option value="">What skill you want in your match</option>
            <option value="Searching">Searching</option>
            <option value="Sorting">Sorting</option>
            <option value="Basic Data Structures">Basic Data Structures</option>
            <option value="Advanced Data Structures">
              Advanced Data Structures
            </option>
            <option value="Dynammic Programming">Dynammic Programming</option>
            <option value="Number Theory">Number Theory</option>
            <option value="Computational Geometry">
              Computational Geometry
            </option>
            <option value="Graph Algorithms">Graph Algorithms</option>
            <option value="Greedy Algorithms">Greedy Algorithms</option>
            <option value="Backtracking">Backtracking</option>
          </select>
        </div>
      );
    }

    return (
      <div>
        <h1>Find a Match to work with</h1>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">{matchUpperContent}</div>
          <div className="form-group">
            <select
              value={this.state.choice}
              onChange={this.onChange}
              name="choice"
              className="form-control form-control-lg"
            >
              <option value="">On what basis shall we match?</option>
              <option value="performance">Past Performance</option>
              <option value="skillset">Skillset</option>
              <option value="location">Location</option>
            </select>
          </div>
          <input type="submit" className="btn btn-info btn-block mt-4" />
        </form>
        {matchUI}
        
      </div>
    );
  }
}

MatchProfile.propTypes = {
  matchUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  finalUser: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  finalUser: state.finalUser,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { matchUser }
)(MatchProfile);
//export default MatchProfile;
