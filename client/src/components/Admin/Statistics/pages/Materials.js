import React from 'react';
import Sidebar from '../Sidebar';
import "../../../../css/chart/chart-style.css"
import "../../../../css/chart/chart-common.css";
import MaterialItem from './Charts/Materials/object/MateiralItem';
import MaterialMount from './Charts/Materials/MaterialMount';
import MaterialPurchase from './Charts/Materials/MaterialPurchase';
import Equipment from './Charts/Materials/Equipment';


const Materials = ({ location, history }) => {
	//const dispatch = useDispatch();
	/*const onCategory = useCallback((e, index) => {
		dispatch({ type: STASTICS_ANALYZE, target: index });
		// getItemList(1, 0, categoryList[index].no);
		history.push('/materials/items');
	}, [dispatch, /*categoryList, history]);*/

	return (
		<div id="wrap" class="wrap statistics statistics6">

			<div class="content_wrap">
				<Sidebar location={location} history={history} />
				<MaterialItem />
			</div>
		</div>
	);
};
export default Materials
export const Materials1 = ({ location, history }) => {

	return (
		<div id="wrap" className="wrap statistics statistics8">

			<div className="content_wrap">
				<Sidebar location={location} history={history} />
				<div className="content">
					<MaterialPurchase />
				</div>
			</div>
		</div>
	);
};
export const Materials2 = ({ location, history }) => {
	/*const state = {
		data: [
			{ name: "Acrill Red", age: 22, },
			{ name: "Acrill Blue", age: 22, },
			{ name: "Acrill Black", age: 22, },
			{ name: "Acrill Yellow", age: 22, },
			{ name: "Acrill grey", age: 22, },
			{ name: "Acrill pink", age: 22, },
			{ name: "Acrill green", age: 22, },
			{ name: "Acrill purple", age: 22, }],
		keyword: "", results: []
	};
	const matchName = (name, keyword) => {
		var keyLen = keyword.length;
		name = name.toLowerCase().substring(0, keyLen);
		if (keyword === "") return false;
		return name === keyword.toString().toLowerCase();
	};


	let { results, keyword } = state;*/
	return (
		<div id="wrap" class="wrap statistics statistics9">

			<div class="content_wrap">
				<Sidebar location={location} history={history} />
				<MaterialMount />
			</div>
		</div>
	);
};

export const Materials3 = ({ location, history }) => {
	return (
		<div id="wrap" class="wrap statistics statistics10">

			<div class="content_wrap">
				<Sidebar location={location} history={history} />
				<Equipment />
			</div>
		</div>
	);
};
