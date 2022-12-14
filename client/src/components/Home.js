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
              <div id="modal"><button onClick={closeModalDuringOneday()}>?????? ?????? ?????? ??? ?????? ?????? ??????</button></div>
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
                  DID ???????????????????????? ????????????????????????????????????? ???????????? ???????????? ????????????,<br/>
                  ????????? ????????? ???????????? ????????? ???????????? ?????? ??? ?????????<br/>
                  One-Stop ???????????? ???????????? ?????? ????????? ?????????????????????.
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
              title="DID ?????? ?????????"
            ></SectionTextType1>
          
            <NoticeHomeContainer></NoticeHomeContainer>
       
            <SectionBannerType1 title="DID ????????????"></SectionBannerType1>
          </div>
        );}