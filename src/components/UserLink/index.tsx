import React from "react";
import { Link } from "react-router-dom";
import {} from "react-bootstrap";
import classNames from "classnames";

import Image from "../Image";

interface Props {
  avatar_url: string;
  username: string;
}

const UserLink = ({ avatar_url, username }: Props) => (
  <Link to={`/user/${username}`} className={"table-row box-shadow"}>
    <Image alt={username} source={avatar_url} />
    <div className="name">{username}</div>
  </Link>
);

export default UserLink;
