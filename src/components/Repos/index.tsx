import React, { memo } from "react";
import { distanceInWordsToNow } from "date-fns";
import uuid from "uuid";

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
  isUserDetailsLoading: boolean;
}

const Repos = ({ repos, fetchRepos, isUserDetailsLoading }: Props) => {
  const { data, isLoading, pages } = repos;
  if (isLoading || isUserDetailsLoading) {
    return <Spinner />;
  }
  return (
    <div className="repos-tab">
      {data.map((repo: any) => {
        const { language, html_url, name, updated_at, description } = repo;
        return (
          <div className="repo" key={uuid()}>
            <h2>
              <a href={html_url} target="_blank">
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
