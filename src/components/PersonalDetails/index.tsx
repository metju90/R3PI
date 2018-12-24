import React, { memo } from "react";
import {
  FaBriefcase,
  FaBlogger,
  FaMapMarker,
  FaEnvelope
} from "react-icons/fa";

import Details from "./Details";
import Image from "../Image";
import Spinner from "../LoadingSpinner";

interface Props {
  login: string;
  avatar_url: string;
  name: string;
  isUserDetailsLoading: boolean;
  location?: string;
  company?: string;
  email?: string;
  blog?: string;
  bio?: string;
}
const PersonalDetails = ({
  name,
  login,
  avatar_url,
  company,
  email,
  blog,
  location,
  bio,
  isUserDetailsLoading
}: Props) => {
  if (isUserDetailsLoading) {
    return <Spinner />;
  }
  return (
    <div className={"personal-details"}>
      <Image source={avatar_url} alt={login} />
      <h3>{name}</h3>
      <h4>{login}</h4>
      {bio && <div className="bio">{bio}</div>}
      {company && <Details Icon={FaBriefcase} details={company} />}
      {email && <Details Icon={FaEnvelope} details={email} />}
      {blog && <Details Icon={FaBlogger} details={blog} />}
      {location && <Details Icon={FaMapMarker} details={location} />}
    </div>
  );
};

export default memo(PersonalDetails);
