import React, { useEffect, useState, useCallback, /* useMemo */ } from 'react';
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from 'react-router-dom';
import MyInfo from "../components/MyInfo";
import { MyInfoChangePWContainer as MyInfoChangePW } from "./MyInfoChangePWContainer";
import { MyInfoDropContainer as MyInfoDrop } from "./MyInfoDropContainer";
//import JoinSuccess from "../components/JoinSuccess";
//import  user from '../store/user';
import { CommonHeader, PreUri, Method } from '../CommonCode';
import qs from 'qs';
//import user from '../store/user';

export const MyInfoContainer = ({  }) => {
    const loginUser = useSelector(state => state.user);
    const location = useLocation();
    const history = useNavigate();
    //const dispatch = useDispatch();

    let header = CommonHeader;
    const [value, setValues] = useState({
        user: {
            email: '',
            password: '',
            name: '',
            phoneNumber: '',
            zip: '',
            address: '',
            addressDetail: '',
            position: '',
        },
        company: {
            name: '',
            registrationNumber: '',
            phoneNumber: '',
            businessField: '',
            zip: '',
            address: '',
            addressDetail: '',
        },
        isAddCompanyInfo: false,
    }); 
    const getMyInfo = useCallback(async () => {
        const response = await fetch(PreUri + '/user/myinfo', {
            method: Method.get,
            headers: header
        });

        if (!response.ok) {
            alert('잘못된 접근입니다.');
            return;
        }

        const json = await response.json();
        const hasComapny = (json.company === undefined || json.company === null) ? false : true;
        setValues(value => ({
            ...value,
            user: {
                ...value.user,
                email: json.email,
                name: json.name,
                phoneNumber: json.phone_number,
                zip: json.zip,
                address: json.address,
                addressDetail: (json.address_detail !== undefined) ? json.address_detail : '',
                position: (json.company_position !== undefined) ? json.company_position : '',
            },
            company: {
                ...value.company,
                name: (hasComapny) ? json.company.name : '',
                registrationNumber: (hasComapny) ? json.company.registration_number : '',
                phoneNumber: (hasComapny && json.company.telephone_number !== undefined) ? json.company.telephone_number : '',
                businessField: (hasComapny && json.company.business_field !== undefined) ? json.company.business_field : '',
                zip: (hasComapny && json.company.zip !== undefined) ? json.company.zip : '',
                address: (hasComapny && json.company.address !== undefined) ? json.company.address : '',
                addressDetail: (hasComapny && json.company.address_detail !== undefined) ? json.company.address_detail : '',
            },
            isAddCompanyInfo: (hasComapny) ? true : false,
        }));
    }, [header]);

    useEffect(() => {
        if (loginUser.isLoading) {
            return;
        }

        if (!loginUser.isLoggedIn) {
            return history('/notmember');
        }

        header.authorization = loginUser.token;
        getMyInfo();
    }, [getMyInfo, header, history, loginUser]);

    const onSubmit = useCallback(async (e) => {
        e.preventDefault();

        if (!value.user.password || !value.user.phoneNumber || !value.user.zip || !value.user.address ||
            (value.isAddCompanyInfo &&
                (!value.company.name || !value.company.registrationNumber || !value.company.businessField))) {
            alert('필수입력 항목이 비어있습니다. ')
            return;
        }

        const passwordRegex = /^.*(?=^.{8,20}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
        if (!passwordRegex.test(value.user.password)) {
            alert('숫자와 문자와 특수문자(!@#$%^&+=)를 포함한 8~20자리 이내로 입력해 주세요.');
            return;
        }

        const phoneRegex = /^\d{2,3}\d{3,4}\d{4}$/;
        if (!phoneRegex.test(value.user.phoneNumber)) {
            alert('잘못된 전화번호 입력입니다. 숫자, - 를 포함해 입력해 주세요.');
            return;
        }

        if (value.isAddCompanyInfo && value.company.phoneNumber.length > 0 &&
            !phoneRegex.test(value.company.phoneNumber)) {
            alert('잘못된 전화번호 입력입니다. 숫자, - 를 포함해 입력해 주세요.');
            return;
        }

        let payload = {
            "password": value.user.password,
            "phone_number": value.user.phoneNumber,
            "zip": value.user.zip,
            "address": value.user.address,
            "address_detail": value.user.addressDetail,
            "co_position": value.user.position
        }

        if (value.isAddCompanyInfo === true) {
            payload.co_add = value.isAddCompanyInfo;
            payload.co_name = value.company.name;
            payload.co_number = value.company.registrationNumber;
            payload.co_telephone = value.company.phoneNumber;
            payload.co_business = value.company.businessField;
            payload.co_zip = value.company.zip;
            payload.co_address = value.company.address;
            payload.co_address_detail = value.company.addressDetail;
        }

        const response = await fetch(PreUri + '/user/myinfo', {
            method: Method.put,
            body: JSON.stringify(payload),
            headers: CommonHeader
        });

        const json = await response.json();
        if (!response.ok) {
            switch (response.status) {
            case 400: alert(json.message); break;
            default: alert('Unknown Error'); break;
            }
            return;
        }

        // console.log(json);
        alert('수정되었습니다.');
        history(0);
    }, [value, history]);

    const onInputChange = useCallback((e) => {
        e.preventDefault();

        if (e.target.name === 'company.registrationNumber' ||
            e.target.name === 'user.phoneNumber' ||
            e.target.name === 'company.phoneNumber') {
            const re = /^[0-9\b]+$/;
            if (e.target.value !== '' && !re.test(e.target.value)) {
                return;
            }
        }

        let strArray = e.target.name.split('.');
        if (strArray[0] === 'user') {
            setValues({
                ...value,
                user: {
                    ...value.user,
                    [strArray[1]]: e.target.value,
                }
            });
        } else if (strArray[0] === 'company') {
            setValues({
                ...value,
                company: {
                    ...value.company,
                    [strArray[1]]: e.target.value,
                }
            });
        }
    }, [value]);

    const onChangeCheckbox = useCallback((e) => {
        setValues({
            ...value,
            isAddCompanyInfo: e.target.checked
        });
    }, [value]);

    const onCompletePostcode = useCallback((isUser, data) => {
        let fullAddress = (data.userSelectedType === 'R') ? data.roadAddress
            : (data.userSelectedType === 'J') ? data.jibunAddress
                : data.address;

        if (data.userSelectedType === 'R') {
            let extraAddress = '';
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
            }
            fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }

        if (isUser) {
            setValues({
                ...value,
                user: {
                    ...value.user,
                    zip: data.zonecode,
                    address: fullAddress
                }
            });
        } else {
            setValues({
                ...value,
                company: {
                    ...value.company,
                    zip: data.zonecode,
                    address: fullAddress
                }
            });
        }
    }, [value]);

    const onBtnChpw = useCallback((e) => {
        e.preventDefault();
        return history('/myinfo?type=chpw');
    }, [history]);

    const onBtnDrop = useCallback((e) => {
        e.preventDefault();
        return history('/myinfo?type=drop');
    }, [history]);

    const query = location ==='?detail=true';

    const CurrentPage = () => {
        switch (query.type) {
        case 'chpw':
            return <MyInfoChangePW location={location} history={history}/>
        case 'drop':
            return <MyInfoDrop location={location} history={history} email={value.user.email}/>
        default:
            return <MyInfo onSubmit={onSubmit}
                onCompletePostcode={onCompletePostcode}
                onInputChange={onInputChange}
                onChangeCheckbox={onChangeCheckbox}
                onBtnChpw={onBtnChpw}
                onBtnDrop={onBtnDrop}
                value={value} />
        }
    }

    return (
        <div> {CurrentPage()} </div>
    )
}
