import React, { Component } from 'react';
import Sidebar from '../Sidebar';
import "../../../../css/common-s.css";
import "../../../../css/style-s.css";
import MaterialItem from './Charts/Materials/MateiralItem';
import MaterialItem2 from './Charts/Materials/MaterialItem2';
import MaterialItem3 from './Charts/Materials/MaterialItem3';
import MaterialMount from './Charts/Materials/MaterialMount';
import MaterialData from './Data/MateiralData';
import SearchBar from './Materials/SearchBar';

  const Materials = () => {
  return (
    <div id="wrap" class="wrap statistics statistics6">
	
    <div class="content_wrap">
      
      <div class="content">
	  <h2>자재 품목현황</h2>
			<div class="graph"><MaterialItem/><MaterialItem2/><MaterialItem3/></div>
			<div class="sheet">
				<div>
					<span>통계 및 분석</span> / <span>기자재/자재통계</span> / <span>자재 품목</span>
					<div class="download">
						<a href="#" class="btn_print">프린트</a>
						<a href="#" class="btn_excel">Excel</a>
					</div>
				</div>
				<div class="table_wrap">
				<table>
					<colgroup>
						<col width="10%"/>
						<col width="15%"/>
						<col width="13%"/>
						<col width="12%"/>
						<col width="11%"/>
						<col width="9%"/>
						<col width="11%"/>
						<col width="9%"/>
						<col width="10%"/>
					</colgroup>
					<thead>
						<tr>
              <th>자재명 <div class="filter2"><span></span></div></th>
						    <th><div class="filter2"><span></span></div></th>
              				<th><div class="filter2"><span></span></div></th>
							<th><div class="filter2"><span></span></div></th>
							<th><div class="filter2"><span></span></div></th>
							<th><div class="filter2"><span></span></div></th>
							<th><div class="filter2"><span></span></div></th>
							<th><div class="filter2"><span></span></div></th>
							<th><div class="filter2"><span></span></div></th>
						</tr>
					</thead>
					<tbody>
						<tr>	
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
					</tbody>
				</table>
				</div>
			</div>
		</div>
	</div>
  </div>
  );
};
export default Materials
export class Materials1 extends Component {
	
	state = {
		data : [
			 {name:"Acrill Red", age:22,  },
			 {name:"Acrill Blue", age:22,  },
			 {name:"Acrill Black", age:22,  },
			 {name:"Acrill Yellow", age:22,  },
			 {name:"Acrill grey", age:22,  },
			 {name:"Acrill pink", age:22,  },
			 {name:"Acrill green", age:22,  },
			 {name:"Acrill purple", age:22, }],
			 keyword : "", results: []
	};
	matchName  = (name,keyword) => {
		var keyLen = keyword.length;
		name = name.toLowerCase().substring(0, keyLen);
		if (keyword === "") return false;
		return name === keyword.toString().toLowerCase();
	};
	onSearch = async text =>{
		let {data} = this.state;
		let results = data.filter(item => true === this.matchName(item.name, text));
		this.setState({results});
	}
	updateField = (field,value,update = true) => {
		if(update) this.onSearch(value);
		this.setState({[field]: value});
	};
	render(){
		let { results , keyword } = this.state;
		return (
		<div id="wrap" className="wrap statistics statistics8">

		<div className="content_wrap">
			
			<div className="content">
				<div className="form">
					<div className="first">
						<div className="float_r">
							<span>자재명<em>*</em></span>
							<SearchBar results = {results} keyword={keyword} updateField={this.updateField}/>
						</div>
					</div>
					<div class="graph">그래프</div>
				<div className="sheet">
					<div>
						<span>통계 및 분석</span> / <span>기자재,자재</span> / <span>자재 구매</span>
						<div className="download">
							<a href="#" className="btn_print">프린트</a>
							<a href="#" className="btn_excel">Excel</a>
						</div>
					</div>
					<div className="table_wrap">
					<table>
						<colgroup>
							<col width="10%"/>
							<col width="15%"/>
							<col width="13%"/>
							<col width="12%"/>
							<col width="11%"/>
							<col width="9%"/>
							<col width="11%"/>
							<col width="9%"/>
							<col width="10%"/>
						</colgroup>
						<thead>
							<tr>
								<th><div className="filter2"><span></span></div></th>
								<th><div className="filter2"><span></span></div></th>
								<th><div className="filter2"><span></span></div></th>
								<th><div className="filter2"><span></span></div></th>
								<th><div className="filter2"><span></span></div></th>
								<th><div className="filter2"><span></span></div></th>
								<th><div className="filter2"><span></span></div></th>
								<th><div className="filter2"><span></span></div></th>
								<th><div className="filter2"><span></span></div></th>
							</tr>
						</thead>
						<tbody>
							<tr>	
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
							<tr>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
							<tr>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
							<tr>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
							<tr>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
							<tr>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
						</tbody>
					</table>
					</div>
				</div>
			</div>
		</div>
	</div>
	</div>
    );}
  };
  export const Materials2 = () => {
    return (
		<div id="wrap" class="wrap statistics statistics9">
	
		<div class="content_wrap">
			
			<div class="content">
			<h2>자재 재고 보유량</h2>
				<div class="graph"><MaterialMount/></div>
				<div class="sheet">
					<div>
						<span>통계 및 분석</span> / <span>기자재,자재</span> / <span>자재별 재고 보유량</span>
						<div class="download">
							<a href="#" class="btn_print">프린트</a>
							<a href="#" class="btn_excel">Excel</a>
						</div>
					</div>
					<div class="table_wrap">
						<MaterialData/>
					</div>
				</div>
			</div>
		</div>
	</div>
    );
  };
  
  export const Materials3 = () => {
    return (
		<div id="wrap" class="wrap statistics statistics10">
	
		<div class="content_wrap">
			
			<div class="content">
				<div class="form">
					<div class="first">
						<div class="float_l">
							<span>관리번호<em>*</em></span>
							<input type="text" placeholder="관리번호를 입력하세요."/>
						</div>
						<div class="float_r">
							<span>등록일</span>
							<div class="filter">
								<p><input type="date"/> <b>~</b> <input type="date"/></p>
							</div>
						</div>
					</div>
					<div class="second">
						<div class="float_l">
							<span>상태<em>*</em></span>
							<select>
								<option disabled selected hidden>전체</option>
								<option>접수</option>
								<option>요청</option>
								<option>고장</option>
								<option>취소</option>
							</select>
						</div>
						<div class="float_r">
							<span>담당 기업<em>*</em></span>
							<select>
								<option disabled selected hidden>전체</option>
								<option></option>
								<option></option>
								<option></option>
								<option></option>
							</select>
						</div>
					</div>
				</div>
				
				<div class="sheet">
					<div>
						<span>통계 및 분석</span> / <span>기자재,자재</span> / <span>자재 품목관리 장비현황</span>
						<div class="download">
							<a href="#" class="btn_print">프린트</a>
							<a href="#" class="btn_excel">Excel</a>
						</div>
					</div>
					<div class="table_wrap">
					<table>
						<colgroup>
							<col width="10%"/>
							<col width="15%"/>
							<col width="13%"/>
							<col width="12%"/>
							<col width="11%"/>
							<col width="9%"/>
							<col width="11%"/>
							<col width="9%"/>
							<col width="10%"/>
						</colgroup>
						<thead>
							<tr>
								<th><div class="filter2"><span></span></div></th>
								<th><div class="filter2"><span></span></div></th>
								<th><div class="filter2"><span></span></div></th>
								<th><div class="filter2"><span></span></div></th>
								<th><div class="filter2"><span></span></div></th>
								<th><div class="filter2"><span></span></div></th>
								<th><div class="filter2"><span></span></div></th>
								<th><div class="filter2"><span></span></div></th>
								<th><div class="filter2"><span></span></div></th>
							</tr>
						</thead>
						<tbody>
							<tr>	
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
							<tr>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
							<tr>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
							<tr>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
							<tr>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
							<tr>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
						</tbody>
					</table>
					</div>
				</div>
			</div>
		</div>
	</div>
   );
 };
