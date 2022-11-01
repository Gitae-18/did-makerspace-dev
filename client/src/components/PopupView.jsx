import React, { useState } from 'react';

import './PopUpView.css';



function PopUpView(props) {
  const [selCheck, setSelCheck] = useState(false);

  const onClosePopUp = ()=> {    
    // Do nothing yet
  }

  const onCheck = () => {
    setSelCheck(!selCheck);
  }

  return (
    <div className="popup-wrapper">
      <div className="popup-header">
        <h2 className="popup-title">
          Title
        </h2>
      </div>
      <div className="popup-contents">
        <article>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Non laudantium fugit ut explicabo odit suscipit laborum officia reiciendis repudiandae laboriosam? Vel corrupti sequi aut optio quidem, quisquam perspiciatis molestias esse!
        </article>
      </div>
      <button onClick={onCheck}>
        {selCheck
          ? 'Checked'
          : '오늘 하루 열지 않기'
        }
      </button>
      <button onClick={onClosePopUp}>
        X
      </button>
    </div>
  ) 
}

export default PopUpView;