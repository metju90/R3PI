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
  history: any;
  location: any;
}

class UserDashboard extends Component<Props> {
  availableTabs = ["#repositories", "#followers"];
  state = {
    hash: "#repositories"
  };

  componentDidMount() {
    const { username } = this.props.match.params;
    const { hash } = this.props.location;
    this.props.fetchUserDetails(username);
    // `repositories` is shown by default.
    // The following is to prevent unneccesary re-renders
    if (hash && hash !== "#repositories" && this.availableTabs.includes(hash)) {
      this.setState({ hash });
    }
  }

  componentDidUpdate(prevProps: Props) {
    const { username } = this.props.match.params;
    if (username != prevProps.match.params.username) {
      this.props.fetchUserDetails(username);
    }
  }

  componentWillUnmount() {
    this.props.resetUserDetails();
  }

  handleSelect = (hash: any) => {
    this.props.history.push(hash);
    this.setState({ hash });
  };

  render() {
    console.log("propss ", this.props);
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
        <Col xs={12}>
          <div className="back-button-wrapper">
            <Link to="/">Go back</Link>
          </div>
        </Col>
        <Col xs={12} md={3}>
          <Suspense fallback={<Spinner />}>
            <PersonDetails {...personalData} />
          </Suspense>
        </Col>
        <Col xs={12} md={9}>
          <Tabs
            activeKey={this.state.hash}
            onSelect={this.handleSelect}
            id="controlled-tab-example"
          >
            <Tab
              eventKey={"#repositories"}
              title={`Repositories (${public_repos || 0})`}
            >
              {repos_url && (
                <Suspense fallback={<Spinner />}>
                  <Repos url={repos_url} />
                </Suspense>
              )}
            </Tab>
            <Tab
              eventKey={"#followers"}
              title={`Followers (${followers || 0})`}
            >
              {followers_url && (
                <Suspense fallback={<Spinner />}>
                  <Followers url={followers_url} />
                </Suspense>
              )}
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
)(UserDashboard);
