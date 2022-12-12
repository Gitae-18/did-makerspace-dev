import { preventDefault } from "@fullcalendar/react";
import React,{useState,useEffect,useCallback,useMemo} from "react";
import styled from "styled-components";
import $ from 'jquery';
import { element } from "prop-types";
const Pagination = ({onPagePrev,onPageNext,onPage,PageList})=>{
    //const numPages = Math.ceil(totalPosts/limit);
    //const [isButtonOn ,setIsButtonOn] = useState(false);
    //const [currPage,setCurrPage] = useState(page);
    //const [next,setNext] = useState(1);
    //let firstNum = currPage - (currPage % 5) + 0;
    //let lastNum = currPage - (currPage % 5) + 5;
    //if(lastNum>numPages) lastNum = numPages;


  /*   const pageStop = () =>{
    if(currPage=1){
      setIsButtonOn(false)
    }
    if(page>1){
       setIsButtonOn(true);
    }
    }   
    $('.first').addClass('first-page');
 */



    /* {page>0 && currPage > 0?
        <ButtonWrap>
        {currPage <10 && currPage > 0 && firstNum !== 1 && page!==0?
        <Button className="pages"onClick={(e)=>{setPage(page-1);setCurrPage(page-1);}} disabled={page===1? true:false}><span>&lt;</span></Button>: <Button><span>&lt;</span></Button>}
      {Array(5).fill().map((_,i)=>{
        if(i<=3  && currPage > 0 && page > 0 ){
            return(
            <Button
                key={i+1}
                onClick={()=>{setPage(firstNum+1+i);}}
                aria-current = {page === firstNum+1+i ? "page" : null}>
                <span>{firstNum + 1 +i}</span>
            </Button>)}
        else if(i>=2 && currPage > 0 && page > 0 ){
            return(
                <Button
                border="true"
                key={i+1}
                onClick ={()=> setPage(lastNum)}
                aria-current={page === lastNum ? 'page' : null}>
                <span>{lastNum}</span>
                </Button>
            )
        }
         
       
                }
            )
        }
        <Button onClick={()=> {setPage(page+1);setCurrPage(page);}}
        disabled={page===numPages}>
            <span>&gt;</span> 
        </Button>
        
        </ButtonWrap>:<div>내용이 없습니다.</div>} */

   
   // page[0].classList.replace('pages','first-pages');
    return(
      <></>
    )
}
export default Pagination;

const Button = styled.button`

`
const ButtonWrap = styled.div`
`