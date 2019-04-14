import React, { Component } from "react";
import classnames from "classnames";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";
class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      codechefId: "",
      interest: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      codechefId: this.state.codechefId,
      interest: this.state.interest
    };

    //redux step1 -> calling register action on submit which returns an object which contains type and payload(containing user data)
    this.props.registerUser(newUser, this.props.history);

    //console.log(newUser);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    const { errors } = this.state;
    return (
      <div>
        <div className="register">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Sign Up</h1>
                <p className="lead text-center">
                  Create your Sahayog4Developers account
                </p>
                <form noValidate onSubmit={this.onSubmit}>
                  <TextFieldGroup
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                    error={errors.name}
                  />

                  <TextFieldGroup
                    type="email"
                    placeholder="Email Address"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    error={errors.email}
                  />

                  <TextFieldGroup
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                    error={errors.password}
                  />

                  <TextFieldGroup
                    type="text"
                    placeholder="CodeChef Id"
                    name="codechefId"
                    value={this.state.codechefId}
                    onChange={this.onChange}
                    error={errors.codechefId}
                  />

                  <div className="form-group">
                    <select
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.interest
                      })}
                      name="interest"
                      value={this.state.interest}
                      onChange={this.onChange}
                    >
                      <option value="">What interests you more?</option>
                      <option value="development">Development</option>
                      <option value="algorithms">
                        Algorithms and Data Structures
                      </option>
                    </select>
                    {errors.interest && (
                      <div className="invalid-feedback">{errors.interest}</div>
                    )}
                  </div>
                  <input
                    type="submit"
                    className="btn btn-info btn-block mt-4"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

//easily access state of objec
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
