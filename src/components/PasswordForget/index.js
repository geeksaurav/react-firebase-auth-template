import React, { Component } from "react";
import { Link } from "react-router-dom";

import TextField from "@material-ui/core/TextField";
import { styled } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

const PasswordForgetPage = () => (
  <center>
    <h1>PasswordForget</h1>
    <PasswordForgetForm />
  </center>
);

const INIT_STATE = {
  email: "",
  error: null
};

const ForgotPassword = styled(Button)({
  background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  margin: "10px",
  border: 0,
  borderRadius: 3,
  boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  color: "white",
  height: 48,
  padding: "0 30px"
});

class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INIT_STATE };
  }

  onSubmit = event => {
    const { email } = this.state;

    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INIT_STATE });
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, error } = this.state;

    const isInvalid = email === "";

    return (
      <form onSubmit={this.onSubmit}>
        <div>
          <TextField
            name='email'
            label='Email Address'
            value={email}
            variant='outlined'
            onChange={this.onChange}
            style={{ margin: "10px", width: "250px" }}
          />
        </div>
        <ForgotPassword
          disabled={isInvalid}
          size='large'
          type='submit'
          variant='contained'
          color='secondary'
        >
          Reset Password
        </ForgotPassword>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const PasswordForgotLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password</Link>
  </p>
);

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgotLink };
export default PasswordForgetPage;
