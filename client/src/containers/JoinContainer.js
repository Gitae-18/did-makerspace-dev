import React, { useCallback, /* useMemo */ } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import PersonalInfo from "../components/PersonalInfo";
import JoinForm from "../components/JoinForm";
import JoinSuccess from "../components/JoinSuccess";
import {
    CHANGE_INPUT, CHECK_EMAIL_SUCCESS,
    CHANGE_CHECKBOX, USER_ADDRESS, USER_ZIP,
    COMPANY_ADDRESS, COMPANY_ZIP, CLEAR
} from "../store/userInfo";
import { CommonHeader, PreUri, Method } from '../CommonCode';
import qs from 'qs';

export const JoinContainer = (props) => {
    const value = useSelector(state => state.userInfo);
    const dispatch = useDispatch();
    const { location } = useLocation;
    const history = useNavigate();
    const { search } = useLocation();
    const onCheckEmail = useCallback(async (e) => {
        dispatch({ type: CHECK_EMAIL_SUCCESS, value: false });

        let emailRegex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;//이메일 정규식
        if (!emailRegex.test(value.user.email)) {
            alert('잘못된 이메일 형식입니다.');
            return false;
        }

        const response = await fetch(PreUri + '/user/checkId', {
            method: Method.post,
            body: JSON.stringify({
                "email": value.user.email,
            }),
            headers: CommonHeader,
        });

        if (!response.ok) {
            switch (response.status) {
                case 400: alert('잘못된 정보입니다.'); break;
                case 404: alert('페이지를 찾을 수 없습니다.'); break;
                case 500: alert('서버 문제'); break;
                default: alert('Unknown Error'); break;
            }
            return;
        }

        const json = await response.json();
        console.log(json.result);

        if (json.result === 'success') {
            dispatch({ type: CHECK_EMAIL_SUCCESS, value: true });
            alert('가입이 가능합니다');
        } else {
            alert('이미 사용중입니다');
        }
    }, [value, dispatch]);

    const onJoinTry = useCallback(async (e) => {
        e.preventDefault();

        if (!value.user.email || !value.user.password || !value.user.passwordConfirm ||
            !value.user.name || !value.user.phoneNumber || !value.user.zip || !value.user.address ||
            (value.isAddCompanyInfo &&
                (!value.company.name || !value.company.registrationNumber || !value.company.businessField))) {

            alert('필수입력 항목이 비어있습니다. ')
            return;
        }

        if (value.isCheckedEmail === false) {
            alert('이메일 중복검사가 필요합니다.');
            return;
        }

        const passwordRegex = /^.*(?=^.{8,20}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
        if (!passwordRegex.test(value.user.password)) {
            alert('숫자, 문자, 특수문자(!@#$%^&+=)를 포함해 8 ~ 20자리로 입력해 주세요.');
            return;
        }

        if (value.user.password !== value.user.passwordConfirm) {
            alert('비밀번호 확인이 잘못되었습니다.');
            return;
        }

        //let phoneRegex = /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/;
        //const phoneRegex = /^\d{2,3}-\d{3,4}-\d{4}$/;
        const phoneRegex = /^\d{2,3}\d{3,4}\d{4}$/;
        if (!phoneRegex.test(value.user.phoneNumber)) {
            alert('잘못된 전화번호 형식입니다. 숫자만 입력해 주세요.');
            return;
        }

        if (value.isAddCompanyInfo && value.company.phoneNumber.length > 0 &&
            !phoneRegex.test(value.company.phoneNumber)) {
            alert('잘못된 전화번호 형식입니다. 숫자만 입력해 주세요.');
            return;
        }

        let payload = {
            "email": value.user.email,
            "password": value.user.password,
            "name": value.user.name,
            "phone_number": value.user.phoneNumber,
            "zip": value.user.zip,
            "address": value.user.address,
            "address_detail": value.user.addressDetail,
            "co_position": value.user.position,
            "authority_level": 1,
            "policy_agree_flag": "Y",
            "privacy_agree_flag": "Y"
        }

        if (value.isAddCompanyInfo === true) {
            payload.co_add = value.isAddCompanyInfo;
            payload.co_name = value.company.name;
            payload.co_number = value.company.registrationNumber;
            payload.co_telephone = value.company.phoneNumber;
            payload.co_business = value.company.businessField;
            payload.co_zip = value.company.zip;
            payload.address = value.company.address;
            payload.address_detail = value.company.addressDetail;
        }

        const response = await fetch(PreUri + '/user/join', {
            method: Method.post,
            body: JSON.stringify(payload),
            headers: CommonHeader
        });

        if (!response.ok) {
            switch (response.status) {
                case 400: alert('이미 가입된 회원입니다.'); break;
                case 404: alert('페이지를 찾을 수 없습니다.'); break;
                case 500: alert('서버 문제'); break;
                default: alert('Unknown Error'); break;
            }
            return;
        }
        const json = await response.json();
        dispatch({ type: CLEAR });
        return history('/join?type=join_success',{replace:true});
    }, [value, dispatch, history]);

    const onInputChange = useCallback((e) => {
        e.preventDefault();
        const re = /^[0-9\b]+$/;

        if (e.target.name === 'company.registrationNumber' ||
            e.target.name === 'user.phoneNumber' ||
            e.target.name === 'company.phoneNumber') {
            if (e.target.value !== '' && !re.test(e.target.value)) {
                return;
            }
        }

        dispatch({ type: CHANGE_INPUT, target: e.target });
    }, [dispatch]);

    const onChangeCheckbox = useCallback((e) => {
        dispatch({ type: CHANGE_CHECKBOX, target: e.target });
    }, [dispatch]);

    const onNext = useCallback((e) => {
        e.preventDefault();
        //console.log(location);
        if (!value.isAgreeTerms || !value.isAgreePersonalInfo) {
            alert('체크필요');
            return;
        } else {
            return history('/join?type=join_form');
        }
    }, [value, history]);

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
            dispatch({ type: USER_ADDRESS, target: fullAddress });
            dispatch({ type: USER_ZIP, target: data.zonecode });
        } else {
            dispatch({ type: COMPANY_ADDRESS, target: fullAddress });
            dispatch({ type: COMPANY_ZIP, target: data.zonecode });
        }
    }, [dispatch]);

    const query = qs.parse(search, {
        ignoreQueryPrefix: true // /about?details=true 같은 쿼리 주소의 '?'를 생략해주는 옵션입니다.
    });
    console.log(query);
    const JoinPage = () => {
        switch (query.type) {
            case 'join_form':
                // console.log(value);
                if (value.isAgreeTerms && value.isAgreePersonalInfo) {
                    return <JoinForm onJoinTry={onJoinTry} onCheckEmail={onCheckEmail}
                        onCompletePostcode={onCompletePostcode} onInputChange={onInputChange}
                        onChangeCheckbox={onChangeCheckbox} value={value} />
                } else {
                    //alert('채크해');
                    history('/join',{replace:true});
                }
                break;
            case 'join_success':
                return <JoinSuccess />

            default:
                return <PersonalInfo onNext={onNext} onChangeCheckbox={onChangeCheckbox} value={value} />
        }
    }

    return (
        <> {JoinPage()} </>
    )
}