import React from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";

import { SignUpLink } from "../SignUp";
import { PasswordForgotLink } from "../PasswordForget";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

import { styled } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";

const SignInPage = () => (
  <div>
    <center>
      <h1>SignIn</h1>
      <SignInForm />
      <PasswordForgotLink />
      <SignUpLink />
    </center>
  </div>
);

const INIT_STATE = {
  email: "",
  password: "",
  showPassword: "",
  error: null
};

const SignInButton = styled(Button)({
  background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  margin: "10px",
  width: "150px",
  border: 0,
  borderRadius: 3,
  boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  color: "white",
  height: 48,
  padding: "0 30px"
});

class SignInFormBase extends React.Component {
  constructor(props) {
    super(props);

    this.state = { ...INIT_STATE };
  }

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  onSubmit = event => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INIT_STATE });
        this.props.history.push(ROUTES.HOME);
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
    const { email, password, error } = this.state;

    const isInvalid = password === "" || email === "";

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
        <div>
          <FormControl
            style={{ margin: "10px", width: "250px" }}
            variant='outlined'
          >
            <InputLabel htmlFor='outlined-adornment-password'>
              Password
            </InputLabel>
            <OutlinedInput
              id='outlined-adornment-password'
              name='password'
              type={this.state.showPassword ? "text" : "password"}
              value={this.state.password}
              onChange={this.onChange}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={this.handleClickShowPassword}
                    onMouseDown={this.handleMouseDownPassword}
                    edge='end'
                  >
                    {this.state.showPassword ? (
                      <Visibility />
                    ) : (
                      <VisibilityOff />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
          </FormControl>
        </div>
        <SignInButton
          disabled={isInvalid}
          size='large'
          type='submit'
          variant='contained'
          color='secondary'
        >
          Sign In
        </SignInButton>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignInForm = compose(withRouter, withFirebase)(SignInFormBase);

export default SignInPage;

export { SignInForm };
