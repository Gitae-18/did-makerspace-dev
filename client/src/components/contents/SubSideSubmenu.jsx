
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SubSideSubmenu = ({Dep3Handler,isOpened,handleSubNav,item}) =>{
    return(
        <ol className="has_dep3" onClick={handleSubNav}>
        {isOpened && item.submenu && item.submenu.map((item,index) =>{ 
            return(
             <>
             <li value="space"onClick={Dep3Handler}><Link key={index} to={item.path}>{item.title}</Link></li>
             </>
            );
            })}
        </ol>
    )
}
export default SubSideSubmenu;