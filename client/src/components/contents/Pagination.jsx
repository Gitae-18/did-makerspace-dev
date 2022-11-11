import { preventDefault } from "@fullcalendar/react";
import React,{useState,useEffect,useCallback,useMemo} from "react";
import styled from "styled-components";
const Pagination = ({page,totalPosts,limit,setPage})=>{
    const numPages = Math.ceil(totalPosts/limit);
    const [currPage,setCurrPage] = useState(page);
    let firstNum = currPage - (currPage % 5) + 0;
    let lastNum = currPage - (currPage % 5) + 5;
    
    if(lastNum>numPages) lastNum = numPages;
    const pageStop = (e) =>{
    if(currPage<1){
        e.preventDefault();
    }
}
    console.log(page);
    console.log(currPage)
    return(
        <nav>
            <div className="pagination">
                {page>0 ?
                <ButtonWrap>
                {currPage <10 && currPage > 0 && firstNum !== 1 && page!==0?
                <Button onClick={()=>{setPage(page-1);setCurrPage(page-1);}} disabled={page<1}><span>&lt;</span></Button>: <Button><span>&lt;</span></Button>}
              {Array(5).fill().map((_,i)=>{
                if(i<=3  && currPage > 0 && page > 0 ){
                    return(
                    <button 
                    key={i+1}
                    onClick={()=>{setPage(firstNum+1+i);}}
                    aria-current = {page === firstNum+1+i ? "page" : null}>
                        <span>{firstNum + 1 +i}</span>
                    </button>
                                )
                            }
                else if(i>=2 && currPage > 0 && page > 0 ){
                    return(
                        <button
                        border="true"
                        key={i+1}
                        onClick ={()=> setPage(lastNum)}
                        aria-current={page === lastNum ? 'page' : null}>
                        <span>{lastNum}</span>
                        </button>
                    )
                }
                 
               
                        }
                    )
                }
                <Button onClick={()=> {setPage(page+1);setCurrPage(page);}}
                disabled={page===numPages}>
                    <span>&gt;</span> 
                </Button>
                
                </ButtonWrap>:<div>내용이 없습니다.</div>}
            </div>
        </nav>
    )
}
export default Pagination;

const Button = styled.button`

`
const ButtonWrap = styled.div`
`