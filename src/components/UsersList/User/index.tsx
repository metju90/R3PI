import React from "react";
import {} from "react-bootstrap";

interface Props {
  avatar_url: string;
  username: string;
}

const User = ({ avatar_url, username }: Props) => {
  return (
    <div className="table-row box-shadow">
      <img src={avatar_url} />
      <div>{username}</div>
    </div>
  );
};

export default User;
