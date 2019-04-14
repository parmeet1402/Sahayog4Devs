import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { verifyUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";
class Verify extends Component {
  constructor() {
    super();
    this.state = {
      rand: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const otpInput = {
      rand: this.state.rand
    };
    this.props.verifyUser(otpInput, this.props.history);
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
        <div className="Verify">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Verify Email Id</h1>
                <p className="lead text-center">
                  An OTP has been sent to your email id.
                </p>
                <form onSubmit={this.onSubmit}>
                  <TextFieldGroup
                    placeholder="OTP"
                    type="text"
                    name="rand"
                    value={this.state.rand}
                    onChange={this.onChange}
                    error={errors.rand}
                  />

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

Verify.propTypes = {
  verifyUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { verifyUser }
)(withRouter(Verify));
