import React, { /*useState, useEffect, */useCallback,useEffect,useState /*useMemo*/ } from 'react';
import { NavLink ,Link} from 'react-router-dom';
import { useLocation, useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { CHANGE_MENU} from "../store/management";
import { MENU_CHANGE} from '../store/sidemenu';
import { CHANGE_CATEGORY } from "../store/material";
/* import { AuthLevel } from '../CommonCode';
import styled from 'styled-components'; */
import '../css/common-s.css';
import '../css/style-s.css';
import '../css/Menu.css';
/* const menuCompo = styled(Link)`
`
let user_style = {
  position:"relative",
  left:"100px",
} */

const UserMenu = ({authority_level,path,viewDepth}) => {
  const [menuOpen,setMenuOpen] = useState(false);
  const [isHovering,setIsHovering] = useState(0);
  const dispatch = useDispatch();
  const history = useNavigate();
  const { sideNaviPos } = useSelector(state => state.management);
  const outer1 = document.getElementsByClassName('dep2');
	const onClick = useCallback((e, index) => {
		e.preventDefault();
		dispatch({ type: CHANGE_MENU, target: index });
		console.log(viewDepth);
		if (viewDepth && viewDepth === 2) {
			
			history(-1);
		} else {
			history('/management')
		}
	}, [dispatch, history, viewDepth]);
  const onClick2 = useCallback((e, index) => {
		e.preventDefault();
		dispatch({ type: MENU_CHANGE, target: index });
	}, [dispatch, history]);
  const SubMenu1 = () =>{
    return(
          <ol className='menu_dep2'>
            <li className="page_target" onClick={(e)=>onClick2(e,1)}><NavLink to={"/didadmin/info/greetings"}>기관 소개</NavLink></li>
            <li className="page_target" onClick={(e)=>onClick2(e,0)}><NavLink to={"/didinfo"}>시설 소개</NavLink></li>
            <li className="page_target" onClick={(e)=>onClick2(e,2)}><NavLink to={"/did/info/way"}>오시는 길 </NavLink></li>
            <li className="page_target" onClick={(e)=>onClick2(e,3)}><NavLink to={"/did/info/faq"}>FAQ</NavLink></li>
           </ol>
    )
  }
  const SubMenu2 = () => {
    return(
    <ol className='menu_dep2'>
      <li className="page_target" onClick={(e)=>onClick2(e,0)}><NavLink to={"/eqreservation/equip"}>장비 예약</NavLink></li>
      <li className="page_target" onClick={(e)=>onClick2(e,1)}><NavLink to={"/eqreservation/space"}>공간 예약</NavLink></li>
      <li className="page_target" onClick={(e)=>onClick2(e,2)}><NavLink to={"/eqreservation/lab"}>전문 랩 투어 </NavLink></li>
    </ol>
    );
  }
  const SubMenu3 = () =>{
    return(
          <ol className='menu_dep2'>
            <li className="page_target" onClick={(e)=>onClick2(e,0)}><NavLink  to={'/uservice'}>시제품 제작</NavLink></li>
            <li className="page_target" onClick={(e)=>onClick2(e,1)}><NavLink>시제품 제작안내</NavLink></li>
          </ol>
    );
  }
  const SubMenu4 = () =>{
    return(
          <ol className='menu_dep2'>
            <li onClick={(e)=>onClick2(e,0)}><NavLink to={'/classprogram'}>교육프로그램</NavLink></li>
            <li onClick={(e)=>onClick2(e,1)}><NavLink to={'/eduprogram'}>행사프로그램</NavLink></li>
          </ol>
    );
  }
  const SubMenu5 = () => {
    return(
          <ol className='menu_dep2'>
            <li onClick={(e)=>onClick2(e,0)}><NavLink to={'/notcomplete'}>멘토링</NavLink></li>
            <li onClick={(e)=>onClick2(e,1)}><NavLink to={'/notcomplete'}>멘토 검색</NavLink></li> 
            <li onClick={(e)=>onClick2(e,2)}><NavLink to={'/notcomplete'}>멘토 칭찬</NavLink></li>   
          </ol>
    )
  }
  
  const SubMenu6 = () => {
    return(
      <ol className='menu_dep2'>
        <li onClick={(e)=>onClick2(e,0)}><NavLink to={'/contact'}>연락처 안내</NavLink></li>
        <li onClick={(e)=>onClick2(e,1)}><NavLink to={'/archive/video'}>자료실</NavLink></li>
        <li onClick={(e)=>onClick2(e,2)}><NavLink to={'/notice'}>공지사항</NavLink></li>   
      </ol>
    );
  }
  const SubMenu7 = () => {
    
    return(
      <ol className='menu_dep2'>
        <li onClick={(e)=>onClick(e,0)}><NavLink>기업/회원 관리</NavLink></li>
        <li onClick={(e)=>onClick(e,2)}><NavLink>기자재 품목 관리</NavLink></li>
        <li onClick={(e)=>onClick(e,2)}><NavLink>기자재관리</NavLink></li>
        <li onClick={(e)=>onClick(e,3)}><NavLink>서비스항목관리</NavLink></li> 
        <li onClick={(e)=>onClick(e,3)}><NavLink>기/자재관리</NavLink></li> 
        <li onClick={(e)=>onClick(e,5)}><NavLink>전문멘토관리</NavLink></li>   
        <li onClick={(e)=>onClick(e,6)}><NavLink>교육/행사관리</NavLink></li>   
      </ol>
    );
  }
  return(
  <>
  <ol className="menu">
    <li><Link to="/didadmin/info/greetings">DID기술융합공작소</Link>
          <SubMenu1/>
    </li>
    <li><Link to="/eqreservation/equip">장비 및 시설예약</Link>
         <SubMenu2/>
    </li>
       
    <li><Link to={"/uservice"}>시제품 제작</Link>
          <SubMenu3/>
    </li>
        
    <li><Link to="/classprogram">교육/행사</Link>
          <SubMenu4/>
    </li>
        
    <li><Link to="/notcomplete">멘토링</Link>
          <SubMenu5/>
    </li>
          
    <li><Link to="/contact">Contact</Link>
          <SubMenu6/>
    </li>
    {/* <li className='dep2' style={authority_level < AuthLevel.partner ?{"display":"block"}:{"display":"none"}}> <Link onClick={() => { dispatch({ type: CHANGE_MENU, target: 0 }); }} to="/management">운영 관리</Link>
          <SubMenu7/>
    </li> */}
   </ol>
    
  </>
);}
/*<Link onClick={() => { dispatch({ type: STASTICS_ANALYZE, target: 0 }); }} to="/statics">통계 분석</Link>*/
const AdminMenu = ({viewDepth}) => {
  const [menuOpen,setMenuOpen] = useState(false);
  const [isHovering,setIsHovering] = useState(0);
  const dispatch = useDispatch();
  const history = useNavigate();
  const { sideNaviPos } = useSelector(state => state.management);
  const { sideNaviMenu } = useSelector(state => state.sidemenu);
  const outer1 = document.getElementsByClassName('dep2');
	const onClick = useCallback((e, index) => {
		e.preventDefault();
		dispatch({ type: CHANGE_MENU, target: index });
		console.log(viewDepth);
		if (viewDepth && viewDepth === 2) {
			
			history(-1);
		} else {
			history('/management')
		}
	}, [dispatch, history, viewDepth]);
  const onClick2 = useCallback((e, index) => {
		dispatch({ type: MENU_CHANGE, target: index });	
	}, [dispatch, history, viewDepth]);
  const SubMenu1 = () =>{
    return(
          <ol className='menu_dep2'>
            <li className="page_target" onClick={(e)=>onClick2(e,1)}><NavLink to={"/didadmin/info/greetings"}>기관 소개</NavLink></li>
            <li className="page_target" onClick={(e)=>onClick2(e,0)}><NavLink to={"/didinfo"}>시설 소개</NavLink></li>
            <li className="page_target" onClick={(e)=>onClick2(e,2)}><NavLink to={"/did/info/way"}>오시는 길 </NavLink></li>
            <li className="page_target" onClick={(e)=>onClick2(e,3)}><NavLink to={"/did/info/faq"}>FAQ</NavLink></li>
           </ol>
    )
  }
  const SubMenu2 = () => {
    return(
    <ol className='menu_dep2'>
      <li className="page_target" onClick={(e)=>onClick2(e,0)}><NavLink to={"/eqreservation/equip"}>장비 예약</NavLink></li>
      <li className="page_target" onClick={(e)=>onClick2(e,1)}><NavLink to={"/eqreservation/space"}>공간 예약</NavLink></li>
      <li className="page_target" onClick={(e)=>onClick2(e,2)}><NavLink to={"/eqreservation/lab"}>전문 랩 투어 </NavLink></li>
    </ol>
    );
  }
  const SubMenu3 = () =>{
    return(
          <ol className='menu_dep2'>
            <li className="page_target" onClick={(e)=>onClick2(e,0)}><NavLink to={'/mservice'}>시제품 제작관리</NavLink></li>
            <li className="page_target" onClick={(e)=>onClick2(e,1)}><NavLink to={'/mservice/guide'}>시제품 제작안내</NavLink></li>
          </ol>
    );
  }
  const SubMenu4 = () =>{
    return(
          <ol className='menu_dep2'>
            <li onClick={(e)=>onClick2(e,0)}><NavLink to={'/classprogram'} >교육프로그램</NavLink></li>
            <li onClick={(e)=>onClick2(e,1)}><NavLink to={'/eduprogram'}>행사프로그램</NavLink></li>
          </ol>
    );
  }
  const SubMenu5 = () => {
    return(
          <ol className='menu_dep2'>
            <li onClick={(e)=>onClick2(e,0)}><NavLink to={'/notcomplete'}>멘토링 관리</NavLink></li>
            <li onClick={(e)=>onClick2(e,1)}><NavLink to={'/notcomplete'}>멘토 검색</NavLink></li>
            <li onClick={(e)=>onClick2(e,2)}><NavLink to={'/notcomplete'}>멘토 칭찬</NavLink></li>   
          </ol>
    )
  }
  
  const SubMenu6 = () => {
    return(
      <ol className='menu_dep2'>
        <li onClick={(e)=>onClick2(e,0)}><NavLink to={'/contact'}>연락처 안내</NavLink></li>
        <li onClick={(e)=>onClick2(e,1)}><NavLink to={'/archive/video'}>자료실</NavLink></li>
        <li onClick={(e)=>onClick2(e,2)}><NavLink to={'/notice'}>공지사항</NavLink></li>   
      </ol>
    );
  }
  const SubMenu7 = () => {
    
    return(
      <ol className='menu_dep2'>
        <li onClick={(e)=>onClick(e,0)}><NavLink>기업/회원 관리</NavLink></li>
        <li onClick={(e)=>onClick(e,2)}><NavLink>기자재 품목 관리</NavLink></li>
        <li onClick={(e)=>onClick(e,3)}><NavLink>기자재관리</NavLink></li>
        <li onClick={(e)=>onClick(e,4)}><NavLink>서비스항목관리</NavLink></li> 
        <li onClick={(e)=>onClick(e,5)}><NavLink>기/자재관리</NavLink></li> 
        <li><NavLink to={'/notcomplete'}>전문멘토관리</NavLink></li>   
        <li onClick={(e)=>onClick(e,6)}><NavLink>교육/행사관리</NavLink></li>   
      </ol>
    );
  }

  return (
    <>
    <ol className='menu'>
    <li className='dep2'><Link to="/didadmin/info/greetings">DID기술융합공작소</Link>
         <SubMenu1/>
    </li>
    <li className='dep2'> <Link to="/eqreservation/equip">장비 및 시설예약</Link>
          <SubMenu2/>
    </li>
    <li className='dep2'> <Link to="/mservice">시제품 제작 관리</Link>
          <SubMenu3/>
    </li>
    <li className='dep2'> <Link to="/classprogram">교육/행사</Link>
          <SubMenu4/>
    </li>
    <li className='dep2'> <Link onClick={() => { dispatch({ type: CHANGE_CATEGORY, target: 0 }); }} to="/mmaterial">자재 관리</Link>
    </li>
    <li className='dep2'> <Link to="/notcomplete">멘토링</Link>
          <SubMenu5/>
    </li>
 
  
    <li className='dep2'> <Link onClick={() => { dispatch({ type: CHANGE_MENU, target: 0 }); }} to="/management">운영 관리</Link>
          <SubMenu7/>
    </li>
    <li className='dep2'> <Link to="/contact">Contact</Link>
          <SubMenu6/>
    </li>
    </ol>
    </>
    );
};

export default function Menu({ authority_level }) {
  const path1='/uservice';
  const path2='/notauthhorized'
  let history= useNavigate();
  //const classes = useStyles();

  const CurrentMenu = useCallback((authority_level > 1) ? AdminMenu : UserMenu);

  return (
    <div className="btn_box">
      <CurrentMenu history={history} />
    </div >
  );
}

/*
    <BrowserRouter>
        <div id="menu" float="right">
            <ul>
                <li><Link to="/uguide">이용안내</Link></li>
                <li><Link to="/uservice">서비스 이용</Link></li>
                <li><Link to="/mservice">서비스 관리</Link></li>
                <li><Link to="/mschedule">스케쥴 관리</Link></li>
                <li><Link to="/mmaterial">자재 관리</Link></li>
                <li><Link to="/management">운영 관리</Link></li>
            </ul>
        </div >
        <Route exact path="/" component={Home} />
        <Route path="/uguide" component={About} />
        <Route path="/uservice" component={Topics} />
        <Route path="/mservice" component={Topics} />
        <Route path="/mschedule" component={Topics} />
        <Route path="/mmaterial" component={Topics} />
        <Route path="/management" component={Topics} />
    </BrowserRouter>
*/
