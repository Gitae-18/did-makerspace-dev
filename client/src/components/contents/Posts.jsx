import React from "react";
import styled from "styled-components";
export default function Posts({posts,onMove}){

    return(
    <tbody>
         
         {posts.map((item,i)=>(
              <tr key={i}>
              <td>{item.space_no}</td>
              <td><StyledSpan onClick={(e)=>onMove(item)}>{item.space_name}</StyledSpan></td>
              <td><StyledSpan onClick={(e)=>onMove(item)}>{item.space_info}</StyledSpan></td>
              <td><StyledImg alt="no imgae" src="/images/mokgong.png"/></td>
              <td>{item.location}</td>
              <td>월~금(09:00 - 18:00)</td>
              </tr>
            ))}
        </tbody>
    );
}
const StyledSpan = styled.span`
    color:#000;
    cursor:pointer;
    &:hover{
      none;
      text-decoration:none;
      display:always;
      cursor:pointer;
    }
`
 const StyledImg = styled.img`
 width:50px;
 height:50px;
 `