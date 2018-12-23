import React, { PureComponent } from "react";
import { connect } from "react-redux";

import { fetchRepos } from "../../actions";
import Paginaton from "../Pagination";
import Spinner from "../LoadingSpinner";
import "./style.css";

interface Props {
  url: string;
  fetchRepos(url: string): void;
  data: any[];
  isLoading: boolean;
  hasError: boolean;
  pages: any;
}

class Repos extends PureComponent<Props> {
  componentDidMount() {
    this.props.fetchRepos(this.props.url);
  }

  render() {
    const { data, isLoading, hasError, pages } = this.props;
    if (isLoading) {
      return <Spinner />;
    }
    return (
      <div className="repos-tab">
        {data.map((r: any) => {
          return (
            <div className="repo">
              <h2>{r.name}</h2>
              <a href={r.url} target="_blank">
                {r.url}
              </a>
            </div>
          );
        })}
        <Paginaton handleOnClick={this.props.fetchRepos} pages={pages} />
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  const {
    repos: { pages, data, isLoading, hasError }
  } = state;
  return {
    pages,
    data,
    isLoading,
    hasError
  };
};

const mapDispatchToProps = {
  fetchRepos
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Repos);
