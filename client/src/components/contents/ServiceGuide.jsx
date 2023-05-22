import React from "react";
import { GoBackBtn } from "./ButtonType2";
export default function MServiceGuide({authority}) {
    return (
      <div className="guide">
         <img src="/images/servicehelp.png" alt="no-image"/>
         <GoBackBtn btnName="시제품제작" authority={authority}/>
      </div>
    );
  };

