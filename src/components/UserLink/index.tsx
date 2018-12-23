import React, { memo } from "react";
import { Link } from "react-router-dom";
import {} from "react-bootstrap";
import classNames from "classnames";

import shadowUser from "../../images/shadow-user.jpg";

interface Props {
  avatar_url: string;
  username: string;
  isLoading?: boolean;
}

const UserLink = ({ avatar_url, username, isLoading }: Props) => {
  const classes = classNames("table-row box-shadow", { blurred: isLoading });
  const source = isLoading ? shadowUser : avatar_url;
  const alt = isLoading ? "" : username;
  return (
    <Link to={`/user/${username}`} className={classes}>
      <img src={source} alt={alt} />
      <div>{isLoading ? "..." : username}</div>
    </Link>
  );
};

export default memo(UserLink);
