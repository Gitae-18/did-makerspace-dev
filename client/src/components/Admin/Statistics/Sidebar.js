import React, { useState, useLayoutEffect } from 'react';
import { useLocation } from "react-router";
import styled from 'styled-components';
import '../../../css/sidebar/sidebar.css'
import { SidebarData } from './SidebarData';
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
      <SidebarNav className="sidebar" sidebar={!sidebar}>
        <SidebarWrap>
          <h2 className='a'>통계/분석</h2>
          <Nav onClick={showSidebar} />
          {
            <>
              <SubMenu item={SidebarData[0]}
                key={SidebarData[0].title}
                handleSubNav={() => openList(isServiced, 'service')}
                isOpened={isServiced && !isMaterial && !isUser}
              />
              <SubMenu item={SidebarData[1]}
                key={SidebarData[1].title}
                handleSubNav={() => openList(isMaterial, 'material')}
                isOpened={isMaterial && !isServiced && !isUser}
              />
              <SubMenu item={SidebarData[2]}
                key={SidebarData[2].title}
                handleSubNav={() => openList(isUser, 'user')}
                isOpened={isUser && !isServiced && !isMaterial}
              />
            </>
          }
        </SidebarWrap>
      </SidebarNav>
    </div>
  );
};

const SidebarNav = styled.nav`
  background: #f2f2f2;
  float:left;
  width: 140px;
  height:100%;
  min-height:100%;
  display: flex;
  position: sticky;
  transition: 350ms;
  z-index: 10;
  box-sizing:border-box;
  order:1;
`;
const Nav = styled.nav`
background:#fafafa;


`
const SidebarWrap = styled.div`
 
`;

export default Sidebar;
