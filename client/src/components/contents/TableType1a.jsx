import React,{useState,useCallback,useRef,useEffect}from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate,useLocation } from 'react-router-dom';
import { CommonHeader,PreUri,Method } from "../../CommonCode";
import ButtonType2 from "./ButtonType2";
import SubSideMenu from "./SubSideMenu";

export default function TableType1a() {
  const { token } = useSelector(state => state.user);
  const [spaceList,setSpaceList] = useState({
    spaceNo:0,
    name:"",
    info:"",
    location:""
  });

  const getSpaceList = useCallback( async() =>{
    const requri = PreUri + '/space/list';
    const response = await fetch(requri,{
      method:Method.get,
      headers:CommonHeader
    });
    
    if (!response.ok) {
      console.log('잘못된 접근입니다.');
      return;
    }
    const json = await response.json();
    setSpaceList(spaceList => ({
      ...spaceList,
      spaceNo:json.space_no,
      name:json.space_name,
      info:json.space_info,
      location:json.location
    }))
  
  },[token])
  console.log(spaceList);
  useEffect(()=>{
    getSpaceList();
  },[getSpaceList]);
  return (
    <>
    <div className="table_wrap table_type1">
      <div className="table_extra">
        <p>
          총 <span>20</span>개의 글
        </p>
        <div className="table_search">
          <select name="" id="">
            <option value="1">공간명</option>
          </select>
          <input type="text" name="" id="" placeholder="제목을 입력하세요" />
          <ButtonType2 btnName="조회"></ButtonType2>
        </div>
      </div>
      <table>
        <caption className="blind">공간소개</caption>
        <thead>
          <tr>
            <th>No</th>
            <th>위치</th>
            <th>공간명</th>
            <th>사진</th>
            <th>공간정보</th>
            <th>이용안내</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>20</td>
            <td>1층</td>
            <td>목공식</td>
            <td>Image</td>
            <td>목재 가공 장비가 위치한 목재 가공실</td>
            <td>월~금(09:00 - 18:00)</td>
          </tr>
          <tr>
            <td>19</td>
            <td>1층</td>
            <td>목공식</td>
            <td>Image</td>
            <td>목재 가공 장비가 위치한 목재 가공실</td>
            <td>월~금(09:00 - 18:00)</td>
          </tr>
          <tr>
            <td>18</td>
            <td>1층</td>
            <td>목공식</td>
            <td>Image</td>
            <td>목재 가공 장비가 위치한 목재 가공실</td>
            <td>월~금(09:00 - 18:00)</td>
          </tr>
          <tr>
            <td>17</td>
            <td>1층</td>
            <td>목공식</td>
            <td>Image</td>
            <td>목재 가공 장비가 위치한 목재 가공실</td>
            <td>월~금(09:00 - 18:00)</td>
          </tr>
          <tr>
            <td>16</td>
            <td>1층</td>
            <td>목공식</td>
            <td>Image</td>
            <td>목재 가공 장비가 위치한 목재 가공실</td>
            <td>월~금(09:00 - 18:00)</td>
          </tr>
          <tr>
            <td>15</td>
            <td>1층</td>
            <td>목공식</td>
            <td>Image</td>
            <td>목재 가공 장비가 위치한 목재 가공실</td>
            <td>월~금(09:00 - 18:00)</td>
          </tr>
          <tr>
            <td>14</td>
            <td>1층</td>
            <td>목공식</td>
            <td>Image</td>
            <td>목재 가공 장비가 위치한 목재 가공실</td>
            <td>월~금(09:00 - 18:00)</td>
          </tr>
          <tr>
            <td>13</td>
            <td>1층</td>
            <td>목공식</td>
            <td>Image</td>
            <td>목재 가공 장비가 위치한 목재 가공실</td>
            <td>월~금(09:00 - 18:00)</td>
          </tr>
          <tr>
            <td>13</td>
            <td>1층</td>
            <td>목공식</td>
            <td>Image</td>
            <td>목재 가공 장비가 위치한 목재 가공실</td>
            <td>월~금(09:00 - 18:00)</td>
          </tr>
          <tr>
            <td>13</td>
            <td>1층</td>
            <td>목공식</td>
            <td>Image</td>
            <td>목재 가공 장비가 위치한 목재 가공실</td>
            <td>월~금(09:00 - 18:00)</td>
          </tr>
          <tr>
            <td>13</td>
            <td>1층</td>
            <td>목공식</td>
            <td>Image</td>
            <td>목재 가공 장비가 위치한 목재 가공실</td>
            <td>월~금(09:00 - 18:00)</td>
          </tr>
          <tr>
            <td>13</td>
            <td>1층</td>
            <td>목공식</td>
            <td>Image</td>
            <td>목재 가공 장비가 위치한 목재 가공실</td>
            <td>월~금(09:00 - 18:00)</td>
          </tr>
          <tr>
            <td>13</td>
            <td>1층</td>
            <td>목공식</td>
            <td>Image</td>
            <td>목재 가공 장비가 위치한 목재 가공실</td>
            <td>월~금(09:00 - 18:00)</td>
          </tr>
          <tr>
            <td>13</td>
            <td>1층</td>
            <td>목공식</td>
            <td>Image</td>
            <td>목재 가공 장비가 위치한 목재 가공실</td>
            <td>월~금(09:00 - 18:00)</td>
          </tr>
          <tr>
            <td>13</td>
            <td>1층</td>
            <td>목공식</td>
            <td>Image</td>
            <td>목재 가공 장비가 위치한 목재 가공실</td>
            <td>월~금(09:00 - 18:00)</td>
          </tr>
          <tr>
            <td>13</td>
            <td>1층</td>
            <td>목공식</td>
            <td>Image</td>
            <td>목재 가공 장비가 위치한 목재 가공실</td>
            <td>월~금(09:00 - 18:00)</td>
          </tr>
          <tr>
            <td>13</td>
            <td>1층</td>
            <td>목공식</td>
            <td>Image</td>
            <td>목재 가공 장비가 위치한 목재 가공실</td>
            <td>월~금(09:00 - 18:00)</td>
          </tr>
          <tr>
            <td>13</td>
            <td>1층</td>
            <td>목공식</td>
            <td>Image</td>
            <td>목재 가공 장비가 위치한 목재 가공실</td>
            <td>월~금(09:00 - 18:00)</td>
          </tr>
          <tr>
            <td>13</td>
            <td>1층</td>
            <td>목공식</td>
            <td>Image</td>
            <td>목재 가공 장비가 위치한 목재 가공실</td>
            <td>월~금(09:00 - 18:00)</td>
          </tr>
          <tr>
            <td>13</td>
            <td>1층</td>
            <td>목공식</td>
            <td>Image</td>
            <td>목재 가공 장비가 위치한 목재 가공실</td>
            <td>월~금(09:00 - 18:00)</td>
          </tr>
          <tr>
            <td>13</td>
            <td>1층</td>
            <td>목공식</td>
            <td>Image</td>
            <td>목재 가공 장비가 위치한 목재 가공실</td>
            <td>월~금(09:00 - 18:00)</td>
          </tr>
          

        </tbody>
      </table>
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
    </>
  );
}
