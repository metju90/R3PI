import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { Col, Tabs, Tab } from "react-bootstrap";
import { Link, RouteComponentProps, RouteProps } from "react-router-dom";

import {
  fetchUserDetails,
  resetUserDetails,
  fetchFollowers,
  fetchRepos
} from "../../actions";

import Spinner from "../LoadingSpinner";
import "./style.css";

const PersonDetails = lazy(() => import("../PersonalDetails"));
const Repos = lazy(() => import("../Repos"));
const Followers = lazy(() => import("../Followers"));

interface Props {
  userDetails: any;
  followers: any;
  repos: any;
  fetchUserDetails(username: string): void;
  resetUserDetails(): void;
  fetchRepos(url?: string): void;
  fetchFollowers(url?: string): void;
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
    // The following conditions are to prevent unneccesary re-renders
    if (hash && hash !== "#repositories" && this.availableTabs.includes(hash)) {
      this.setState({ hash });
    }
  }

  componentDidUpdate(prevProps: Props) {
    const { username } = this.props.match.params;
    const { repos_url, followers_url } = this.props.userDetails.data;
    const followers = this.props;

    if (username != prevProps.match.params.username) {
      this.props.fetchUserDetails(username);
      return;
    }

    if (followers_url != prevProps.userDetails.data.followers_url) {
      this.props.fetchFollowers(followers_url);
    }

    if (repos_url != prevProps.userDetails.data.repos_url) {
      this.props.fetchRepos(repos_url);
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
    const {
      followers: followersReducer,
      repos: reposReducer,
      fetchFollowers,
      fetchRepos
    } = this.props;
    const {
      isLoading: isUserDetailsLoading,
      hasError,
      data
    } = this.props.userDetails;
    const {
      name,
      repos_url,
      public_repos,
      followers: followersCount,
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
      organizations_url,
      isUserDetailsLoading
    };
    return (
      <div className="user-details">
        <Col md={12}>
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
            id="tabs-wrapper"
          >
            <Tab
              eventKey={"#repositories"}
              title={`Repositories (${public_repos || 0})`}
            >
              {reposReducer && (
                <Suspense fallback={<Spinner />}>
                  <Repos repos={reposReducer} fetchRepos={fetchRepos} />
                </Suspense>
              )}
            </Tab>
            <Tab
              eventKey={"#followers"}
              title={`Followers (${followersCount || 0})`}
            >
              {followersReducer && (
                <Suspense fallback={<Spinner />}>
                  <Followers
                    isUserDetailsLoading={isUserDetailsLoading}
                    fetchFollowers={fetchFollowers}
                    followers={followersReducer}
                  />
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
  const { userDetails, followers, repos } = state;

  return {
    userDetails,
    followers,
    repos
  };
};

const mapDispatchToProps = {
  fetchUserDetails,
  resetUserDetails,
  fetchFollowers,
  fetchRepos
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserDashboard);
