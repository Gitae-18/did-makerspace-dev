import React from 'react';
import Sidebar from '../Sidebar';
import Slidemenu from "../Slidemenu";
import "../../../../css/chart/chart-style.css";
import "../../../../css/chart/chart-common.css";
import ServiceStatics from "./Charts/Service/ServiceStastics";
import SupportCompany from './Charts/Service/SupportCompany';
import UserApplication from './Charts/Service/UserApplication';
import UserProcess from './Charts/Service/UserProcess';
import UserReject from './Charts/Service/UserReject';

export const StaticsAnalyze = ({ location, history }) => {
	return (
		<div id="wrap" class="wrap statistics statistics2">

			<div class="content_wrap">
				<Sidebar location={location} history={history} />
				<ServiceStatics />
			</div>
		</div>
	);
}
function Service() {

	return (


		<div className="mainpage">
			<div className='wrap-content'>
				<Slidemenu />
			</div>
		</div>

	);
}
export default Service;
export const Service1 = ({ location, history }) => {
	return (
		<div id="wrap" class="wrap statistics statistics3">

			<div class="content_wrap">
				<Sidebar location={location} history={history} />
				<UserApplication />
			</div>
		</div>
	);
}
export const Service2 = ({ location, history }) => {
	return (
		<div id="wrap" class="wrap statistics statistics4">

			<div class="content_wrap">
				<Sidebar location={location} history={history} />
				<UserProcess />
			</div>
		</div>
	);
}
export const Service3 = ({ location, history }) => {
	return (
		<div id="wrap" class="wrap statistics statistics5">

			<div class="content_wrap">
				<Sidebar location={location} history={history} />
				<UserReject />
			</div>
		</div>

	);
}
export const Service4 = ({ location, history }) => {
	return (
		<div id="wrap" class="wrap statistics statistics6">

			<div class="content_wrap">
				<Sidebar location={location} history={history} />
				<SupportCompany />
			</div>
		</div>
	);
}