import React,{Component} from 'react';
import data1 from "./data1.json"
import "../table.css";


export default function ApplicationData(){
    
    const wordList = data1.filter(word =>(word.day))
    
    

    return(
    <table>
        <thead>
            <tr>
                <th>기간</th>
                <th>서비스 신청<div class="filter2"><span className='filterimg'></span></div></th>
                <th>서비스 상담 후 신청</th>
                <th>비고</th>
            </tr>
        </thead>
        <tbody>
                     {wordList.map((word => (
                    <tr key = {word.id}>
                        <td>{word.period}</td>
                        <td>{word.application}</td>
                        <td>{word.after}</td>
                        <td>{word.note}</td>
                        
                    </tr>
                    
                
                     )))}
                     
                
        </tbody>
    </table>
        
    )
}