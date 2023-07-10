import React, { useCallback, useEffect,useState} from "react";
import {useNavigate/* ,useLocation */} from "react-router-dom"
import { CommonHeader, PreUri, Method } from "../../CommonCode";
import { useSelector /* , useDispatch */} from "react-redux";
import TitleType1 from "../contents/TitleType1";
import ImageHomeNotice from "./ImageHomeNotice";
//import styled from "styled-components";
import { HiOutlinePlus } from "react-icons/hi2";
export default function SectionTabType1(props) {
 const history = useNavigate();
 const [data,setData] = useState([]);
 const [no,setNo] = useState([]);
 const { token } = useSelector(state => state.user);
  const getNotice = useCallback(async()=>{
    let uri = PreUri + '/notice/noticehome'

    const response = await fetch(uri,{
      method:"GET",
      headers:{ "content-type": "application/json",},
    })
    if(!response.ok) {
      console.log('잘못된 접근입니다.');
      return;
    }
    const json = await response.json();
    setData(json);
    setNo(json.map((item,index) => item));
  },[])
  const goToNotice = () =>{
    history('/notice')
  }


  const  onItem = useCallback(async(e,index) =>{
    const hit_cnt = data[index].hit;
    const notice_no = data[index].notice_no;
    //dispatch({ type: M_NOTICE_SET, target: notice_no });
    //조회수 증가
    const response = await fetch(PreUri + '/notice/notice_cnt',{
        method:Method.put,
        headers:CommonHeader,
        body:JSON.stringify(
          {
            hit : hit_cnt,
            notice_no:notice_no,
          }
        )
    })
    if(!response.ok) {
      console.log('잘못된 접근입니다.');
      return;
    }
    history('/notice/notice/detail',{state:{no:notice_no}});
  },[data])
  useEffect(() => {
    /* document.getElementById("tab_btn0").classList.add("on"); */
    getNotice();
  },[getNotice]);
  // 내부 탭 내용 주입
  const Tabs = (props) => {
    return (
      <div className="tabs_wrap">
        <div className="tab_inner on">
          <h3 style={{"color":"black"}}>New 공지사항</h3>
          <div className="inner_tab">
          {data !== undefined && data.length > 0 && data.map((item,index) =>(
            <ol key={index}>
            <li key={index}>
            {item.attached_file==="Y"?<ImageHomeNotice no={item.notice_no} token={token} CommonHeader={CommonHeader}/>:<></>}
            <span className="title"><span onClick={(e)=>onItem(e,index)} className="sub_title" style={{"whiteSpace":"pre-line","wordBreak":"break-word"}}> {item.title}</span></span><HiOutlinePlus className="plus" onClick={goToNotice}/>
            <div className="text_part">
            <div className="date_part">
            <span className="date">{item.created_at.slice(0,10)}</span>
            </div>
            <div className="name">
            <span className="writer">최고관리자</span>
            </div>
            </div>
            </li>
            </ol>
          )
        )}
        </div>
        </div>
      </div>
    );
  };
  // 탭 버튼 세팅
  const SetTabBtns = (props) => {
    const myTabs = props.tabNames;
    const tabHandle = (e) => {
      const tabLi = document.getElementsByClassName("tab_btn");
      const tabInner = document.getElementsByClassName("tab_inner");
      for (let i = 0; i < tabLi.length; i++) {
        const element = tabLi[i];
        const elementInner = tabInner[i];
        elementInner.classList.remove("on");
        element.classList.remove("on");
      }
      tabInner[e.target.id.split("btn")[1]].classList.add("on");
      e.target.classList.add("on");
    };
    const myTabBtns = myTabs.map((x) => (
      <li
        id={"tab_btn" + myTabs.indexOf(x)}
        className="tab_btn"
        key={myTabs.indexOf(x)}
        onClick={tabHandle}
      >
        {x}
      </li>
    ));
    return (
      <div>
        <ol className="tab_btns_wrap">{myTabBtns}</ol>
      </div>
    );
  };

  return (
    <section className="section_tab_type1">
      <div className="section_inner_wrap">
        <TitleType1 title={props.title}></TitleType1>
        <SetTabBtns
          tabNames={[]}
        ></SetTabBtns>
        <Tabs tabNames={["장비 및 시설예약", "시제품 제작", "멘토링"]}></Tabs>
      </div>
    </section>
  );
}
