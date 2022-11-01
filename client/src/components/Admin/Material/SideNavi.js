import React, { useEffect, useRef, useCallback } from 'react';
import { CommonHeader, PreUri, Method } from '../../../CommonCode';
import { useSelector, useDispatch } from "react-redux";
import { SET_CATEGORY/*, CHANGE_CATEGORY */} from "../../../store/material";
import {useLocation,useNavigate,useParams} from 'react-router-dom';
import '../../../css/common-s.css';
import '../../../css/style-s.css';

// import ReactTooltip from 'react-tooltip';

export default function ({ onCategory, viewDepth }) {
	const dispatch = useDispatch();
    const mountedRef = useRef(true);
    const location = useLocation();
    const history = useNavigate();
	const { token } = useSelector(state => state.user);
	const { categoryList, categoryIndex } = useSelector(state => state.material);

    const getCategoryList = useCallback(async () => {
        CommonHeader.authorization = token;
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
            dispatch({ type: SET_CATEGORY, target: jsonCategory });
		}

    }, [token, dispatch]);

    useEffect(() => {
		getCategoryList();
        return () => {
            mountedRef.current = false
        }
    }, [getCategoryList])

    const sideNavi = [];
    for (let i = 0; i < categoryList.length; i++) {
        sideNavi.push(<li onClick={(e) => onCategory(e, i)} className={categoryIndex === i ? "on" : ""}
            key={i} /*data-tip={categoryList[i].name}*/>{categoryList[i].name}</li>)
    }

    return (
        <div className="side_menu">
            <div className="inner_menu">
                <h2>자재 관리</h2>
                <ul>
                    {sideNavi}
                </ul>
                {/* <ReactTooltip place="right" type="dark" effect="solid" /> */}
            </div>
        </div>

    );
}
