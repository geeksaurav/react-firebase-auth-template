import React, { Component } from "react";

import { withFirebase } from "../Firebase";

import { styled } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";

const Change = styled(Button)({
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

const INITIAL_STATE = {
  passwordOne: "",
  passwordTwo: "",
  error: null
};

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { passwordOne } = this.state;

    this.props.firebase
      .doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
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
    const { passwordOne, passwordTwo, error } = this.state;

    const isInvalid = passwordOne !== passwordTwo || passwordOne === "";

    return (
      <form onSubmit={this.onSubmit}>
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
          <Change
            disabled={isInvalid}
            size='large'
            type='submit'
            variant='contained'
            color='secondary'
          >
            Change
          </Change>
        </div>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

export default withFirebase(PasswordChangeForm);
