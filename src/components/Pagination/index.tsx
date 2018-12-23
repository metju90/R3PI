import React, { PureComponent } from "react";
import ReactPaginate from "react-paginate";
import { Pager } from "react-bootstrap";
import differenceWith from "lodash/differenceWith";
import isEqual from "lodash/isEqual";

interface Props {
  pages: {
    next: any;
    prev: any;
    first: any;
    last: any;
  };
  handleOnClick(url: string): void;
  excludedPages?: Array<string>;
}

const Pagination = ({ pages, handleOnClick, excludedPages }: Props) => {
  const availablePagination = differenceWith(
    ["first", "prev", "next", "last"],
    //@ts-ignore
    excludedPages,
    isEqual
  );
  return (
    <Pager>
      {availablePagination.map((key: string) => {
        const page = (pages as any)[key];
        if (!page) {
          return (
            <Pager.Item disabled={true}>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </Pager.Item>
          );
        }
        const { url, rel } = page;
        return (
          <Pager.Item onClick={() => handleOnClick(url)}>
            {rel.charAt(0).toUpperCase() + rel.slice(1)}
          </Pager.Item>
        );
      })}
    </Pager>
  );
};

export default Pagination;
