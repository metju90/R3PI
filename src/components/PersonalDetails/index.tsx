import React from "react";
import {
  FaBriefcase,
  FaBlogger,
  FaMapMarker,
  FaEnvelope
} from "react-icons/fa";

import Details from "./Details";

interface Props {
  login: string;
  avatar_url: string;
  name?: string;
  location?: string;
  company?: string;
  email?: string;
  blog?: string;
  bio?: string;
  organizations_url?: string;
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
  organizations_url
}: Props) => {
  return (
    <div>
      <img alt={name} src={avatar_url} />
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

export default PersonalDetails;
