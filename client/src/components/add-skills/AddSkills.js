import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import CheckBoxField from "../common/CheckBoxField";
import { addUserSkills } from "../../actions/skillsAction";
class AddSkills extends Component {
  constructor(props) {
    super(props);
    this.state = {
      skills: [],
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /* componentDidMount(){
    this.props.getCurrentUserSkills()
  }
  */

  /* 
  componentWillReceiveProps(nextProps) {
    if (nextProps.skills.length > 0) {
      this.setState({ skills: nextProps.skills });
    }
  } */

  onSubmit(event) {
    event.preventDefault();
    this.props.addUserSkills({ skills: this.state.skills }, this.props.history);
  }

  onChange(event) {
    let skillsArr = this.state.skills.concat();
    if (event.target.checked) {
      skillsArr.push(event.target.value);
    } else {
      skillsArr.splice(skillsArr.indexOf(event.target.value), 1);
    }
    console.log(skillsArr);
    this.setState({
      skills: skillsArr
    });
    console.log(this.state.skills);
  }

  render() {
    let content1;
    if (this.props.auth.user.interest === "algorithms") {
      content1 = (
        <div>
          <CheckBoxField
            id="chk2"
            value="Searching"
            content="Searching"
            name="Searching"
            onChange={this.onChange}
          />
          <CheckBoxField
            id="chk2"
            value="Sorting"
            content="Sorting"
            name="Sorting"
            onChange={this.onChange}
          />
          <CheckBoxField
            id="chk2"
            value="Basic Data Structures"
            content="Basic Data Structures"
            name="Basic Data Structures"
            onChange={this.onChange}
          />
          <CheckBoxField
            id="chk2"
            value="Advanced Data Structures"
            content="Advanced Data Structures"
            name="Advanced Data Structures"
            onChange={this.onChange}
          />
          <CheckBoxField
            id="chk2"
            value="Dynammic Programming"
            content="Dynammic Programming"
            name="Dynammic Programming"
            onChange={this.onChange}
          />
          <CheckBoxField
            id="chk2"
            value="Number Theory"
            content="Number Theory"
            name="Number Theory"
            onChange={this.onChange}
          />
          <CheckBoxField
            id="chk2"
            value="Computational Geometry"
            content="Computational Geometry"
            name="Computational Geometry"
            onChange={this.onChange}
          />
          <CheckBoxField
            id="chk2"
            value="Graph Algorithms"
            content="Graph Algorithms"
            name="Graph Algorithms"
            onChange={this.onChange}
          />
          <CheckBoxField
            id="chk2"
            value="Greedy Algorithms"
            content="Greedy Algorithms"
            name="Greedy Algorithms"
            onChange={this.onChange}
          />
          <CheckBoxField
            id="chk2"
            value="Backtracking"
            content="Backtracking"
            name="Backtracking"
            onChange={this.onChange}
          />
        </div>
      );
    } else {
      content1 = (
        <div>
          <CheckBoxField
            id="chk2"
            value="Static Website"
            content="Static Website"
            name="Static Website"
            onChange={this.onChange}
          />
          <CheckBoxField
            id="chk2"
            value="Python Full-Stack Web App"
            content="Python Full-Stack Web App"
            name="Python Full-Stack Web App"
            onChange={this.onChange}
          />
          <CheckBoxField
            id="chk2"
            value="MEAN Full-Stack Web App"
            content="MEAN Full-Stack Web App"
            name="MEAN Full-Stack Web App"
            onChange={this.onChange}
          />
          <CheckBoxField
            id="chk2"
            value="MERN Full-Stack Web App"
            content="MERN Full-Stack Web App"
            name="MERN Full-Stack Web App"
            onChange={this.onChange}
          />
          <CheckBoxField
            id="chk2"
            value="Progressive Web Apps(PWAs)"
            content="Progressive Web Apps(PWAs)"
            name="Progressive Web Apps(PWAs)"
            onChange={this.onChange}
          />
          <CheckBoxField
            id="chk2"
            value="Android App"
            content="Android App"
            name="Android App"
            onChange={this.onChange}
          />
          <CheckBoxField
            id="chk2"
            value="iOS App"
            content="iOS App"
            name="iOS App"
            onChange={this.onChange}
          />
          <CheckBoxField
            id="chk2"
            value="Cross-Platform Mobile Apps"
            content="Cross-Platform Mobile Apps"
            name="Cross-Platform Mobile Apps"
            onChange={this.onChange}
          />
          <CheckBoxField
            id="chk2"
            value="Cross-Platform Desktop Apps"
            content="Cross-Platform Desktop Apps"
            name="Cross-Platform Desktop Apps"
            onChange={this.onChange}
          />
          <CheckBoxField
            id="chk2"
            value="Web Browser Extensions"
            content="Web Browser Extensions"
            name="Web Browser Extensions"
            onChange={this.onChange}
          />
        </div>
      );
    }

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Add your skills</h1>
              <p className="lead text-center d-block">
                Selecting appropriate skills will help us find an appropriate
                programmer for you to work with.
              </p>
              <form onSubmit={this.onSubmit}>
                {content1}
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddSkills.propTypes = {
  addUserSkills: PropTypes.func.isRequired,
  // getCurrentUserSkills: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});
export default connect(
  mapStateToProps,
  { addUserSkills }
)(withRouter(AddSkills));
