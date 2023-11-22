import React,{useState,useEffect, useCallback ,useRef}from 'react'
import $ from 'jquery';
import {withCookies,Cookies,ReactCookieProps} from 'react-cookie';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import moment from 'moment';
import Modal from './Modals/Modal'
import PopupModalHome from './Modals/PopupModalHome';
import PopupModalAbout from './Modals/PopupModalAbout';
import ClassHomeModal from './Modals/ClassHomeModal';
import ClassHomeModal2 from './Modals/ClassHomeModal2';
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
        console.log(localStorage)
        const MainBanner = () => {
          const [modalVisible,setModalVisible] = useState(true);
          const [modalControl1,setModalControl1] = useState(true);
          const [classPopModal,setClassPopModal] = useState(true);
          const [accelerationData, setAccelerationData] = useState({ x: 0, y: 0, z: 0 });
          const [modalSet,setModalSet] = useState(true);
          const [classModal,setClassModal] = useState(true);
          const [data,setData] = useState("");
          const [classdata,setClassdata] = useState([]);
          const videoRef = useRef(null);
          const classno = classdata.map((item,i)=> item.program_no)
          const closeModal = () =>{
            setModalVisible(false);
          }
          const closeModal2 = () =>{
            setModalControl1(false);
          }
          const closeModal3 = () => {
            setModalSet(false);
          }
          const closeModal4 = () => {
            setClassModal(false);
          }
          const closeModal5 = () => {
            setClassPopModal(false);
          }
          const fetchData = async () => {
            try {
              const response = await fetch('  ', {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },
              });
          
              // 서버 응답에서 데이터를 추출하거나, 필요에 따라 응답을 처리할 수 있습니다.
              const data = await response.json();
              //setAccelerationData(data);
              console.log('Received acceleration data:', data);
            } catch (error) {
              console.error('Error fetching acceleration data:', error);
            }
          };
        useEffect(()=> {              
              const intervalId = setInterval(fetchData, 1000); // 1초마다 데이터 업데이트
          
              return () => clearInterval(intervalId); // 컴포넌트가 언마운트되면 interval 정리
        },[])
            const getRecentProgram = useCallback(async()=>{
              let requri = PreUri + '/classedu/recentprogram';
              const response = await fetch(requri,{
                method:Method.get,
                headers:CommonHeader,
              })
            if(!response.ok) {
            console.log('잘못된 접근입니다.');
            return;
            }
            const json = await response.json();
            console.log(json);
            setClassdata(json);
            },[])
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
            getRecentProgram();
            const video = videoRef.current;
            
            video.playbackRate = 0.7; // 재생 속도를 0.5배로 설정

            return () => {
              video.playbackRate = 1.0; // cleanup 시에 재생 속도를 원래 값인 1.0으로 복원
            };
          }, [getRecentNotice,getRecentProgram]);

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
              {modalVisible && (<Modal visible={modalVisible} closable={true} maskClosable={true} setModalVisible={setModalVisible}onClose={closeModal} isLoggedIn={isLoggedIn}></Modal>)}
              {modalSet &&(<PopupModalAbout visible={modalSet} closable={true} maskClosable={true} onClose={closeModal3} isLoggedIn={isLoggedIn}/>)}
              {modalControl1 && data && (<PopupModalHome visible={modalControl1} closable={true} maskClosable={true} onClose={closeModal2} isLoggedIn={isLoggedIn} token={token} no={data.notice_no}/>)}
              {classModal && classdata && classno.length>0 ?
              <ClassHomeModal visible={classModal} closable={true} maskClosable={true} onClose={closeModal4} isLoggedIn={isLoggedIn} no={classno[0]}/>
              :null
              }
              {classPopModal && classdata && classno.length>0 ?
               <ClassHomeModal2 visible={classPopModal} closable={true} maskClosable={true} onClose={closeModal5} isLoggedIn={isLoggedIn} no={classno[1]}/>
               :null
              }
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
            <div>
            <h2>Acceleration Data</h2>
            <p>X: {accelerationData.x}</p>
            <p>Y: {accelerationData.y}</p>
            <p>Z: {accelerationData.z}</p>
        </div>
            <MainBanner></MainBanner>
         {/*    <SectionTextType1
              title="DID 주요 서비스"
            ></SectionTextType1> */}
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