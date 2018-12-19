import React, { Component } from "react";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";

class UserDetails extends Component {
  componentDidMount() {}

  componentWillMount() {}

  render() {
    return (
      <div>
        <Link to="/">Home</Link>
        <div>!!user details</div>
      </div>
    );
  }
}

export default UserDetails;
