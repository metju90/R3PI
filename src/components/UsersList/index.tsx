import React, { Component } from "react";
import { connect } from "react-redux";
import debounce from "lodash/debounce";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { Table, Alert } from "react-bootstrap";
import { fetchUsersList } from "../../actions";
import User from "./User";
import "./style.css";
import Pagination from "../Pagination";

interface Props {
  isLoading: boolean;
  hasError: boolean;
  data: any[];
  pages: any;
  fetchUsersList(url: string | null): void;
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

  fetchUsersList(url: string | null) {
    this.props.fetchUsersList(url);
  }

  render() {
    // console.log("mmmmhmm!!!   re renderinggg", this.props);
    const { pages, isLoading, hasError, data, fetchUsersList } = this.props;
    if (hasError) {
      return <Alert bsStyle="danger">Something went wrong!</Alert>;
    }
    return (
      <div>
        {isLoading && <ClipLoader />}
        <div className="table-wrapper">
          <div className="table-body">
            {data.map(user => (
              <User avatar_url={user.avatar_url} username={user.login} />
            ))}
          </div>
        </div>
        <Pagination
          excludedPages={["prev", "last"]}
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
