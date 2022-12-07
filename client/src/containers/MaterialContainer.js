import React, { useEffect } from 'react';
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Material from '../components/Admin/Material/Material';
import MaterialList from '../components/Admin/Material/MaterialList';
import MaterialReg from '../components/Admin/Material/MaterialReg';
import MaterialItem from '../components/Admin/Material/MaterialItem';
import { AuthLevel } from '../CommonCode';
import qs from 'qs';    

export const MaterialContainer = () => {
    const location = useLocation();
    const history = useNavigate();
    const { isLoading, isLoggedIn, authority_level } = useSelector(state => state.user);

    const { search } = useLocation();
  
    const query = qs.parse(search, {
        ignoreQueryPrefix: true // /about?details=true 같은 쿼리 주소의 '?'를 생략해주는 옵션입니다.
    });
  
    useEffect(() => {
        if (isLoading) { return; }
        if (!isLoggedIn) { return history('/notmember',{replace:true}); }
        if (authority_level < AuthLevel.partner) { return history.replace('/notauthhorized',{replace:true}); }
	}, [isLoading, isLoggedIn, authority_level, history])
  
    let View;
    switch (query.view) {
        case 'list' : View = MaterialList; break;
        case 'reg' :  View = MaterialReg; break;
        case 'item' : View = MaterialItem; break;
        default: View = Material; break;
    }
   
    return (
        (isLoading || !isLoggedIn || authority_level < AuthLevel.partner) ? <></>
            : View ? <View location={location} history={history} query={query} /> : <></>
    )
}
