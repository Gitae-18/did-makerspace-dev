import React from "react";
import Pagination from "react-js-pagination";
import '../../css/Paging.css'


export const Paging = ({totalCount,postPerPage,pageRangeDisplayed,handlePageChange,page}) =>{
    return(

    <Pagination
    activePage={page}
    itemsCountPerPage={10}
    totalItemsCount={totalCount}
    pageRangeDisplayed={5}
    prevPageText={"<"}
    nextPageText={">"}
    onChange={handlePageChange}
    />

    )
  } ;
