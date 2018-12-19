import React, { Component } from "react";
import { connect } from "react-redux";
import debounce from "lodash/debounce";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import { fetchUsersList } from "../../actions";
import User from "./User";
import "./style.css";
import Pagination from "../Pagination";

interface Props {
  usersList: {
    isLoading: boolean;
    hasError: boolean;
    data: any[];
  };
  pagination: any;
  fetchUsersList(since?: number | null): void;
}

class UsersList extends Component<Props> {
  componentDidMount() {
    // this.props.fetchUsersList();
    // invokeAction(this.props.fetchUsersList);
    console.log("mounting!!!! ");
    this.fetchUsersList = debounce(this.props.fetchUsersList, 1000);
    this.fetchUsersList(null);
  }

  componentWillUnmount() {
    //@ts-ignore
    this.fetchUsersList.cancel();
  }

  fetchUsersList(since: number | null) {
    // this.props.fetchUsersList(since);
  }

  fetchMore = () => {
    let since = null;
    // console.log();
    const lastFetchedUser = this.props.usersList.data.slice(-1)[0];
    if (lastFetchedUser) {
      since = lastFetchedUser.id;
    }

    this.fetchUsersList(since);
  };

  render() {
    // console.log("mmmmhmm!!!   re renderinggg", this.props);
    const { usersList, pagination } = this.props;
    return (
      <div>
        <Link to="/user/metju90">Test</Link>
        <div className="table-wrapper">
          <div className="table-body">
            {usersList.data.map(user => (
              <User avatar_url={user.avatar_url} username={user.login} />
            ))}
          </div>
        </div>
        <Pagination />
        <div
          style={{ height: "100px", width: "100px", background: "red" }}
          onClick={this.fetchMore}
        >
          Fetch more!!!
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  // console.log("<<<< ", state);
  const { usersList, pagination } = state;
  return {
    usersList,
    pagination
  };
};

const mapDispatchToProps = {
  fetchUsersList
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersList);
