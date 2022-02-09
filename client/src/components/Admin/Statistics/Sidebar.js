import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import '../../../css/sidebar.css';
import { SidebarData } from './SidebarData';
import SubMenu from './Submenu';

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
const SidebarNav = styled.nav`
  background: #f2f2f2;
  float:left;
  width: 140px;
  height:88em;
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

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
    
    <SidebarNav sidebar={sidebar}>
    
      <SidebarWrap>
      <h2 className='a'>통계/분석</h2>
          <NavIcon to='#'>
          <Nav onClick={showSidebar} />
          </NavIcon>
        {SidebarData.map((item, index) => {
          return <SubMenu item={item} key={index}/>;
        })}
      </SidebarWrap>
    </SidebarNav>
    </>
  );
};

export default Sidebar;
