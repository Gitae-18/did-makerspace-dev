import React from "react";
import './css/SearchBar.css';


const SearchBar = ({ results,keyword,updateField} ) => {
    const updateText = (text) =>{
       updateField("keyword",text,false);
	   updateField("results",[]);
    }
const cancelSearch = () =>{
    updateField("keyword","");
};
const renderResults = results.map(({ position,name,age}, index)=>{
    return (
    <SearchPreveiw 
        key = {index}
        updateText={updateText}
        index={index}
        position = {position}
        name={name}
        age = {age}/>
    );
});
return(
    <div className="auto">
       <div className="cancel"><button onClick={() => cancelSearch()} className={`cancel-btn ${keyword.length > 0? "active":"inactive"}`}>x</button></div>
        <input className="search-bar" 
        placeholder="자재명을 입력하세요" 
        value={keyword} 
        onChange={e=> updateField("keyword",e.target.value)}
        />
        {results.length > 0? (
            <div className="search-results">{renderResults}</div>) : null}
    </div>
    );
};
const SearchPreveiw = ({age,name,position,index,updateText}) => {
    return(
        <div onClick={() => updateText(name)} 
        className={`search-preview ${index === 0 ? 'start' : ""}`}>
            <div className="first">
               <span className="name">{name}</span>
               <span className="sub-header">{position}</span>
            </div>
        </div>
    );
};   
export default SearchBar;