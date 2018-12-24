import React, { Component } from "react";
import { connect } from "react-redux";
import { Alert } from "react-bootstrap";
import uuid from "uuid";

import { fetchUsersList } from "../../actions";
import UserLink from "../UserLink";
import Pagination from "../Pagination";
import Spinner from "../LoadingSpinner";
import "./style.css";

interface Props {
  isLoading: boolean;
  hasError: boolean;
  data: any[];
  pages: any;
  fetchUsersList(url: string | null): void;
}

class UsersList extends Component<Props> {
  componentDidMount() {
    this.fetchUsersList(null);
  }

  fetchUsersList(url: string | null) {
    this.props.fetchUsersList(url);
  }

  render() {
    const { pages, isLoading, hasError, data, fetchUsersList } = this.props;

    if (isLoading) {
      return <Spinner />;
    }

    return (
      <div>
        <div className="table-wrapper">
          {hasError && (
            <Alert bsStyle="danger">
              Something went wrong! Your request was not completed
            </Alert>
          )}
          <div className="table-body">
            {data.map(user => (
              <UserLink
                avatar_url={user.avatar_url}
                username={user.login}
                key={uuid()}
              />
            ))}
          </div>
        </div>
        <Pagination
          excludedPages={["last", "prev"]}
          pages={pages}
          handleOnClick={fetchUsersList}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  const { isLoading, pages, data, hasError } = state.usersList;
  return {
    isLoading,
    pages,
    data,
    hasError
  };
};

const mapDispatchToProps = {
  fetchUsersList
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersList);
