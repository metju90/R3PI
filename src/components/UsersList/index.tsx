import React, { PureComponent, lazy, Suspense } from "react";
import { connect } from "react-redux";
import debounce from "lodash/debounce";
import { Link } from "react-router-dom";
import { Table, Alert } from "react-bootstrap";

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

class UsersList extends PureComponent<Props> {
  componentDidMount() {
    // this.props.fetchUsersList();
    // invokeAction(this.props.fetchUsersList);
    console.log("mounting!!!! ");
    // this.fetchUsersList = debounce(this.props.fetchUsersList, 1000);
    this.fetchUsersList(null);
  }

  UNSAFE_componentWillReceiveProps(nextProps: any) {
    Object.keys(nextProps)
      .filter(key => {
        //@ts-ignore
        return nextProps[key] !== this.props[key];
      })
      .map(key => {
        console.log(
          "changed property:",
          key,
          "from",
          //@ts-ignore
          this.props[key],
          "to",
          nextProps[key]
        );
      });
  }

  componentWillUnmount() {
    //@ts-ignore
    // this.fetchUsersList.cancel();
  }

  fetchUsersList(url: string | null) {
    this.props.fetchUsersList(url);
  }

  render() {
    const { pages, isLoading, hasError, data, fetchUsersList } = this.props;
    // console.log(">>>!>!>!>!>!>!>>!", data, isLoading);

    if (hasError) {
      return <Alert bsStyle="danger">Something went wrong!</Alert>;
    }

    return (
      <div>
        <div className="table-wrapper">
          <div className="table-body">
            {data.map(user => (
              <UserLink
                isLoading={isLoading}
                avatar_url={user.avatar_url}
                username={user.login}
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
