import { parseWithOptions } from "date-fns/fp";
import { useSelector } from "react-redux";
import React,{useCallback,useState,useLayoutEffect} from "react";
import {useLocation,useNavigate} from "react-router-dom";
import { Link } from "react-router-dom";
import { MdHome,MdChevronRight } from "react-icons/md";

export default function SubSideMenu(props) {
  const [sidebar,setSidebar] = useState(false);
  const [isSpace,setIsSpace] = useState(false);
  const [click,setClick] = useState(false);
  const [isCompany,setIsCompany] = useState(false);
  const url = useLocation();
  const location = useLocation();
  const history = useNavigate();
  const { authority_level } = useSelector(state => state.user);
  console.log(url.pathname.split('/')[1])
  console.log(isSpace)

  const SubModal = () => {
    
    const showSidebar = () => setSidebar(true);
    const Dep2Handler = (e) => {
      const classOnTarget = e.target.parentElement;
      const onRemoveTarget = classOnTarget.parentElement.children;
      
/*       if(!url.pathname.split('/')[1].includes("info")){
       
      }
      else if (classOnTarget.classList.contains("on")) {
        
      }
      else{
        for (let i = 0; i < onRemoveTarget.length; i++) {
         
        }
        classOnTarget.classList.add("on");
      } */
      if (classOnTarget.classList.contains("on")) {
        classOnTarget.classList.remove("on");
      }
      else {
        for (let i = 0; i < onRemoveTarget.length; i++) {
          onRemoveTarget[i].classList.remove("on");
        }
        classOnTarget.classList.add("on");
      }
    };
    useLayoutEffect((Dep2Handler)=>{
      
    },[url.pathname])
    const Dep3Handler = (e,props) => {
      const classOnTarget = e.target;
      //props.setValue(e.target.value);
      const onRemoveTarget = classOnTarget.parentElement.children;
      for (let i = 0; i < onRemoveTarget.length; i++) {
        onRemoveTarget[i].classList.remove("on");
      }
      classOnTarget.classList.add("on");
    };

  const SubModal01 = (props) => {

      return (
        <ol>
          <li>
            <p onClick={Dep2Handler}>????????????</p>
            <ol className="has_dep3">
              <li onClick={Dep3Handler}   value="space"><Link to={"/didinfo"}> ???????????? </Link></li>
              <li onClick={Dep3Handler}   value="equip"><Link to={"/info/equipinfo"}> ???????????? </Link></li>
              <li onClick={Dep3Handler}   value="work"><Link to={"/info/workerinfo"}>??????????????????</Link></li>
            </ol>
          </li>
          <li>
            <p onClick={Dep2Handler}>????????????</p>
            <ol className="has_dep3">
              <li onClick={Dep3Handler}><Link to={"/info/greetings"}>?????????</Link></li>
              <li onClick={Dep3Handler}><Link to ={"/info/vision"}>??????/??????</Link></li>
              <li onClick={Dep3Handler}><Link to ={"/info/organization"}>?????????</Link></li>
              <li onClick={Dep3Handler}><Link to ={"/info/partner"}>??????????????????</Link></li>
            </ol>
          </li>
          <li>
         <p onClick={Dep2Handler}><Link to ={"/info/way"} onClick={Dep2Handler}>????????? ???</Link></p>
          </li>
          <li>
          <p onClick={Dep2Handler}><Link to ={"/info/faq"}  tag="div">FAQ</Link></p>
          </li>
        </ol>
      );
    };
    const SubModal02 = () => {
      return (
        <ol>
          <li>
          <p onClick={Dep2Handler}><Link to={"/didreservation"}>?????? ??????</Link></p>
          </li>
          <li>
          <p onClick={Dep2Handler}><Link to={"/reservation/space"}>?????? ??????</Link></p>
          </li>
          <li>
          <p onClick={Dep2Handler}><Link to={"/reservation/lab"}>?????? ??? ??????</Link></p>
          </li>
        </ol>
      );
    };
    const SubModal03_1 = () =>{
      return (
        <ol>
          <li>
            <p onClick={Dep2Handler}>????????? ?????? </p>
              <ol className="has_dep3"></ol>
              <li onClick={Dep3Handler} value="space"><Link to={"/uservice"}> ????????? ?????? ?????? </Link></li>
              <li onClick={Dep3Handler} value="equip"><Link to={"/uservice"}> ????????? ?????? ?????? </Link></li>
          </li>
          <li>
            <p onClick={Dep2Handler}>?????? ?????? ??????</p>
          </li>
        </ol>
      );
    }
    const SubModal03_2 = () => {
      return (
        <ol>
          <li>
            <p onClick={Dep2Handler}>????????? ?????? ??????</p>
          </li>
          <li>
            <p onClick={Dep2Handler}>?????? ?????? ??????</p>
          </li>
        </ol>
      );
    };
    const SubModal04 = () => {
      return (
        <ol>
          <li>
            <p onClick={Dep2Handler}> <Link to={"/mentoring"}>????????? ??????</Link></p>
          </li>
          <li>
            <p onClick={Dep2Handler}><Link to={'/notcompelete'}>?????? ??????</Link></p>
          </li>
          <li>
            <p onClick={Dep2Handler}><Link to={'/notcompelete'}>?????? ??????</Link></p>
          </li>
        </ol>
      );
    };
    const MentoringUser = () =>{
      return(
        <ol>
          <li>
            <p onClick={Dep2Handler}> <Link to={"/umentoring"}>?????????</Link></p>
              <ol className="has_dep3">
              <li onClick={Dep3Handler} value="mentoring_application"><Link to={"/umentoring"}> ????????? ??????</Link></li>
              </ol>
          </li>
          <li>
            <p onClick={Dep2Handler}><Link to={"/notcomplete"}> ?????? ??????</Link></p>
          </li>
          <li>
            <p onClick={Dep2Handler}><Link to={"/notcomplete"}> ?????? ??????</Link></p>
          </li>
          <li>
            <p onClick={Dep2Handler}><Link to={"/notcomplete"}> ????????? ?????????</Link></p>
          </li>
        </ol>
      );
    }
    const SubModal05 = () => {
      return (
        <ol>
          <li onClick={(e)=>setClick(true)} >
            <p className={click===true?"on":""} onClick={()=>history('/classprogram')}>?????? ????????????</p>
          </li>
          <li>
            <p onClick={(e)=>{Dep2Handler(e);history('/eduprogram');}}>?????? ????????????</p>
          </li>
        </ol>
      );
    };
    const SubModal06 = () => {
      return (
        <ol>
          <li>
            <p onClick={Dep2Handler}>??????/?????? ??????</p>
            <ol className="has_dep3">
              <li onClick={Dep3Handler}>?????? ??????</li>
              <li onClick={Dep3Handler}>?????? ??????</li>
            </ol>
          </li>
          <li>
            <p onClick={Dep2Handler}>?????????/?????? ??????</p>
          </li>
          <li>
            <p onClick={Dep2Handler}>????????? ?????? ??????</p>
          </li>
          <li>
            <p onClick={Dep2Handler}>?????? ?????? ??????</p>
            <ol className="has_dep3">
              <li onClick={Dep3Handler}>?????? ?????? ??????</li>
              <li onClick={Dep3Handler}>?????? ?????? ??????</li>
              <li onClick={Dep3Handler}>?????? ?????? ??????</li>
              <li onClick={Dep3Handler}>????????? ?????????</li>
            </ol>
          </li>
          <li>
            <p onClick={Dep2Handler}>??????/?????? ??????</p>
            <ol className="has_dep3">
              <li onClick={Dep3Handler}>?????? ??????</li>
              <li onClick={Dep3Handler}>?????? ??????</li>
            </ol>
          </li>
          <li>
            <p onClick={Dep2Handler}>??????/?????? ??????</p>
          </li>
        </ol>
      );
    };
    const SubModal07 = () => {
      return (
        <ol>
          <li>
            <p onClick={Dep2Handler}><Link to={'/contact'}>????????? ??????</Link></p>
          </li>
          <li>
            <p onClick={Dep2Handler}>?????????</p>
            <ol className="has_dep3">
              <li onClick={Dep3Handler}><Link to ={'/archivecontact/video'}>?????? ??????</Link></li>
              <li onClick={Dep3Handler}><Link to ={'/archivecontact/text'}>?????? ??????</Link></li>
              <li onClick={Dep3Handler}><Link to ={'/archivecontact/basic'}>?????? ?????? ??????</Link></li>
            </ol>
          </li>
          <li>
            <p onClick={Dep2Handler}><Link to ={'/notice'}>????????????</Link></p>
          </li>
        </ol>
      );
    };
    const SubModal08 = () => {
      return (
        <ol>
          <li>
            <p onClick={Dep2Handler}>?????????????????????</p>
            <ol className="has_dep3">
              <li onClick={Dep3Handler}><Link to ={'/mservice'}>?????????????????????</Link></li>
            </ol>
          </li>
          <li>
            <p onClick={Dep2Handler}><Link to ={'/mservice/guide'}>?????????????????????</Link></p>
          </li>
        </ol>
      );
    };
   const SubModal09 = () =>{
    const { token } = useSelector(state => state.user);
    return(
      <ol>
          <li>
            <p onClick={Dep2Handler}>???????????????</p>
            <ol className="has_dep3">
              <li onClick={Dep3Handler}><Link to ={'/uservice'}>????????????</Link></li>
              <li onClick={Dep3Handler}><Link to ={location.pathname + '?step=2&next=app'}>????????????</Link></li>
            </ol>
          </li>
          <li>
            <p onClick={Dep2Handler}><Link to ={'/noticecontact'}>?????????????????????</Link></p>
          </li>
        </ol>
    )
   }
   const SubModalControl = () =>{
    const { token } = useSelector(state => state.user);
    return(
      <ol>
          <li>
            <p onClick={Dep2Handler}>??????/????????????</p>
            <ol className="has_dep3">
              <li onClick={Dep3Handler}><Link to ={'/management'}>????????????</Link></li>
              <li onClick={Dep3Handler}><Link to ={'/management/member'}>????????????</Link></li>
            </ol>
          </li>
          <li>
            <p onClick={Dep2Handler}><Link to ={'/management/ecategory'}>????????? ?????? ??????</Link></p>
          </li>
          <li>
            <p onClick={Dep2Handler}>?????????/????????????</p>
            <ol className="has_dep3">
              <li onClick={Dep3Handler}><Link to ={'/management/equipment'}>???????????????</Link></li>
              <li onClick={Dep3Handler}><Link to ={'/management/material'}>????????????</Link></li>
            </ol>
          </li>
          <li>
            <p onClick={Dep2Handler}><Link to ={'/management/servicecategory'}>?????????????????????</Link></p>
          </li>
          <li>
            <p onClick={Dep2Handler}><Link to ={'/management/mdepart'}>??????????????????</Link></p>
          </li>
          <li>
            <p onClick={Dep2Handler}><Link to ={'/management/mitem'}>??????????????????</Link></p>
          </li>
         
        </ol>
    )
   }

    return (
      <>
      <div className="sub_modal"  sidebar={!sidebar}>
        {url.pathname.includes("info") === true ? <SubModal01 isOpened={isSpace}/> 
        : url.pathname.includes("reservation") === true? <SubModal02/>:
        url.pathname.includes("mentor") === true && authority_level > 1?<SubModal04/>
        :url.pathname.includes('mentor')===true && authority_level<10? <MentoringUser/>
        :url.pathname.includes("program")===true?<SubModal05/>
        :url.pathname.includes("contact")||url.pathname.includes("notice") === true?<SubModal07/>
        :url.pathname.includes("mservice")===true && authority_level>10?<SubModal08/>
        :url.pathname.includes("uservice")===true && authority_level<10?<SubModal09/>:<SubModal06/>}
      </div>
      </>
      )
    }

  
  // ????????? ????????? ????????? SubBread ????????? ??????

  return (
    <div className="sub_side_menu">
      <SubModal></SubModal>
      <SubBread title={props.title} subtitle={props.subtitle}></SubBread>
    </div>
  );
  };

  export const SubBread = (props) => {
    const [currentTitle,setCurrentTitle] = useState('????????????');
    const [currentsubmenu,setCurrentSubmenu] = useState('????????????');
    const dataLabels = [
      {
        title: '?????? ??????',
         submenu : [
         {
           title: '?????? ??????',
            index : 1
         },
         {
           title: '?????? ??????',
           index : 2
         },
          {
           title: "??????????????????",
           index : 3
          }
        ]
      },
      {
        title : '?????? ??????',
        submenu : [
          {
            title: '?????????',
             index : 1
          },
          {
            title: '??????/??????',
            index : 2
          },
           {
            title: "?????????",
            index : 3
           },
           {
            title: "??????????????????",
            index : 4
           }
         ]
      },
      {
        title : '????????? ???'
      },
      {
        title : 'FAQ'
      }
    ]
    let style={
      position:"relative",
      left:"10px"
    }
    return (
      <div className="sub_bread">
        <h1>{props.subtitle ? props.subtitle:props.title}</h1>
        <div className="location">
        <MdHome className="homeicon" style={!props.subtitle?{"left":"20px"}:{"left":"25px"}}/>
        <h3>{props.subtitle}</h3>
        {props.subtitle ? <span style={props.subtitle.length < 5?{"left":"20px"}:{"left":"10px"}}><MdChevronRight className="arrowicon"/></span>:<></>}
        <h2>{props.title}</h2>
        </div>
      </div>
    );
  };