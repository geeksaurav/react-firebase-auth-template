import React from "react";
import { withAuthorization } from "../Session";

const HomePage = () => (
  <center>
    <h1>This is Home.</h1>
    <p>The Home Page is accessible by every signed in user.</p>
  </center>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);
