import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { distanceInWordsToNow } from "date-fns";
import { fetchRepos } from "../../actions";
import Paginaton from "../Pagination";
import Spinner from "../LoadingSpinner";
import Language from "./Language";
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
        {data.map((repo: any) => {
          const {
            language,
            homepage,
            name,
            updated_at,
            description,
            forks
          } = repo;
          return (
            <div className="repo">
              <h2>
                <a href={homepage} target="_blank">
                  {name}
                </a>
              </h2>
              {description && <h4 className="description">{description}</h4>}
              <div className="information">
                {language && <Language language={language} />}
                {updated_at && (
                  <div className="last-updated">
                    {`Updated ${distanceInWordsToNow(new Date(updated_at))}`}
                  </div>
                )}
              </div>
            </div>
          );
        })}
        {pages && (
          <Paginaton handleOnClick={this.props.fetchRepos} pages={pages} />
        )}
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
