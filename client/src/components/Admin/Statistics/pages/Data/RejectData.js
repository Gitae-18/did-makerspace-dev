import React,{useState} from 'react';
import data2 from "./data2.json"
import "../table.css";
import Modal from './Modal';


export default function RejectData(){
    const [modalOpen, setModalOpen] = useState(false)
    const modalClose = ()=>{
        setModalOpen(!modalOpen)
    }
    const wordList = data2.filter(word =>(word.day))
    
    

    return(
    <table>
        <thead>
            <tr>
                <th>반려사유</th>
                <th>반려횟수<div class="filter2"><span className='filterimg'></span></div></th>
                <th>비고</th>
            </tr>
        </thead>
        <tbody>
                     {wordList.map((word => (
                    <tr key = {word.id}>
                        <td>{word.reason}</td>
                        <td>{word.application}</td>
                        <td>{word.note}</td>
                        
                    </tr>
                    
                
                     )))}
                     
                
        </tbody>
    </table>
        
    )
}