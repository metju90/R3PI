import React, { PureComponent } from "react";
import ReactPaginate from "react-paginate";
import { Pager } from "react-bootstrap";

interface Props {
  pages: any;
  handleOnClick(url: string): void;
  excludedPages?: Array<string>;
}

class Pagination extends PureComponent<Props> {
  static defaultProps = {
    excludedPages: []
  };

  renderPageTab = (pagination: any) => {
    const { handleOnClick } = this.props;
    const { url, rel } = pagination;
    return (
      <Pager.Item onClick={() => handleOnClick(url)}>
        {rel.charAt(0).toUpperCase() + rel.slice(1)}
      </Pager.Item>
    );
  };
  render() {
    const { pages, handleOnClick, excludedPages } = this.props;
    if (!this.props.pages) return null;
    const { next, last, first, prev } = pages;

    return (
      <Pager>
        {excludedPages && !excludedPages.includes("first") && (
          <Pager.Item
            onClick={() => handleOnClick(first && first.url)}
            disabled={!Boolean(first)}
          >
            First
          </Pager.Item>
        )}
        {excludedPages && !excludedPages.includes("prev") && (
          <Pager.Item
            onClick={() => handleOnClick(prev && prev.url)}
            disabled={!Boolean(prev)}
          >
            Previous
          </Pager.Item>
        )}
        {excludedPages && !excludedPages.includes("next") && (
          <Pager.Item
            onClick={() => handleOnClick(next && next.url)}
            disabled={!Boolean(next)}
          >
            Next
          </Pager.Item>
        )}

        {excludedPages && !excludedPages.includes("last") && (
          <Pager.Item
            onClick={() => handleOnClick(last && last.url)}
            disabled={!Boolean(last)}
          >
            Last
          </Pager.Item>
        )}
      </Pager>
    );
  }
}

export default Pagination;
