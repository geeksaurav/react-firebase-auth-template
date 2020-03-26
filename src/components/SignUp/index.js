import React from "react";
import { Link, withRouter } from "react-router-dom";
import { compose } from "recompose";

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

import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

const INIT_STATE = {
  username: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
  showPassword: "",
  error: ""
};

const SignUpButton = styled(Button)({
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

const SignUpPage = () => (
  <center>
    <h1>SignUp</h1>
    <SignUpForm />
  </center>
);

class SignUpFormBase extends React.Component {
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

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = event => {
    event.preventDefault();
    const { username, email, passwordOne } = this.state;
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      // ? Not using this cause db is not cononected
      // .then(authUser => {
      //   // Create a user in your Firebase realtime database
      //   return this.props.firebase.user(authUser.user.uid).set({
      //     username,
      //     email
      //   });
      // })
      .then(authUser => {
        this.setState({ ...INIT_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  render() {
    const { username, email, passwordOne, passwordTwo, error } = this.state;
    const isValid =
      passwordOne !== passwordTwo ||
      passwordOne === "" ||
      email === "" ||
      username === "";

    return (
      <div>
        <form onSubmit={this.onSubmit} style={{ margin: "10px" }}>
          <div>
            <TextField
              name='username'
              label='Full Name'
              value={username}
              variant='outlined'
              onChange={this.onChange}
              style={{ margin: "10px", width: "250px" }}
            />
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
              <InputLabel htmlFor='outlined-adornment-passwordone'>
                Password
              </InputLabel>
              <OutlinedInput
                id='outlined-adornment-passwordone'
                name='passwordOne'
                type={this.state.showPassword ? "text" : "password"}
                value={this.state.passwordOne}
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
            <FormControl
              style={{ margin: "10px", width: "250px" }}
              variant='outlined'
            >
              <InputLabel htmlFor='outlined-adornment-passwordtwo'>
                Confirm Password
              </InputLabel>
              <OutlinedInput
                id='outlined-adornment-passwordtwo'
                name='passwordTwo'
                type={this.state.showPassword ? "text" : "password"}
                value={this.state.passwordTwo}
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
          <div>
            <SignUpButton
              disabled={isValid}
              size='large'
              type='submit'
              variant='contained'
              color='secondary'
            >
              Sign Up
            </SignUpButton>
          </div>
          {error && <p>{error.message}</p>}
        </form>
      </div>
    );
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignUpForm = compose(withRouter, withFirebase)(SignUpFormBase);

export default SignUpPage;

export { SignUpForm, SignUpLink };
