import React from "react";

import ReactPaginate from "react-paginate";
function Pagination({ page, location, pageCount, pageSize }) {
  const totalPages = Math.ceil(pageCount / pageSize);
  const handlePageClick = (data) => {
    window.location.href = `${location.pathname}?page=${data.selected + 1}`;
  };
  return (
    <>
      <ReactPaginate
        previousLabel="previous"
        nextLabel="next"
        breakLabel={false}
        pageCount={totalPages}
        marginPagesDisplayed={false}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        renderOnZeroPageCount={null}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
        forcePage={page - 1}
        pageSize={15}
      />
    </>
  );
}

export default Pagination;
