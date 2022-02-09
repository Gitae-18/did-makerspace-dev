import React, { useEffect } from 'react';
import { AuthLevel } from '../CommonCode';
import { useSelector } from "react-redux";
import Company from '../components/Admin/Management/Company';
import CompanyReg from '../components/Admin/Management/CompanyReg';
import CompanyEdit from '../components/Admin/Management/CompanyEdit';
import User from '../components/Admin/Management/User';
import UserReg from '../components/Admin/Management/UserReg';
import UserEdit from '../components/Admin/Management/UserEdit';
import EquipmentCategory from '../components/Admin/Management/EquipmentCategory';
import EquipmentCategoryReg from '../components/Admin/Management/EquipmentCategoryReg';
import EquipmentCategoryEdit from '../components/Admin/Management/EquipmentCategoryEdit';
import Equipment from '../components/Admin/Management/Equipment';
import EquipmentReg from '../components/Admin/Management/EquipmentReg';
import EquipmentEdit from '../components/Admin/Management/EquipmentEdit';
import ServiceCategory from '../components/Admin/Management/ServiceCategory';
import ServiceCategoryReg from '../components/Admin/Management/ServiceCategoryReg';
import ServiceCategoryEdit from '../components/Admin/Management/ServiceCategoryEdit';
import MaterialCategory from '../components/Admin/Management/MaterialCategory';
import MaterialCategoryReg from '../components/Admin/Management/MaterialCategoryReg';
import MaterialCategoryEdit from '../components/Admin/Management/MaterialCategoryEdit';
import MaterialItem from '../components/Admin/Management/MaterialItem';
import MaterialItemReg from '../components/Admin/Management/MaterialItemReg';
import MaterialItemEdit from '../components/Admin/Management/MaterialItemEdit';
import OldServiceItem from '../components/Admin/Management/OldServiceItem';
import OldServiceItemReg from '../components/Admin/Management/OldServiceItemReg';
import OldServiceItemEdit from '../components/Admin/Management/OldServiceItemEdit';

import qs from 'qs';

const ListView = [Company, User, EquipmentCategory, Equipment, ServiceCategory, MaterialCategory, MaterialItem, OldServiceItem];
const RegView = [CompanyReg, UserReg, EquipmentCategoryReg, EquipmentReg, ServiceCategoryReg, MaterialCategoryReg, MaterialItemReg, OldServiceItemReg];
const EditView = [CompanyEdit, UserEdit, EquipmentCategoryEdit, EquipmentEdit, ServiceCategoryEdit, MaterialCategoryEdit, MaterialItemEdit, OldServiceItemEdit];

export const ManagementContainer = ({ location, history }) => {
    const { isLoading, isLoggedIn, authority_level } = useSelector(state => state.user);
    const { sideNaviPos } = useSelector(state => state.management);

    const query = qs.parse(location.search, {
        ignoreQueryPrefix: true // /about?details=true 같은 쿼리 주소의 '?'를 생략해주는 옵션입니다.
    });

    useEffect(() => {
        if (isLoading) { return; }
        if (!isLoggedIn) { return history.replace('/notmember'); }
        if (authority_level < AuthLevel.manager) { return history.replace('/notauthhorized'); }
	}, [isLoading, isLoggedIn, authority_level, history])

    let View;
    if (query.reg) {
        View = RegView[Number(query.reg) - 1];
    } else if (query.edit) {
        View = EditView[Number(query.edit) - 1];
    } else {
        View = ListView[sideNaviPos];
    }

    return (
        (isLoading || !isLoggedIn || authority_level < AuthLevel.manager)
            ? <></>
            : View ? <View location={location} history={history} query={query} /> : <></>
    );
}
