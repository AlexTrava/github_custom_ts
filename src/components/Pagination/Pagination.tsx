import React, { useState } from "react";
import CardRepos from "../CardRepos/CardRepos";
import ReactPaginate from "react-paginate";
import { fetchRepoResponce } from "../../redux/slices/fetchRepoSlice";

export type PaginationProps = {
  repositories: string;
};

const Pagination: React.FC<PaginationProps> = ({ repositories }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const perPage = 4;
  const offset = currentPage * perPage;

  const repoList = repositories
    .slice(offset, offset + perPage)
    .map(({ name, description, html_url, id }:fetchRepoResponce) => {
      return (
        <CardRepos name={name} description={description} url={html_url} key={id} />
      );
    });

  const pageCount = Math.ceil(repositories.length / perPage);

  return (
    <>
      <div className="quantity_repos">{repoList}</div>
      <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </>
  );
};

export default Pagination;
