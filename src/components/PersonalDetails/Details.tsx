import React from "react";

interface Props {
  Icon: any;
  details: string;
}

const Details = ({ Icon, details }: Props) => (
  <div className="details">
    <Icon />
    {details}
  </div>
);

export default Details;
