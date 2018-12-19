import React, { PureComponent } from "react";
import ReactPaginate from "react-paginate";
import { Pager } from "react-bootstrap";

class Pagination extends PureComponent {
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
  render() {
    const { firstPage, nextPage, previousPage } = this.state;
    return (
      <Pager>
        <Pager.Item disabled={firstPage.isDisabled}>First page</Pager.Item>
        <Pager.Item disabled={previousPage.isDisabled}>Previous</Pager.Item>
        <Pager.Item disabled={nextPage.isDisabled}>Next</Pager.Item>
      </Pager>
    );
  }
}

export default Pagination;
