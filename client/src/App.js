// import Test from './Test';
import qs from 'qs';
import React,{useEffect} from 'react';
import {Link, Route, Routes,BrowserRouter,useLocation, Outlet} from 'react-router-dom';
import './App.css';
import FindPassword from './components/FindPassword';
import Home from './components/Home';
import MonthlySchedule from './components/MonthlySchedule';
import NotAuthorized from './components/NotAuthorized';
import NotFound from './components/NotFound';
import NotMember from './components/NotMember';
import Privacy from './components/Privacy';
import Terms from './components/Terms';
import UGuide from './components/User/Guide';
import NotCompelete from './components/NotCompeleted'
import { useSelector } from 'react-redux';
import {CookiesProvider} from 'react-cookie';
import PageSub01b2 from './components/pages/PageSub01/PageSub01b2';
import PageSub01b3 from './components/pages/PageSub01/PageSub01b3';
import PageSub01b4 from './components/pages/PageSub01/PageSub01b4';
import PageSub01c from './components/pages/PageSub01/PageSub01c';
import PageSub01d from './components/pages/PageSub01/PageSub01d';
import PageSub02a1 from './components/pages/PageSub02/PageSub02a1';
import PageSub02a2 from './components/pages/PageSub02/PageSub02a2';
import PageSub02a3 from './components/pages/PageSub02/PageSub02a3';
import PageSub02a4 from './components/pages/PageSub02/PageSub02a4';
import PageSub02a5 from './components/pages/PageSub02/PageSub02a5';
import PageSub02a6 from './components/pages/PageSub02/PageSub02a6';
import PageSub02a7 from './components/pages/PageSub02/PageSub02a7';
import PageSub03a1 from './components/pages/PageSub03/PageSub03a1';
import PageSub03a2 from './components/pages/PageSub03/PageSub03a2';
import TableType1a from './components/contents/TableType1a';
import TableType1b from './components/contents/TableType1b';
import TableType1c from './components/contents/TableType1c';
import { JoinContainer as Join } from './containers/JoinContainer';
import { LoginContainer as Login } from './containers/LoginContainer';
import { ManagementContainer as Management1 } from './containers/ManagementContainer';
import { MaterialContainer as MMaterial } from './containers/MaterialContainer';
import { MenuContainer as Menu } from './containers/MenuContainer';
import { MServiceContainer as MService } from './containers/MServiceContainer';
import { MServiceDetailContainer as MServiceDetail } from './containers/MServiceDetailContainer';
import { MyInfoContainer as MyInfo } from './containers/MyInfoContainer';
import { ScheduleContainer as Schedule } from './containers/ScheduleContainer';
import { UServiceContainer as UService } from './containers/UServiceContainer';
import { ReservationEquipmentContainer as EReservation } from './containers/ReservationEquipmentContainer';
import { EquipmentReservationContainer as EqReservation } from './containers/EquipmentReservationContainer';
import { ClassEduContainer as ClassEduA } from './containers/ClassEduContainer';
import { MyReservContainer } from './containers/MyReservContainer';
import { ClassContainer } from './containers/ClassContainer';
import { EduContainer } from './containers/EduContainer';
import { EduAddContainer } from './containers/EduAddContainer';
import { ClassAddContainer } from './containers/ClassAddContainer';
import { NoticeAddContainer } from './containers/NoticeAddContainer';
import { NoticeContainer } from './containers/NoticeContainer';
import { NoticeDetailContainer } from './containers/NoticeDetailContainer';
import { FaqContainer } from './containers/FaqContainer';
import { FaqAddContainer } from './containers/FaqAddContainer';
import { FaqDetailContainer } from './containers/FaqDetailContainer';
import Material from './components/Admin/Material/Material';
import MaterialItem from './components/Admin/Material/MaterialItem';
import MaterialList from './components/Admin/Material/MaterialList';
import MaterialReg from './components/Admin/Material/MaterialReg';
import Management from './components/Admin/Management/Management';
import './css/common-s.css';
import './css/style-s.css';
import Materials, { Materials1, Materials2, Materials3 } from './components/Admin/Statistics/pages/Materials';
import Service, { Service1, Service2, Service3, Service4 ,StaticsAnalyze} from './components/Admin/Statistics/pages/Service';
import Users, { Users1, Users2 } from './components/Admin/Statistics/pages/Users';
import Footer from './css/comb/Footer';
import DidInfo,{DidInfo2,DidInfo3,DidInfo4,DidInfo5,DidInfo6,DidInfo7,DidInfo8,DidInfo9,DidInfo1Detail,DidInfo1Detail2,DidInfo1Detail1,DidFaqWrite} from './components/pages/PageSub';
import ListType1a from './components/contents/ListType1a';
import DidReservation,{DidReservation2,DidReservation3,DidReservation4,SelectReservation,TestReservation} from './components/pages/PageSub2';
import ClassEdu_Program,{ClassEdu_Program2,ClassEdu_program3,ClassEdu_program4} from './components/pages/PageSub3';
import Contact,{Contact2,Contact3,ContactNoticeDetail,Contact5,Contact6,ContactDetail,ContactDetail2,BasicDetail,AddNotice} from './components/pages/PageSub4';
import Mentoring,{UMentoring,UMentoringApplication,MserviceGuide}from './components/pages/PageSub5';
import { MentorApplication,MentorApplicationDetail,MentoringReport,MentoringReportDetail,MentorAuthority,ClassEduControl, ClassEduControl2} from './components/pages/PageSub6';
import NotCompeleted from './components/NotCompeleted';





export const ScrollToTop = () =>{
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  setTimeout(() => {  window.scrollTo(0, 0);  }, 300);
}
const App = () => {
  const { authority_level } = useSelector(state => state.user);
  let user_style = {
    position:"relative",
    left:"100px",
  }
  return (
    
    <BrowserRouter>
    <CookiesProvider>
      <div id="header">
        <div className="mainmenu">
          <div className='gnb_cover'>
          <Link to="/"><span className='logo2'><img src="/images/logo.png" alt="로고"/></span></Link>
          <Menu style={authority_level < 10? {user_style}:{}}/>
          <Login />
          </div>
        </div>
      </div>
     
      
      <ScrollToTop/>
      <Routes>
        <Route path="/"  element = {<Home/>}/>
        <Route path="/join" element = {<Join/>} />
        <Route path="/uguide"  element = {<UGuide/>} />
        <Route path="/uservice"  element = {<UService/>} />
        <Route path="/mservice/"  element = {<MService/>} />
        <Route path="/mservice/*"  element = {<MServiceDetail/>} />
        <Route path="/mservice/guide" element = {<MserviceGuide/>}/>
        <Route path="/mschedule" element = {<Schedule/>} />
        <Route path="/mmaterial" element = {<MMaterial/>} /> 
        <Route path="/management/*" element = {<Management1/>} />
     



        <Route path="/findpw" element = {<FindPassword/>} />
        <Route path="/private" element = {<FindPassword/>} />
        <Route path="/privacy" element = {<Privacy/>} />
        <Route path="/terms" element = {<Terms/>} />
        <Route path="/myinfo" element = {<MyInfo/>} />
        <Route path="/notmember" element = {<NotMember/>} />
        <Route path="/notauthhorized" element = {<NotAuthorized/>} />
        <Route path="/notcomplete" element = {<NotCompeleted/>} />
        <Route path="/mnthschd" element = {<MonthlySchedule/>} />
        
        <Route path="/didinfo/*" element = {<DidInfo/>}/>
        <Route path="/didinfo/spacedetail" element = {<DidInfo1Detail1/>}/>
        <Route path='/InfoType1a' element = {<DidInfo1Detail2/>}/>     
        <Route path="/info/equipinfo" element = {<DidInfo2/>}/>
        <Route path="/info/workerinfo" element = {<DidInfo3/>}/>
        <Route path="/info/greetings" element = {<DidInfo4/>}/>
        <Route path="/info/vision" element = {<DidInfo5/>}/>
        <Route path="/info/organization" element = {<DidInfo6/>}/>
        <Route path="/info/partner" element = {<DidInfo7/>}/>
        <Route path="/info/way" element = {<DidInfo8/>}/>
        <Route path="/info/faq/*" element = {<FaqContainer/>}/>
        <Route path="/info/faq/faq1" element = {<FaqDetailContainer/>}/>
        <Route path="/info/write" element = {<FaqAddContainer/>}/>

        <Route path="/didreservation" element = {<EqReservation/>}/>
        <Route path="/reservation/space" element = {<DidReservation2/>}/>
        <Route path="/reservation/lab" element = {<DidReservation3/>}/>
        <Route path="/reservation/myvation" element = {<MyReservContainer/>}/>
        <Route path="/reservation/selectreserv" element = {<EReservation/>}/>
        <Route path="/didreservation/test" element={<TestReservation/>}/>

        <Route path="/mentoring" element = {<Mentoring/>}/>
        <Route path="/umentoring/*" element = {<UMentoring/>}/>
        <Route path="/umentoring/detail" element = {<UMentoringApplication/>}/>
        <Route path="/classprogram" element = {<ClassContainer/>}/>
        <Route path="/eduprogram" element = {<EduContainer/>}/>
        <Route path="/classprogram/detail" element = {<ClassEduA/>}/>
        <Route path="/eduprogram/detail" element = {<ClassEdu_program4/>}/>

        <Route path="/contact" element = {<Contact/>}/>
        <Route path="/archivecontact/video" element = {<Contact2/>}/>
        <Route path="/archivecontact/text" element = {<Contact5/>}/>
        <Route path="/archivecontact/basic" element = {<Contact3/>}/>
        <Route path="/notice" element = {<NoticeContainer/>}/>
        <Route path="/noticecontact/addnotice" element = {<NoticeAddContainer/>}/>
        <Route path="/noticecontact/notice/detail" element = {<NoticeDetailContainer/>}/>
        <Route path='/archivecontact/video/detail' element = {<ContactDetail/>}/>
        <Route path='/archivecontact/text/detail' element = {<BasicDetail/>}/>
        <Route path='/archivecontact/basic/detail' element = {<ContactDetail2/>}/>
        
        <Route path='/mentorcontrol/mentorapplication' element = {<MentorApplication/>}/>
        <Route path='/mentorcontrol/mentorapplication/detail' element = {<MentorApplicationDetail/>}/>
        <Route path='/mentorcontrol/mentorauthority' element = {<MentorAuthority/>}/>
        <Route path='/mentorcontrol/mentoringreport' element = {<MentoringReport/>}/>
        <Route path='/mentorcontrol/mentoringreport/detail' element = {<MentoringReportDetail/>}/>
        <Route path='/educontrol' element = {<EduAddContainer/>}/>
        <Route path='/classcontrol' element = {<ClassAddContainer/>}/>

        <Route path="/prototype/management" element = {<MService/>}/>
        <Route path="/prototype/application" element = {<UService/>}/>
       {/*  <Route path="/statics" element = {<Service/>}/>
        <Route path="/service/counsel"   element = {<StaticsAnalyze/>}/>
        <Route path="/service/application"  element = {<Service1/>}/>
        <Route path="/service/process"  element = {<Service2/>}/>
        <Route path="/service/reject"  element = {<Service3/>}/>
        <Route path="/service/company"  element = {<Service4/>}/>
        <Route path="/materials/items"  element = {<Materials/>}/>
        <Route path="/materials/imports"   element = {<Materials1/>}/>
        <Route path="/materials/amount"   element = {<Materials2/>}/>
        <Route path="/materials/equipment"   element = {<Materials3/>}/>
        <Route path="/users/stastics"   element = {<Users/>}/>
        <Route path="/users/service"  element = {<Users1/>}/>
        <Route path="/users/purpose"  element = {<Users2/>}/>
       */}


        {/* <Route path="/test" component={Test} /> */}
        <Route path="/*" element = {<NotFound/>} />
      </Routes>
    
      <Footer/>
      </CookiesProvider>
      </BrowserRouter>
    
    );
}

export default (App);

/*
function App() {
  // useEffect(() => {
  //   console.log("useEffect");
  //   fetch('https://jsonplaceholder.typicode.com/todos/1')
  //     .then(response => response.json())
  //     .then(json => console.log(json));
  // });

  return (
    <BrowserRouter>
      <div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/topics">Topics</Link></li>
          <Menu />
        </ul>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/topics" component={Topics} />
      </div>
    </BrowserRouter>
  );
*/
//   return (
//     <React.Fragment>
//       <CssBaseline />
//       <Container maxWidth='lg'>
//         <SimpleTabs />

//         <LoginForm />
//         <JoinForm />
//       </Container>
//     </React.Fragment>
//   );
 //}
/*

class Popup extends React.Component {
  render() {
    return (
      <div className='popup'>
        <div className='popup_inner'>
          <h1>{this.props.text}</h1>
        <button onClick={this.props.closePopup}>close me</button>
        </div>
      </div>
    );
  }
}
*/
