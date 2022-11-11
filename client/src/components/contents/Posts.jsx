import React from "react";
export default function Posts({info}){
    return(
    <tbody>
         
            {info !== undefined ? info.map((item,i)=>(
              <tr key={i}>
                <td>{item.equipment_category_no}</td>
                <td>{item.location}</td>
                <td>{item.model_name}</td>
                <td>{item.model_sepecification}</td>
                <td>image</td>
                <td>월~금(09:00-18:00)</td>
              </tr>
            )):<div>게시물이 없습니다.</div>}
           
        </tbody>
    );
}