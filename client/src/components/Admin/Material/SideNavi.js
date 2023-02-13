import React, { useEffect, useRef, useCallback } from 'react';
import { CommonHeader, PreUri, Method } from '../../../CommonCode';
import { useSelector, useDispatch } from "react-redux";
import { SET_CATEGORY/*, CHANGE_CATEGORY */} from "../../../store/material";
//import {useLocation,useNavigate/* ,useParams */} from 'react-router-dom';
import { SubBread } from '../../contents/SubSideMenu';
import '../../../css/common-s.css';
import '../../../css/style-s.css';

// import ReactTooltip from 'react-tooltip';

export default function ({ onCategory, viewDepth }) {
	const dispatch = useDispatch();
  const mountedRef = useRef(true);
  //const location = useLocation();
  //const history = useNavigate();
	const { token } = useSelector(state => state.user);
	const { categoryList, categoryIndex } = useSelector(state => state.material);


  const getCategoryList = useCallback(async () => {
      CommonHeader.authorization = token;

  
      if (!token) return;
      let response = await fetch(PreUri + '/material/list/category', {
          method: Method.get,
          headers: CommonHeader
      });

  if (!response.ok) {
          console.log('잘못된 접근입니다.');
          return;
  }

  const jsonCategory = await response.json();
  if (!mountedRef.current) { return }
  if (jsonCategory.length > 0) {
    console.log('set_category')
    dispatch({ type: SET_CATEGORY, target: jsonCategory });
  }

  }, [token, dispatch]);
/*
    useEffect(() => {
		    getCategoryList();
        return () => {
            mountedRef.current = false
        }
    }, [getCategoryList])
    */
    useEffect(() => {
      getCategoryList();
      return () => {
          mountedRef.current = false;
      }
  }, [token])
    /*
    const Dep2Handler = (e) => {
      const classOnTarget = e.target.parentElement;
      const onRemoveTarget = classOnTarget.parentElement.children;
    
      if (classOnTarget.classList.contains("on")) {
        classOnTarget.classList.remove("on");
      } else {
        for (let i = 0; i < onRemoveTarget.length; i++) {
          onRemoveTarget[i].classList.remove("on");
        }
        classOnTarget.classList.add("on");
        
      }
	  };
    */

    const sideNavi = [];
    for (let i = 0; i < categoryList.length; i++) {
        sideNavi.push(
        <li className={categoryIndex === i ? "on":""} key={i} onClick={(e) => onCategory(e, i)}>
           <p >{categoryList[i].name}</p>
        </li>)
    }
   
    return (
      <div className="sub_side_menu">
        <SubBread title={"자재관리"}></SubBread>	
        <div className="sub_modal">
            <ol>
                {sideNavi}
            </ol>
        </div>
      </div>

    );
}
