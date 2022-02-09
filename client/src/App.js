// import Test from './Test';
import qs from 'qs';
import React from 'react';
import {Link, Route, Switch, withRouter ,Router} from 'react-router-dom';
import './App.css';
import FindPassword from './components/FindPassword';
import Home from './components/Home';
import MonthlySchedule from './components/MonthlySchedule';
import NotAuthorized from './components/NotAuthorized';
import NotFound from './components/NotFound';
import NotMember from './components/NotMember';
import Privacy from './components/Privacy';
import StaticsAnalyze from './components/Admin/Statistics/StaticsAnalyze';
import Terms from './components/Terms';
import UGuide from './components/User/Guide';
import Sidebar from './components/Admin/Statistics/Sidebar';
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
import './css/common.css';
import './css/style.css';
import Materials, { Materials1, Materials2, Materials3 } from './components/Admin/Statistics/pages/Materials';
import Service, { Service1, Service2, Service3, Service4 } from './components/Admin/Statistics/pages/Service';
import Users, { Users1, Users2 } from './components/Admin/Statistics/pages/Users';




const App = ({location}) => {
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true // /about?details=true 같은 쿼리 주소의 '?'를 생략해주는 옵션입니다.
  });

  const hidden = (window.location.pathname === '/mservice' && query.report_no) ? true : false;
  // console.log(window.location.pathname);
  // console.log(query.step);
  // console.log(hidden);

  return (
    
    <React.Fragment>
     
      <div id="wrap" className="wrap intro" hidden={hidden}>
        <div id="header">
          <Link to="/"><h1><img src="/images/logo.png" alt="로고" /></h1></Link>
          <Menu />
          <Login />
        </div>
      </div>
   
      <Sidebar/>
    
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/join" component={Join} />
        <Route path="/uguide" component={UGuide} />
        <Route path="/uservice" component={UService} />
        <Route exact path="/mservice" component={MService} />
        <Route exact path="/mservice/detail" component={MServiceDetail} />
        <Route path="/mschedule" component={Schedule} />
        <Route path="/mmaterial" component={Material} />
        <Route path="/management" component={Management} />
        <Route path="/findpw" component={FindPassword} />
        <Route path="/private" component={FindPassword} />
        <Route path="/privacy" component={Privacy} />
        <Route path="/terms" component={Terms} />
        <Route path="/myinfo" component={MyInfo} />
        <Route path="/notmember" component={NotMember} />
        <Route path="/notauthhorized" component={NotAuthorized} />
        <Route path="/mnthschd" component={MonthlySchedule} />
        <Route path="/statics" component={StaticsAnalyze}/>
        <Route path="/service/counsel"  component={Service}/>
        <Route path="/service/application"  component={Service1}/>
        <Route path="/service/process"  component={Service2}/>
        <Route path="/service/reject"  component={Service3}/>
        <Route path="/service/company"  component={Service4}/>
   
        <Route path="/materials/items"  component={Materials}/>
        <Route path="/materials/imports"  component={Materials1}/>
        <Route path="/materials/amount"  component={Materials2}/>
        <Route path="/materials/equipment"  component={Materials3}/>
        
        <Route path="/users/stastics"  component={Users}/>
        <Route path="/users/service"  component={Users1}/>
        <Route path="/users/purpose"  component={Users2}/>



        {/* <Route path="/test" component={Test} /> */}
        <Route component={NotFound} />
      </Switch>
   

      <div id="wrap" className="wrap intro" hidden={hidden}>
        <div id="footer">
          <div className="inner_footer">
            <span className="first">문의전화 <strong className="eng"> 042-385-4200</strong></span>
            <span><Link to="/terms">이용약관</Link></span>
            <span><Link to="/privacy">개인정보처리방침</Link></span>
            <span className="last">ⓒ 2020. DID 기술융합공작소 <strong className="eng">all rights reserved</strong></span>
          </div>
        </div>
      </div>
      
    </React.Fragment>
    );
}

export default withRouter(App);

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
