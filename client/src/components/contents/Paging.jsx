import React from "react";
import Pagination from "react-js-pagination";
import '../../css/Paging.css'


export const Paging = ({page,count,setPage}) =>{
    return(
    <>
    <Pagination
    activePage={page}
    itemsCountPerPage={10}
    totalItemsCount={count}
    pageRangeDisplayed={5}
    prevPageText={"<"}
    nextPageText={">"}
    onChange={setPage}
    />
    </>
    )
  } ;
