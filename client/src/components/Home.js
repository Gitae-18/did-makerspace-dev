import React,{useState,useEffect, useCallback}from 'react'
import $ from 'jquery';
import {withCookies,Cookies,ReactCookieProps} from 'react-cookie';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import moment from 'moment';
import Modal from './Modal'
import '../css/common-s.css';
import '../css/style-s.css';
import SectionBannerType1 from "../components/sections/SectionBannerType1";
import SectionTabType1 from "../components/sections/SectionTabType1";
import SectionTextType1 from "../components/sections/SectionTextType1";
import { NoticeHomeContainer } from '../containers/notice/NoticeHomeContainer';
import "../css/comb/pages/page.css";
import "../css/comb/contents/content.css";
import "../css/comb/sections/sections.css";

export default function () {
  const { token } = useSelector(state => state.user); 
  const {isLoggedIn} = useSelector(state => state.user);
    $(document).ready(function () {
        $('.content_wrap').css('min-height', $(window).height() - 120);
        setTimeout(function(){ $('#modal').show();},300)
        $('#modal').click(function(){
        $("#modal").fadeOut();
        $(window).resize(function () {
            $('.content_wrap').css('min-height', $(window).height() - 120);
        });
    });
   
          
        });
        /*const Modal = () =>{
          const getCookie = (name) =>{
            const value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
            return value ? value[2] : null;
          }
          const closeModal = () =>{
            document.querySelector('div.modalWrap').getElementsByClassName.display = 'none';
            const modal = document.getElementById('modal');
            document.querySelector('#parent').removeChild(modal);
          }
          const closeModalDuringOneday = () =>{
            let date = new Date(Date.now() + 86400e3);
            date = date.toUTCString();
            document.cookie = `modalClose=T; expires =${date}`
            closeModal();
          }
          (function(){ if (getCookie('modalClose'))closeModal();}());
          return(
            <div id="parent">
              <div className="modalWrap" onClick={closeModal()}></div>
              <div id="modal"><button onClick={closeModalDuringOneday()}>오늘 하루 동안 이 창을 열지 않음</button></div>
            </div>
          )
        }*/
        const MainBanner = () => {
          const [modalVisible,setModalVisible] = useState(true);
          const closeModal = useCallback (async(e) =>{
            setModalVisible(false);
          },[])
          console.log(modalVisible);
         /*  if() */
        return (
            <div className="main_banner">
              <div className="wrap2">
              {modalVisible && (<Modal visible={modalVisible} closable={true} maskClosable={true} onClose={closeModal} isLoggedIn={isLoggedIn}></Modal>)}
                <div className="text_part">
                  <h2>
                    <span>DID</span> Digital Factory in Daejeon 
                  </h2>

                  <p className='subtext'>
                  DID 기술융합공작소는 기업·창업자·메이커들에게 멘토링과 컨설팅을 지원하고,<br/>
                  메이킹 장비를 활용하여 창업과 사업화를 이룰 수 있도록<br/>
                  One-Stop 서비스를 제공하는 전문 메이커 스페이스입니다.
                  </p>
                </div>
              </div>
            </div>
          );
        };
      
        return (
          <div id="pageIndex">
            <MainBanner></MainBanner>
            <SectionTextType1
              title="DID 주요 서비스"
            ></SectionTextType1>
          
            <NoticeHomeContainer></NoticeHomeContainer>
       
            <SectionBannerType1 title="DID 협력기관"></SectionBannerType1>
          </div>
        );}