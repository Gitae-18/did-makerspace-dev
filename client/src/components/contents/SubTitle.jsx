import React,{useCallback,useState,useLayoutEffect} from "react";
import { MdHome,MdChevronRight } from "react-icons/md";
import styled from "styled-components";

function SubTitle({title,subtitle}) {

return(
    <div className="location">
        <MdHome className="homeicon"/>
       
        <h3>{subtitle}</h3>
         <MdChevronRight className="arrowicon" style={title.length<4?{"left":"30px"}:{"left":"20px"}}/>
        <h2>{title}</h2>
    </div>
)
}
export default SubTitle;