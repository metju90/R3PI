import React, { Component } from "react";
import { connect } from "react-redux";
import { Col, Tabs, Tab } from "react-bootstrap";
import { Link, RouteComponentProps, RouteProps } from "react-router-dom";
import { ClipLoader } from "react-spinners";

import { fetchUserDetails } from "../../actions";
import PersonDetails from "../PersonalDetails";
import Repos from "../Repos";
import "./style.css";

interface Props {
  userDetails: any;
  fetchUserDetails(username: string): void;
  match: {
    params: {
      username: string;
    };
  };
}

class UserDetails extends Component<Props> {
  state = {
    key: 0
  };
  componentDidMount() {
    console.log("....", this.props.match.params);
    const { username } = this.props.match.params;
    this.props.fetchUserDetails(username);
  }

  handleSelect = (key: any) => {
    this.setState({ key });
  };

  render() {
    // console.log("the props", this.props);
    const { isLoading, hasError, data } = this.props.userDetails;
    const {
      name,
      repos_url,
      public_repos,
      followers,
      avatar_url,
      login,
      bio,
      company,
      blog,
      location,
      email,
      organizations_url
    } = data;
    const personalData = {
      blog,
      email,
      company,
      location,
      name,
      avatar_url,
      login,
      bio,
      organizations_url
    };
    return (
      <div className="user-details">
        <Col xs={12}>
          <div className="back-button-wrapper">
            <Link to="/">Home</Link>
          </div>
        </Col>
        <Col xs={12} md={3}>
          {isLoading && <ClipLoader />}
          <PersonDetails {...personalData} />
        </Col>
        <Col xs={12} md={9}>
          <Tabs
            activeKey={this.state.key}
            onSelect={this.handleSelect}
            id="controlled-tab-example"
          >
            <Tab eventKey={1} title={`Repositries (${public_repos})`}>
              {repos_url && <Repos url={repos_url} />}
            </Tab>
            <Tab eventKey={2} title={`Followers (${followers})`}>
              Tab 2 content
            </Tab>
            <Tab eventKey={3} title={`Subscriptions`}>
              Tab 3 content
            </Tab>
          </Tabs>
        </Col>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  const { userDetails } = state;
  return {
    userDetails
  };
};

const mapDispatchToProps = {
  fetchUserDetails
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserDetails);
