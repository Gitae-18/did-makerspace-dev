import React from "react";
import { Outlet } from "react-router";
import ButtonType1 from "./ButtonType1";
import TitleType1 from "./TitleType1";
export default function ListType1a() {
  return (
    <div className="list_type1">
      <TitleType1 title="목공실"></TitleType1>
      <ol>
        <li>
          <div className="image_part">Image</div>
          <div className="text_part">
            <h5>장비</h5>
            <p>Felder - KF500</p>
          </div>
        </li>
        <li>
          <div className="image_part">Image</div>
          <div className="text_part">
            <h5>장비</h5>
            <p>Felder - KF500</p>
          </div>
        </li>
        <li>
          <div className="image_part">Image</div>
          <div className="text_part">
            <h5>장비</h5>
            <p>Felder - KF500</p>
          </div>
        </li>
      </ol>
      <ButtonType1 btnName="목록"></ButtonType1>
      <Outlet/>
    </div>
  );
}
