import React,{useState,useEffect, useCallback ,useRef}from 'react'
import $ from 'jquery';
import {withCookies,Cookies,ReactCookieProps} from 'react-cookie';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import moment from 'moment';
import Modal from './Modal'
import PopupModalHome from './PopupModalHome';
import PopupModalAbout from './PopupModalAbout';
import { CommonHeader,PreUri, Method } from '../CommonCode';
import '../css/common-s.css';
import '../css/style-s.css';
import SectionBannerType1 from "../components/sections/SectionBannerType1";
import SectionTabType3 from './sections/SectionTabType3';
import SectionTabType1 from "../components/sections/SectionTabType1";
import SectionTextType1 from "../components/sections/SectionTextType1";
import { NoticeHomeContainer } from '../containers/notice/NoticeHomeContainer';
import "../css/comb/pages/page.css";
import "../css/comb/contents/content.css";
import "../css/comb/sections/sections.css";
import styled from 'styled-components';
function Home() {
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
      /*   const v = document.getElementById("my_video")
        v.playbackRate=0.5 */
   
        const MainBanner = () => {
          const [modalVisible,setModalVisible] = useState(true);
          const [modalControl1,setModalControl1] = useState(true);
          const [modalSet,setModalSet] = useState(true);
          const [data,setData] = useState("");
          const [video, setVideo] = useState(null);
          const [isPlaying, setIsPlaying] = useState(false);
          const videoRef = useRef(null);
        
          const closeModal = () =>{
            setModalVisible(false);
          }
          const closeModal2 = () =>{
            setModalControl1(false);
          }
          const closeModal3 = ()=>{
            setModalSet(false);
          }
         /*  if() */
 /*         const openModal = () =>{
          setModalVisible(true);
        }
        const openModal2 = () =>{
          setModalControl1(true);
        }
        const openModal3 = () =>{
          setModalSet(true);
        } */
            const getRecentNotice = useCallback(async() =>{
              let requri = PreUri + '/notice/recentnotice';
              const response = await fetch(requri,{
                method:Method.get,
                headers:CommonHeader,
              })
            if(!response.ok) {
            console.log('잘못된 접근입니다.');
            return;
            }
            const json = await response.json();
            setData(json);
           },[])
         
           useEffect(() => {
            getRecentNotice();
            const video = videoRef.current;

            video.playbackRate = 0.7; // 재생 속도를 0.5배로 설정

            return () => {
              video.playbackRate = 1.0; // cleanup 시에 재생 속도를 원래 값인 1.0으로 복원
            };
          }, [getRecentNotice]);

           const onSiteMove = (url) =>{
            window.open(url,"_blank");
          }
        return (
          <>
          <div className="bg">
          <video  id="my_video" className="video__content" muted autoPlay loop ref={videoRef} >
          <source src="images/videos/main_video.mp4" type="video/mp4"/>
          </video>
            <div className="main_banner">
              <div className="wrap2">
              {modalVisible && (<Modal visible={modalVisible} closable={true} maskClosable={true} onClose={closeModal} isLoggedIn={isLoggedIn}></Modal>)}
              {modalSet &&(<PopupModalAbout visible={modalSet} closable={true} maskClosable={true} onClose={closeModal3} isLoggedIn={isLoggedIn}/>)}
              {modalControl1 && data && (<PopupModalHome visible={modalControl1} closable={true} maskClosable={true} onClose={closeModal2} isLoggedIn={isLoggedIn} token={token} no={data.notice_no}/>)}
         
                <div className="text_part">
                  <h2>
                    <span>DID</span> Digital Factory in Daejeon 
                  </h2>

                  <p className="subtext">
                  DID 기술융합공작소는 기업·창업자·메이커들에게<br/>
                  멘토링과 컨설팅을 지원하고,
                  메이킹 장비를 활용<br/>하여 창업과 사업화를 이룰 수 있도록
                  One-Stop<br/>서비스를 제공하는 전문 메이커 스페이스입니다.
                  </p>
             
                </div>
              </div>
              <div className="sns_map">
              <IcoImg src="/images/facebook_ico.png" onClick={()=>onSiteMove("https://www.facebook.com/didmakerspace")} className='blog'  style={{"cursor":"pointer"}}/>
              <IcoImg src="/images/blog_ico.png" onClick={()=>onSiteMove("https://blog.naver.com/didmakerspace")} className='blog'  style={{"cursor":"pointer"}}/>
              <IcoImg src="/images/instagram_ico.png" onClick={()=>onSiteMove("https://www.instagram.com/didmakerspace")} className='blog'  style={{"cursor":"pointer"}}/>
              <IcoImg src="/images/youtube_ico.png" onClick={()=>onSiteMove("https://www.youtube.com/channel/UCPjkOSeubw8elE8Qg6lhHfQ")} className='blog'  style={{"cursor":"pointer"}}/>
              <IcoImg src="/images/kakao_ico.png" onClick={()=>onSiteMove("https://pf.kakao.com/_HuxckT")} className='blog' style={{"cursor":"pointer"}}/>
            </div>
            </div>
            </div>
            </>
          );
        };
    
        return (
          <div id="pageIndex">
            <MainBanner></MainBanner>
            <SectionTextType1
              title="DID 주요 서비스"
            ></SectionTextType1>
          
            <NoticeHomeContainer></NoticeHomeContainer>
            <SectionTabType3 title="DID 동영상"/>
            <SectionBannerType1 title="DID 협력기관"></SectionBannerType1>
          </div>
         
        );}
export default React.memo(Home);

const IcoImg = styled.img`
width:30px;
height:30px;
`