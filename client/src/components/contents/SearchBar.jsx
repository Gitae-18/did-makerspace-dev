import React from "react";

export default function SearchBar({onClick,onChange,search}) {
    return(
        <div className="table_search">
          <select name="" id="">
            <option value="1">모델명</option>
          </select>
          <input type="text"  value={search} onChange={onChange} placeholder="제목을 입력하세요" />
          <button className="search_btn" type="button" onClick={onClick}>조회</button>
        </div>
    )
}