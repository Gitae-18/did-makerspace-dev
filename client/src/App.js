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
import { ManagementContainer as Management } from './containers/ManagementContainer';
import { MaterialContainer as Material } from './containers/MaterialContainer';
import { MenuContainer as Menu } from './containers/MenuContainer';
import { MServiceContainer as MService } from './containers/MServiceContainer';
import { MServiceDetailContainer as MServiceDetail } from './containers/MServiceDetailContainer';
import { MyInfoContainer as MyInfo } from './containers/MyInfoContainer';
import { ScheduleContainer as Schedule } from './containers/ScheduleContainer';
import { UServiceContainer as UService } from './containers/UServiceContainer';
import './css/common-s.css';
import './css/style-s.css';
import Materials, { Materials1, Materials2, Materials3 } from './components/Admin/Statistics/pages/Materials';
import Service, { Service1, Service2, Service3, Service4 ,StaticsAnalyze} from './components/Admin/Statistics/pages/Service';
import Users, { Users1, Users2 } from './components/Admin/Statistics/pages/Users';
import Footer from './css/comb/Footer';
import DidInfo,{DidInfo2,DidInfo3,DidInfo4,DidInfo5,DidInfo6,DidInfo7,DidInfo8,DidInfo9,DidInfo1Detail,DidInfo1Detail2} from './components/pages/PageSub';

import ListType1a from './components/contents/ListType1a';
import DidReservation,{DidReservation2,DidReservation3,DidReservation4,SelectReservation,TestReservation} from './components/pages/PageSub2';
import ClassEdu_Program,{ClassEdu_Program2} from './components/pages/PageSub3';
import Contact,{Contact2,Contact3,Contact4,Contact5} from './components/pages/PageSub4';
import Mentoring from './components/pages/PageSub5';
import { Select } from 'semantic-ui-react';


export const ScrollToTop = () =>{
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  setTimeout(() => {  window.scrollTo(0, 0);  }, 300);
}
const App = () => {
  
  return (
    
    <BrowserRouter>
    <CookiesProvider>
      <div id="wrap" className="wrap intro" >
        <div id="header">
          <Link to="/"><span className='logo2'><img src="/images/logo_wh.png" alt="로고"/></span></Link>
          <Menu />
          <Login />
        </div>
      </div>
      
      <ScrollToTop/>
      <Routes>
        <Route exact path="/"  element = {<Home/>}/>
        <Route path="/join" element = {<Join/>} />
        <Route path="/uguide"  element = {<UGuide/>} />
        <Route path="/uservice"  element = {<UService/>} />
        <Route exact path="/mservice"  element = {<MService/>} />
        <Route exact path="/mservice/*"  element = {<MServiceDetail/>} />
        <Route path="/mschedule" element = {<Schedule/>} />
        <Route path="/mmaterial" element = {<Material/>} />
        <Route path="/management" element = {<Management/>} />
        <Route path="/findpw" element = {<FindPassword/>} />
        <Route path="/private" element = {<FindPassword/>} />
        <Route path="/privacy" element = {<Privacy/>} />
        <Route path="/terms" element = {<Terms/>} />
        <Route path="/myinfo" element = {<MyInfo/>} />
        <Route path="/notmember" element = {<NotMember/>} />
        <Route path="/notauthhorized" element = {<NotAuthorized/>} />
        <Route path="/mnthschd" element = {<MonthlySchedule/>} />
        
        <Route path="/didinfo" element = {<DidInfo/>}/>
        <Route path="/info/spaceinfo" element = {<DidInfo/>}/>
        <Route path='/InfoType1a' element = {<DidInfo1Detail2/>}/>     
        <Route path="/info/equipinfo" element = {<DidInfo2/>}/>
        <Route path="/info/workerinfo" element = {<DidInfo3/>}/>
        <Route path="/info/greetings" element = {<DidInfo4/>}/>
        <Route path="/info/vision" element = {<DidInfo5/>}/>
        <Route path="/info/organization" element = {<DidInfo6/>}/>
        <Route path="/info/partner" element = {<DidInfo7/>}/>
        <Route path="/info/way" element = {<DidInfo8/>}/>
        <Route path="/info/faq/*" element = {<DidInfo9/>}/>
        <Route path="/info/faq/faq1" element = {<DidInfo1Detail/>}/>

        <Route path="/didreservation" element = {<DidReservation/>}/>
        <Route path="/reservation/space" element = {<DidReservation2/>}/>
        <Route path="/reservation/lab" element = {<DidReservation3/>}/>
        <Route path="/reservation/myvation" element = {<DidReservation4/>}/>
        <Route path="/reservation/selectreserv" element = {<SelectReservation/>}/>
        <Route path="/didreservation/test" element={<TestReservation/>}/>

        <Route path="/mentoring" element = {<Mentoring/>}/>

        <Route path="/classprogram" element = {<ClassEdu_Program/>}/>
        <Route path="/eduprogram" element = {<ClassEdu_Program2/>}/>

        <Route path="/contact" element = {<Contact/>}/>
        <Route path="/archivecontact/video" element = {<Contact2/>}/>
        <Route path="/archivecontact/text" element = {<Contact3/>}/>
        <Route path="/archivecontact/basic" element = {<Contact4/>}/>
        <Route path="/noticecontact/notice" element = {<Contact5/>}/>

        <Route path="/prototype/management" element = {<MService/>}/>
        <Route path="/prototype/application" element = {<UService/>}/>
        <Route exact path="/statics" element = {<Service/>}/>
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
      


        {/* <Route path="/test" component={Test} /> */}
        <Route element = {<NotFound/>} />
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
