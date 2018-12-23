import React, { memo } from "react";
import { Link } from "react-router-dom";
import {} from "react-bootstrap";
import classNames from "classnames";
import { LazyImage } from "react-lazy-images";

interface Props {
  avatar_url: string;
  username: string;
  isLoading?: boolean;
}

const User = ({ avatar_url, username, isLoading }: Props) => {
  const classes = classNames("table-row box-shadow", { blurred: isLoading });
  const source = isLoading
    ? "https://image.freepik.com/free-icon/male-profile-user-shadow_318-40244.jpg"
    : avatar_url;
  console.log("is re reinderinng!?!?!?!? ");
  return (
    /**
     * Check how lazt image works!!!
     */
    <Link to={`/user/${username}`} className={classes}>
      <img src={source} alt={username} />
      <div>{isLoading ? "..." : username}</div>
    </Link>
  );
};

export default memo(User);
