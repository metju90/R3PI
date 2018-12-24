import React from "react";
import ReactPaginate from "react-paginate";
import { Pager } from "react-bootstrap";
import differenceWith from "lodash/differenceWith";
import isEqual from "lodash/isEqual";
import uuid from "uuid";
interface Props {
  pages: {
    next?: any;
    prev?: any;
    first?: any;
    last?: any;
  };
  handleOnClick(url: string): void;
  excludedPages?: Array<string>;
}

const ALL_PAGES = ["first", "prev", "next", "last"];

const Pagination = ({ pages, handleOnClick, excludedPages }: Props) => {
  const availablePages = differenceWith(
    ALL_PAGES,
    //@ts-ignore
    excludedPages,
    isEqual
  );
  return (
    <Pager>
      {availablePages.map((key: string) => {
        const page = (pages as any)[key];
        if (!page) {
          return (
            <Pager.Item disabled={true} key={uuid()}>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </Pager.Item>
          );
        }
        const { url, rel } = page;
        return (
          <Pager.Item onClick={handleOnClick.bind(null, url)} key={uuid()}>
            {rel.charAt(0).toUpperCase() + rel.slice(1)}
          </Pager.Item>
        );
      })}
    </Pager>
  );
};

export default Pagination;
