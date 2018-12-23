import React, { Component, Fragment } from "react";
import classNames from "classnames";

import shadowUser from "../../images/shadow-user.jpg";

interface Props {
  source: string;
  alt: string;
}

class Image extends Component<Props> {
  state = {
    isImageLoading: true
  };

  updateState = () => this.setState({ isImageLoading: false });

  render() {
    const { isImageLoading } = this.state;
    const { source, alt } = this.props;
    const imageClasses = classNames({
      hidden: isImageLoading,
      blurred: isImageLoading
    });
    return (
      <Fragment>
        {isImageLoading && <img src={shadowUser} />}
        <img
          className={imageClasses}
          src={source}
          alt={alt}
          onLoad={this.updateState}
        />
      </Fragment>
    );
  }
}

export default Image;
