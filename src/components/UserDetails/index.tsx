import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { Col, Tabs, Tab } from "react-bootstrap";
import { Link, RouteComponentProps, RouteProps } from "react-router-dom";

import { fetchUserDetails, resetUserDetails } from "../../actions";

import Spinner from "../LoadingSpinner";
import "./style.css";

const PersonDetails = lazy(() => import("../PersonalDetails"));
const Repos = lazy(() => import("../Repos"));
const Followers = lazy(() => import("../Followers"));

interface Props {
  userDetails: any;
  fetchUserDetails(username: string): void;
  resetUserDetails(): void;
  match: {
    params: {
      username: string;
    };
  };
}

class UserDetails extends Component<Props> {
  state = {
    key: 1
  };
  componentDidMount() {
    const { username } = this.props.match.params;
    this.props.fetchUserDetails(username);
  }

  componentWillUnmount() {
    this.props.resetUserDetails();
  }

  handleSelect = (key: any) => {
    this.setState({ key });
  };

  render() {
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
      organizations_url,
      followers_url
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
        {/* {isLoading && <Spinner />} */}
        <Col xs={12}>
          <div className="back-button-wrapper">
            <Link to="/">Home</Link>
          </div>
        </Col>
        <Col xs={12} md={3}>
          <Suspense fallback={<Spinner />}>
            <PersonDetails {...personalData} />
          </Suspense>
        </Col>
        <Col xs={12} md={9}>
          <Tabs
            activeKey={this.state.key}
            onSelect={this.handleSelect}
            id="controlled-tab-example"
          >
            <Tab eventKey={1} title={`Repositries (${public_repos || 0})`}>
              {repos_url && (
                <Suspense fallback={"zzz......a.a.a."}>
                  <Repos url={repos_url} />
                </Suspense>
              )}
            </Tab>
            <Tab eventKey={2} title={`Followers (${followers || 0})`}>
              {followers_url && (
                <Suspense fallback={"grr suspense followers"}>
                  <Followers url={followers_url} />
                </Suspense>
              )}
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
  fetchUserDetails,
  resetUserDetails
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserDetails);
