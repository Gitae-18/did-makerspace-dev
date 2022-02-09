import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
const innerMenu = styled.div`

`
const SidebarLink = styled(Link)`
  display: flex;
  color: #fafafa;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  height:0px;
  list-style: none;
  text-decoration: none;
  font-size: 16px;
  margin-top: 30px;
  z-index:10;
  width:140px;

  
  &:hover {
    background: #666;
    cursor: pointer;
    
  }
`;

const SidebarLabel = styled.span`
  
`;

const DropdownLink = styled(Link)`
  background: #fff;
  height: 40px;
  padding-left: 2rem;
  display: fixed;
  align-items: center;
  text-decoration: none;
  color: #000;
  font-size: 14px;
  padding-right:20px;
  &:hover {
    background: #f5f5f5;
    cursor: pointer;
    border-left: 4px solid #632ce4;
  }
`;

const SubMenu = ({ item }) => {
  const [subnav, setSubnav] = useState(false);

  const showSubnav = () => setSubnav(!subnav);

  return (
    <>
      <innerMenu>
      <SidebarLink to={item} onClick={item.subNav && showSubnav}>
        <div>
          {item.icon}
          {item.title}
        </div>
        <div>
          {item.subNav && subnav
            ? item.iconOpened
            : item.subNav
            ? item.iconClosed
            : item.subNav}
        </div>
      </SidebarLink>
      {subnav &&
        item.subNav.map((item, index) => {
          return (
            <DropdownLink to={item.path} key={index}>
              {item.icon}
              <SidebarLabel>{item.title}</SidebarLabel>
            </DropdownLink>
          );
        })}
        </innerMenu>
    </>
  );
};

export default SubMenu;
