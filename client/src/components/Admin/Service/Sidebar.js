import React, { useState, useLayoutEffect } from 'react';
import { useLocation } from "react-router";
import styled from 'styled-components';
import '../../../css/sidebar/sidebar.css'
import { ServiceData } from './ServiceData';
import SubMenu from './Submenu';

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);
  const [isServiced, setIsServiced] = useState(false);
  const [isMaterial, setIsMaterial] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const url = useLocation();

  const showSidebar = () => setSidebar(!sidebar);

  const openList = (value, title) => {
    if (title === 'service') {
      if (value === true) setIsServiced(false);
      else {
        setIsServiced(true);
        setIsMaterial(false);
        setIsUser(false);
      }
    } else if (title === 'material') {
      if (value === true) setIsMaterial(false);
      else {
        setIsServiced(false);
        setIsMaterial(true);
        setIsUser(false);
      }
    } else if (title === 'user') {
      if (value === true) setIsUser(false);
      else {
        setIsServiced(false);
        setIsMaterial(false);
        setIsUser(true);
      }
    }
  }

  useLayoutEffect(() => {
    if (url.pathname.split('/')[1] === 'service') {
      setIsServiced(true);
    }
    if (url.pathname.split('/')[1] === 'materials') {
      setIsMaterial(true);
    }
    if (url.pathname.split('/')[1] === 'users') {
      setIsUser(true);
    }
  }, [url.pathname]);

  return (

    <div className='sidemenu'>
      <SidebarNav className="sidebar" sidebar={sidebar}>
        <SidebarWrap>
          <Nav onClick={showSidebar} />
          {
            <>
              <SubMenu item={ServiceData[0]}
                key={ServiceData[0].title}
                handleSubNav={() => openList(isServiced, 'service')}
                isOpened={isServiced && !isMaterial && !isUser}
              />
            </>
          }
        </SidebarWrap>
      </SidebarNav>
    </div>
  );
};
const SidebarNav = styled.nav`
  float:left;
  width: 130px;
  height:100%;
  min-height:100%;
  display: flex;
  position: sticky;
  transition: 350ms;
  z-index: 10;
  box-sizing:border-box;
  background-color:#fff;
  order:1;
  
`;
const Nav = styled.nav`

`
const SidebarWrap = styled.div`
border-right: 1px solid #313f4f;
`;

export default Sidebar;
