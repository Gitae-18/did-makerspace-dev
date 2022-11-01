import React from 'react';
import Sidebar from '../Sidebar';
import "../../../../css/chart/chart-style.css"
import "../../../../css/chart/chart-common.css";
import Userobject from './Charts/Users/Userobject';
import Userservice from './Charts/Users/Userservice';
import UserStastics from "./Charts/Users/Userstastics";
const Users = ({ location, history }) => {
  return (
    <div id="wrap" class="wrap statistics statistics11">

      <div class="content_wrap">
        <Sidebar location={location} history={history} />
        <div class="content">
          <h2>사용자별 통계</h2>
          <div class="graph"><UserStastics /></div>
        </div>
      </div>

    </div>
  );
};

export default Users;

export const Users1 = ({ location, history }) => {
  return (
    <div id="wrap" class="wrap statistics statistics11">

      <div class="content_wrap">
        <Sidebar location={location} history={history} />
        <Userservice />
      </div>

    </div>
  );
}

export const Users2 = ({ location, history }) => {
  return (
    <div id="wrap" class="wrap statistics statistics11">

      <div class="content_wrap">
        <Sidebar location={location} history={history} />
        <div class="content">
          <div class="table">
            <div class="table_btn">
            </div>
          </div>
          <div class="graph"><Userobject /></div>
        </div>
      </div>

    </div>
  );
}