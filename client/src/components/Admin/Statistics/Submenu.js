import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SidebarLink = styled(Link)`
  display: flex;
  color: #fafafa;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  list-style: none;
  height: 30px;
  text-decoration: none;
  font-size: 16px;
  margin-top: 40px;
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

const SubMenu = ({ item, handleSubNav, isOpened }) => {

  return (
    <>

      <SidebarLink to={item} onClick={handleSubNav}>
        <div>
          {item.icon}
          <SidebarLabel>{item.title}</SidebarLabel>
        </div>
        <div>
          {item.submenus && isOpened
            ? item.iconOpened
            : item.submenus
              ? item.iconClosed
              : null}
        </div>
      </SidebarLink>
      {isOpened &&
        item.submenus.map((item, index) => {
          return (
            <DropdownLink to={item.path} key={index}>
              {item.icon}
              <SidebarLabel>{item.title}</SidebarLabel>
            </DropdownLink>
          );
        })}

    </>
  );
}
export default SubMenu;