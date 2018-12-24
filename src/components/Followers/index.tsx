import React, { memo } from "react";
import uuid from "uuid";

import Paginaton from "../Pagination";
import Spinner from "../LoadingSpinner";
import UserLink from "../UserLink";
import "./style.css";

interface Props {
  followers: {
    data: any[];
    isLoading: boolean;
    hasError: boolean;
    pages: any;
  };
  fetchFollowers(): void;
  isUserDetailsLoading: boolean;
}

const Followers = ({
  followers,
  fetchFollowers,
  isUserDetailsLoading
}: Props) => {
  const { data, isLoading, pages } = followers;
  if (isLoading || isUserDetailsLoading) {
    return <Spinner />;
  }
  return (
    <div className="followers-tab-content">
      {data.map((r: any) => {
        return (
          <UserLink username={r.login} avatar_url={r.avatar_url} key={uuid()} />
        );
      })}
      {pages && <Paginaton handleOnClick={fetchFollowers} pages={pages} />}
    </div>
  );
};

export default memo(Followers);
