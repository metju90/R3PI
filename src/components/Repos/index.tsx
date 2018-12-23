import React, { memo } from "react";
import { connect } from "react-redux";
import { distanceInWordsToNow } from "date-fns";
import uuid from "uuid";

import { fetchRepos } from "../../actions";
import Paginaton from "../Pagination";
import Spinner from "../LoadingSpinner";
import Language from "./Language";
import "./style.css";
interface Props {
  fetchRepos(): void;
  repos: {
    data: any[];
    isLoading: boolean;
    hasError: boolean;
    pages: any;
  };
}

const Repos = ({ repos, fetchRepos }: Props) => {
  const { data, isLoading, hasError, pages } = repos;
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
          <div className="repo" key={uuid()}>
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
                  {`Updated ${distanceInWordsToNow(new Date(updated_at))} ago`}
                </div>
              )}
            </div>
          </div>
        );
      })}
      {pages && <Paginaton handleOnClick={fetchRepos} pages={pages} />}
    </div>
  );
};

export default memo(Repos);
