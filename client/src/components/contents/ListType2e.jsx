import React from "react";
import { useLocation,useNavigate,NavLink } from "react-router-dom";

export default function ListType2e() {
  const location = useLocation();
  const history = useNavigate();
  const onItem = () =>{
    history(location.pathname + '/detail');
  }
  return (
    <div className="table_wrap list_type2 list_type2c">
      <ol>
        <li>
          <div className="image_part" onClick={onItem}>Image</div>
          <div className="text_part">
            <h5 onClick={onItem}>제조 양산의 기초 실리콘 몰드 제작</h5>
            <div className="dl_wrap">
              <dl>
                <dt className="blind">날짜</dt>
                <dd>2022.10.13</dd>
              </dl>
              <dl>
                <dt>조회수</dt>
                <dd>1000</dd>
              </dl>
            </div>
          </div>
        </li>
        <li>
          <div className="image_part" onClick={onItem}>Image</div>
          <div className="text_part">
            <h5 onClick={onItem}>제조 양산의 기초 실리콘 몰드 제작</h5>
            <div className="dl_wrap">
              <dl>
                <dt className="blind">날짜</dt>
                <dd>2022.10.13</dd>
              </dl>
              <dl>
                <dt>조회수</dt>
                <dd>1000</dd>
              </dl>
            </div>
          </div>
        </li>
        <li>
          <div className="image_part" onClick={onItem}>Image</div>
          <div className="text_part">
            <h5 onClick={onItem}>장비 매뉴얼 | 3DWOX 1X | 3D | </h5>
            <div className="dl_wrap">
              <dl>
                <dt className="blind">날짜</dt>
                <dd>2022.10.13</dd>
              </dl>
              <dl>
                <dt>조회수</dt>
                <dd>1000</dd>
              </dl>
            </div>
          </div>
        </li>
        <li>
          <div className="image_part" onClick={onItem}>Image</div>
          <div className="text_part">
            <h5 onClick={onItem}>장비 매뉴얼 | 3DWOX 1X | 3D | </h5>
            <div className="dl_wrap">
              <dl>
                <dt className="blind">날짜</dt>
                <dd>2022.10.13</dd>
              </dl>
              <dl>
                <dt>조회수</dt>
                <dd>1000</dd>
              </dl>
            </div>
          </div>
        </li>
        <li>
          <div className="image_part" onClick={onItem}>Image</div>
          <div className="text_part">
            <h5 onClick={onItem}>장비 매뉴얼 | 3DWOX 1X | 3D | </h5>
            <div className="dl_wrap">
              <dl>
                <dt className="blind">날짜</dt>
                <dd>2022.10.13</dd>
              </dl>
              <dl>
                <dt>조회수</dt>
                <dd>1000</dd>
              </dl>
            </div>
          </div>
        </li>
        <li>
          <div className="image_part" onClick={onItem}>Image</div>
          <div className="text_part">
            <h5 onClick={onItem}>장비 매뉴얼 | 3DWOX 1X | 3D | </h5>
            <div className="dl_wrap">
              <dl>
                <dt className="blind">날짜</dt>
                <dd>2022.10.13</dd>
              </dl>
              <dl>
                <dt>조회수</dt>
                <dd>1000</dd>
              </dl>
            </div>
          </div>
        </li>
      </ol>
      <div className="page_control">
        <div className="btn_first btn-s">
          <img src="/images/backward-solid.svg" alt="처음으로" />
        </div>
        <div className="btn_prev">
          <img src="/images/caret-left-solid.svg" alt="이전으로" />
        </div>
        <ol className="btn_page_num">
          <li className="on">1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
          <li>5</li>
        </ol>
        <div className="btn_next">
          <img src="/images/caret-right-solid.svg" alt="다음으로" />
        </div>
        <div className="btn_last btn-s">
          <img src="/images/forward-solid.svg" alt="끝으로" />
        </div>
      </div>
    </div>
  );
}
