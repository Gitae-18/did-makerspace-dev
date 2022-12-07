import React from "react";
import { useLocation,useNavigate } from "react-router-dom";
export default function ListType2a() {
  const location = useLocation();
  const history = useNavigate();
  const onItem = () =>{
    history(location.pathname + '/detail');
  }
  return (
    <div className="table_wrap list_type2">
      <ol>
        <li>
          <div className="image_part">Image</div>
          <div className="text_part">
            <h5 onClick={onItem}>Live 메이커들</h5>
            <div className="tag">
              <span>무료</span>
            </div>
            <dl>
              <dt>교육</dt>
              <dd>12.13</dd>
            </dl>
            <dl>
              <dt>조회수</dt>
              <dd>1000</dd>
            </dl>
            <dl>
              <dt>마감</dt>
              <dd>12.7 화</dd>
            </dl>
          </div>
        </li>
        <li>
          <div className="image_part">Image</div>
          <div className="text_part">
            <h5 onClick={onItem}>Live 메이커들</h5>
            <div className="tag">
              <span>무료</span>
            </div>
            <dl>
              <dt>교육</dt>
              <dd>12.13</dd>
            </dl>
            <dl>
              <dt>조회수</dt>
              <dd>1000</dd>
            </dl>
            <dl>
              <dt>마감</dt>
              <dd>12.7 화</dd>
            </dl>
          </div>
        </li>
        <li>
          <div className="image_part">Image</div>
          <div className="text_part">
            <h5 onClick={onItem}>Live 메이커들</h5>
            <div className="tag">
              <span>무료</span>
            </div>
            <dl>
              <dt>교육</dt>
              <dd>12.13</dd>
            </dl>
            <dl>
              <dt>조회수</dt>
              <dd>1000</dd>
            </dl>
            <dl>
              <dt>마감</dt>
              <dd>12.7 화</dd>
            </dl>
          </div>
        </li>
        <li>
          <div className="image_part">Image</div>
          <div className="text_part">
            <h5 onClick={onItem}>Live 메이커들</h5>
            <div className="tag">
              <span>무료</span>
            </div>
            <dl>
              <dt>교육</dt>
              <dd>12.13</dd>
            </dl>
            <dl>
              <dt>조회수</dt>
              <dd>1000</dd>
            </dl>
            <dl>
              <dt>마감</dt>
              <dd>12.7 화</dd>
            </dl>
          </div>
        </li>
        <li>
          <div className="image_part">Image</div>
          <div className="text_part">
            <h5 onClick={onItem}>Live 메이커들</h5>
            <div className="tag">
              <span>무료</span>
            </div>
            <dl>
              <dt>교육</dt>
              <dd>12.13</dd>
            </dl>
            <dl>
              <dt>조회수</dt>
              <dd>1000</dd>
            </dl>
            <dl>
              <dt>마감</dt>
              <dd>12.7 화</dd>
            </dl>
          </div>
        </li>
        <li>
          <div className="image_part">Image</div>
          <div className="text_part">
            <h5 onClick={onItem}>Live 메이커들</h5>
            <div className="tag">
              <span>무료</span>
            </div>
            <dl>
              <dt>교육</dt>
              <dd>12.13</dd>
            </dl>
            <dl>
              <dt>조회수</dt>
              <dd>1000</dd>
            </dl>
            <dl>
              <dt>마감</dt>
              <dd>12.7 화</dd>
            </dl>
          </div>
        </li>
        <li>
          <div className="image_part">Image</div>
          <div className="text_part">
            <h5 onClick={onItem}>Live 메이커들</h5>
            <div className="tag">
              <span>무료</span>
            </div>
            <dl>
              <dt>교육</dt>
              <dd>12.13</dd>
            </dl>
            <dl>
              <dt>조회수</dt>
              <dd>1000</dd>
            </dl>
            <dl>
              <dt>마감</dt>
              <dd>12.7 화</dd>
            </dl>
          </div>
        </li>
        <li>
          <div className="image_part">Image</div>
          <div className="text_part">
            <h5 onClick={onItem}>Live 메이커들</h5>
            <div className="tag">
              <span>무료</span>
            </div>
            <dl>
              <dt>교육</dt>
              <dd>12.13</dd>
            </dl>
            <dl>
              <dt>조회수</dt>
              <dd>1000</dd>
            </dl>
            <dl>
              <dt>마감</dt>
              <dd>12.7 화</dd>
            </dl>
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
