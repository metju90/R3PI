import React from "react";
import { Link } from "react-router-dom";
import {} from "react-bootstrap";

interface Props {
  avatar_url: string;
  username: string;
}

const User = ({ avatar_url, username }: Props) => {
  return (
    <Link to={`/user/${username}`} className="table-row box-shadow">
      <img src={avatar_url} />
      <div>{username}</div>
    </Link>
  );
};

export default User;
