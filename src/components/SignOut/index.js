import React from "react";
import { withFirebase } from "../Firebase";

const SignOutButton = ({ firebase }) => (
  <button onClick={() => firebase.doSignOut()} className='signout'>
    Sign Out
  </button>
);

export default withFirebase(SignOutButton);
