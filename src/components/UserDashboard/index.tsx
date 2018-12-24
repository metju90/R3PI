import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { Col, Tabs, Tab, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

import {
  fetchUserDetails,
  resetUserDetails,
  fetchFollowers,
  fetchRepos,
  resetRepos
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
  match: {
    params: {
      username: string;
    };
  };
  history: any;
  location: any;
  fetchUserDetails(username: string): void;
  resetUserDetails(): void;
  fetchRepos(url?: string): void;
  fetchFollowers(url?: string): void;
  resetRepos(): void;
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
    // Without the following two, when visiting the second user profile,
    // for a very short moment (depending on how fast is your machine)
    // you'd see the previous user data.
    this.props.resetUserDetails();
    this.props.resetRepos();
  }

  handleSelect = (hash: any) => {
    this.props.history.push(hash);
    this.setState({ hash });
  };

  // Used to reset the count in `Repo(n)` and `Followers(n)`
  // When the user data is being fetched.
  getCountIfItsNotLoading = (count: number | null) => {
    const { isLoading } = this.props.userDetails;
    return `(${isLoading ? 0 : count ? count : 0})`;
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
      public_repos,
      followers: followersCount,
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
      organizations_url,
      isUserDetailsLoading
    };

    return (
      <div className="user-details">
        {hasError && (
          <Alert bsStyle="danger">
            Something went wrong! Your request was not completed.
          </Alert>
        )}
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
              title={`Repositories ${this.getCountIfItsNotLoading(
                public_repos
              )}`}
            >
              {reposReducer && (
                <Suspense fallback={<Spinner />}>
                  <Repos
                    isUserDetailsLoading={isUserDetailsLoading}
                    repos={reposReducer}
                    fetchRepos={fetchRepos}
                  />
                </Suspense>
              )}
            </Tab>
            <Tab
              eventKey={"#followers"}
              title={`Followers ${this.getCountIfItsNotLoading(
                followersCount
              )}`}
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
  fetchRepos,
  resetRepos
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserDashboard);
