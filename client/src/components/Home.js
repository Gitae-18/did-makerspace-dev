import React,{useState}from 'react'
import $ from 'jquery';
import {withCookies,Cookies,ReactCookieProps} from 'react-cookie';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import Modal from './Modal'
import '../css/common-s.css';
import '../css/style-s.css';
import SectionBannerType1 from "../components/sections/SectionBannerType1";
import SectionTabType1 from "../components/sections/SectionTabType1";
import SectionTextType1 from "../components/sections/SectionTextType1";
import "../css/comb/pages/page.css";
import "../css/comb/contents/content.css";
import "../css/comb/sections/sections.css";

export default function () {
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
          const closeModal = () =>{
            setModalVisible(false);
          }
        return (
            <div className="main_banner">
              <div className="wrap2">
              {modalVisible && (<Modal visible={modalVisible} closable={true} maskClosable={true} onClose={closeModal}></Modal>)}
                <div className="text_part">
                  <h2>
                    <span>DID</span> 소개 관련 배너
                  </h2>
                  <p className='subtext'>
                    임시텍스트 입니다. 새 것은 같이 싹이 눈에 있는가? 이는 장식하는
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
              subTitle="주요 서비스 임시텍스트"
            ></SectionTextType1>
            <SectionTabType1 title="New 업데이트"></SectionTabType1>
            <SectionBannerType1 title="DID 협력기관"></SectionBannerType1>
          </div>
        );}