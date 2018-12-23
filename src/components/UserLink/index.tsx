import React, { PureComponent, useState } from "react";
import { Link } from "react-router-dom";
import {} from "react-bootstrap";
import classNames from "classnames";

import shadowUser from "../../images/shadow-user.jpg";

interface Props {
  avatar_url: string;
  username: string;
}

class UserLink extends PureComponent<Props> {
  state = {
    isImageLoading: true
  };

  updateState = () => this.setState({ isImageLoading: false });

  render() {
    const { username, avatar_url } = this.props;
    const { isImageLoading } = this.state;
    const linkClasses = classNames("table-row box-shadow", {
      blurred: isImageLoading
    });
    const imageClasses = classNames({ hidden: isImageLoading });

    return (
      <Link to={`/user/${username}`} className={linkClasses}>
        {isImageLoading && <img src={shadowUser} />}
        <img
          className={imageClasses}
          src={avatar_url}
          alt={username}
          onLoad={this.updateState}
        />
        <div className="name">{username}</div>
      </Link>
    );
  }
}

export default UserLink;
