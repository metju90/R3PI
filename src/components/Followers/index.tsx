import React, { PureComponent } from "react";
import { connect } from "react-redux";

import { fetchFollowers } from "../../actions";
import Paginaton from "../Pagination";
import Spinner from "../LoadingSpinner";
import UserLink from "../UserLink";
import "./style.css";

interface Props {
  url: string;
  fetchFollowers(url: string): void;
  data: any[];
  isLoading: boolean;
  hasError: boolean;
  pages: any;
}

class Followers extends PureComponent<Props> {
  componentDidMount() {
    this.props.fetchFollowers(this.props.url);
  }

  componentDidUpdate(prevProps: Props) {
    const { url } = this.props;
    if (url != prevProps.url) {
      this.props.fetchFollowers(url);
    }
  }

  render() {
    console.log("is follwoers rerendering?");
    const { data, isLoading, hasError, pages } = this.props;

    return (
      <div className="followers-tab-content">
        {data.map((r: any) => {
          return (
            <UserLink
              isLoading={isLoading}
              username={r.login}
              avatar_url={r.avatar_url}
            />
          );
        })}
        {pages && (
          <Paginaton handleOnClick={this.props.fetchFollowers} pages={pages} />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  const {
    followers: { pages, data, isLoading, hasError }
  } = state;
  return {
    pages,
    data,
    isLoading,
    hasError
  };
};

const mapDispatchToProps = {
  fetchFollowers
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Followers);
