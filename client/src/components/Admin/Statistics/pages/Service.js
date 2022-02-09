import { saveAs } from "file-saver";
import fileDownload from 'js-file-download';
import React, { useCallback, useEffect ,useState} from 'react';
import xlsx from "xlsx";
import Sidebar from '../Sidebar';
import styled from 'styled-components';
import "../../../../css/common-s.css";
import "../../../../css/style-s.css";
import "./table.css";
import DatePicker from 'react-datepicker';
import './Datepicker.css';
import axios from "axios";
import ServiceStatics from "./Charts/ServiceStastics";
import SupportCompany from './Charts/SupportCompany';
import UserApplication from './Charts/UserApplication';
import UserProcess from './Charts/UserProcess';
import UserReject from './Charts/UserReject';
import ApplicationData from './Data/AppicationData';
import CompanyData from './Data/CompanyData';
import dummy from './Data/data.json';
import data1 from './Data/data1.json';
import RejectData from './Data/RejectData';
import UserData from './Data/UserData';
import moment from 'moment';
const array = [dummy,data1]
const fileType = "application/vnd.openxmlformats-officedocument .spreadsheetml .sheet;charset = UTF-8";

function Service() {

	return (


		<div id="wrap" class="wrap statistics statistics2">

			<div class="content_wrap">

			
				<ServiceStatics />
			</div>
		</div>

	);
}
export default Service;
export const Service1 = () => {
	return (
		<div id="wrap" class="wrap statistics statistics3">

			<div class="content_wrap">
				<UserApplication />
			</div>
		</div>
	);
}
export const Service2 = () => {
	return (
		<div id="wrap" class="wrap statistics statistics4">

			<div class="content_wrap">
				<UserProcess />
			</div>
		</div>
	);
}
export const Service3 = () => {
	return (
		<div id="wrap" class="wrap statistics statistics5">

			<div class="content_wrap">
				<UserReject />
			</div>
		</div>

	);
}
export const Service4 = () => {
	return (
		<div id="wrap" class="wrap statistics statistics6">

			<div class="content_wrap">
				<SupportCompany />
			</div>
		</div>
	);
}