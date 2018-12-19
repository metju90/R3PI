import React, { PureComponent } from "react";
import ReactPaginate from "react-paginate";
import { Pager } from "react-bootstrap";

interface Props {
  pages: any;
  handleOnClick(url: string): void;
}

class Pagination extends PureComponent<Props> {
  state = {
    firstPage: {
      isDisabled: true
    },
    previousPage: {
      isDisabled: true
    },
    nextPage: {
      isDisabled: false
    }
  };
  handlePageClick = (data: any) => {
    console.log("thd data", data);
  };

  renderPageTab = (pagination: any) => {
    const { handleOnClick } = this.props;
    const { url, rel } = pagination;
    // To fix () => ....
    return (
      <Pager.Item onClick={() => handleOnClick(url)}>
        {rel.charAt(0).toUpperCase() + rel.slice(1)}
      </Pager.Item>
    );
  };
  render() {
    const { firstPage, nextPage, previousPage } = this.state;
    const {
      pages: { next, last, first, prev },
      handleOnClick
    } = this.props;

    return (
      <Pager>
        <Pager.Item
          onClick={() => handleOnClick(first && first.url)}
          disabled={!Boolean(first)}
        >
          First page
        </Pager.Item>
        <Pager.Item
          onClick={() => handleOnClick(prev && prev.url)}
          disabled={!Boolean(prev)}
        >
          Previous
        </Pager.Item>
        <Pager.Item
          onClick={() => handleOnClick(next && next.url)}
          disabled={!Boolean(next)}
        >
          Next
        </Pager.Item>
        <Pager.Item
          onClick={() => handleOnClick(last && last.url)}
          disabled={!Boolean(last)}
        >
          Last Page
        </Pager.Item>
      </Pager>
    );
  }
}

export default Pagination;
