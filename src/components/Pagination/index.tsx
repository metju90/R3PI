import React from "react";
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

const upperCaseFirstLetter = (word: string) =>
  word.charAt(0).toUpperCase() + word.slice(1);

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
        const props: any = {
          disabled: page ? false : true,
          key: uuid()
        };
        // dynamically adding `onClick` prop if the page is enabled
        if (page) props.onClick = handleOnClick.bind(null, page.url);
        return (
          <Pager.Item {...props}>
            {upperCaseFirstLetter(page ? page.rel : key)}
          </Pager.Item>
        );
      })}
    </Pager>
  );
};

export default Pagination;
