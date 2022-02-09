import React from "react";
import './Modal.css';

const Modal = ({modalClose}) =>{
    const onCloseModal = (e) =>{
        console.log('e.target: ',e.target)
        console.log('e.tarcurrentTargetget: ', e.currentTarget)
        if(e.target === e.currentTarget){
            modalClose()
        }
    }
    return(
        <div className="modal_container" onClick = {onCloseModal}>
            <div className="modal">
               <img src="../../../images/close.png" alt="no" className="modal_button" onClick={modalClose}/>
            </div>
        </div>
            
    )
}
export default Modal