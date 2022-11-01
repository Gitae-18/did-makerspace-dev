import React, { useEffect } from 'react';
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Material from '../components/Admin/Material/Material';
import MaterialList from '../components/Admin/Material/MaterialList';
import MaterialReg from '../components/Admin/Material/MaterialReg';
import MaterialItem from '../components/Admin/Material/MaterialItem';
import { AuthLevel } from '../CommonCode';
import qs from 'qs';

export const MaterialContainer = (props) => {
    const { isLoading, isLoggedIn, authority_level } = useSelector(state => state.user);
    const location = useLocation();
    
    const query = location ==='?detail=true';
    const history = useNavigate();
    useEffect(() => {
        if (isLoading) { return; }
        if (!isLoggedIn) { return history.replace('/notmember'); }
        if (authority_level < AuthLevel.partner) { return history.replace('/notauthhorized'); }
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
            : View ? <View location={location} history={history} /> : <></>
    )
}
