import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector } from "react-redux";
import { CommonHeader, PreUri, Method, getRspMsg, /*AuthLevel, MaxFileCount, MB, LIMIT*/ } from '../../CommonCode';
import UServiceNavi from './ServiceNavi';
import { useLocation,useNavigate } from 'react-router';
import '../../css/common-s.css';
import '../../css/style-s.css';

export default function ({ no }) {
    const mountedRef = useRef(true);
    const { token } = useSelector(state => state.user);
    const location = useLocation();
    const history = useNavigate();
    const [isSurveyDone, setIsSurveyDone] = useState(false); 
    const [surveyList, setSurveyList] = useState([{
        ask_text: "본 서비스 자원이 필요하다고 느껴지는 정도는?",
        answer: 0,
    }, {
        ask_text: "제품화 지원센터 서비스가 도움이 된다고 생각합니까?",
        answer: 0,
    }, {
        ask_text: "본 서비스 자원이 필요하다고 느껴지는 정도는?",
        answer: 0,
    }, {
        ask_text: "본 서비스 지원의 전반적인 만족도는 어떠합니까?",
        answer: 0,
    }, {
        ask_text: "서비스 지원 처리 속도가 어떠합니까?",
        answer: 0,
    }, {
        ask_text: "서비스 지원 담당자와 소통이 잘 되었습니까?",
        answer: 0,
    }, {
        ask_text: "서비스 요청에 따른 결과가 잘 나왔습니까?",
        answer: 0,
    }, {
        ask_text: "서비스 지원장소와 시설은 어떠합니까?",
        answer: 0,
    }]);

    const [surveyText, setSurveyText] = useState('');

    const presetSurvey = useCallback(async () => {
        CommonHeader.authorization = token;
        const response = await fetch(PreUri + '/service/' + no + '/survey', {
            method: Method.get,
            headers: CommonHeader,
        });

        if (!response.ok) {
            alert(getRspMsg(response.status));
            return;
        }

        if (response.status === 204) {
            return;
        }

        const json = await response.json();
        if (!mountedRef.current) { return }

        if (json.answer_numbers) {
            let copy = [...surveyList];
            const split = json.answer_numbers.split(',');
            for (let i = 0; i < split.length; i++ ) {
                copy[i].answer = Number(split[i]);
            }
            setSurveyList(copy);
        }

        setSurveyText(json.answer_text ? json.answer_text : undefined);
        setIsSurveyDone(true);

    }, [surveyList, no, token]);

    useEffect(() => {
        if (!no) {
            alert('Error : Service Number');
            return;
        }

        presetSurvey();
        return () => {
            mountedRef.current = false
        }
    }, [no, presetSurvey])

    const onChange = useCallback((e, index) => {
        let copy = [ ...surveyList ];
        copy[index].answer = Number(e.target.value);
        setSurveyList(copy);
    }, [surveyList]);

    const onChangeText = useCallback((e) => {
        setSurveyText(e.target.value);
    }, []);

    const onDone = useCallback(async (e) => {
        e.preventDefault();

        if (isSurveyDone) {
            //alert("이미 작성을 완료하셨습니다.");
            history(-1);
            return;
        }

        let answer_numbers = "";
        for (let i = 0; i < surveyList.length; i++) {
            if (surveyList[i].answer === 0) {
                alert((i + 1) + "번 항목을 선택해 주시기 바랍니다");
                return;
            }

            answer_numbers += surveyList[i].answer;
            if ((i + 1) < surveyList.length) {
                answer_numbers += ',';
            }
        }

        CommonHeader.authorization = token;
        const response = await fetch(PreUri + '/service/' + no + '/survey', {
            method: Method.post,
            headers: CommonHeader,
            body: JSON.stringify({
                answer_numbers,
                answer_text: (surveyText.length > 0) ? surveyText : undefined
            })
        });

        if (!response.ok) {
            alert(getRspMsg(response.status));
            return;
        }

        setIsSurveyDone(true);
        history(-1);
    }, [surveyList, surveyText, isSurveyDone, token, no, history]);

    const AskItem = useCallback(({index, item, onChange}) => {
        const val = index * 5;
        const id = [val + 1, val + 2, val + 3, val + 4, val + 5];
        return (
            <div className="qu qu1">
                <h3>{(index + 1) + '. ' + item.ask_text}</h3>
                <div className="option">
                    <p><label htmlFor={id[0]}><input type="radio" id={id[0]} value={5} checked={item.answer === 5 ? true : false} onChange={onChange} /> 매우만족</label></p>
                    <p><label htmlFor={id[1]}><input type="radio" id={id[1]} value={4} checked={item.answer === 4 ? true : false} onChange={onChange} /> 만족</label></p>
                    <p><label htmlFor={id[2]}><input type="radio" id={id[2]} value={3} checked={item.answer === 3 ? true : false} onChange={onChange} /> 보통</label></p>
                    <p><label htmlFor={id[3]}><input type="radio" id={id[3]} value={2} checked={item.answer === 2 ? true : false} onChange={onChange} /> 불만족</label></p>
                    <p><label htmlFor={id[4]}><input type="radio" id={id[4]} value={1} checked={item.answer === 1 ? true : false} onChange={onChange} /> 매우 불만족</label></p>
                </div>
            </div>);
    }, []);

    let SurveyAsk = [];
    for (let i = 0; i < surveyList.length; i++) {
        SurveyAsk.push(<AskItem index={i} item={surveyList[i]} onChange={(e) => onChange(e, i)} key={i} />);
    }

    return (
        <div id="wrap" className='wrap utilize13'>
            <div className="content_wrap">
                <div className="inner_wrap">
                    <div className="top_menu">
                        <UServiceNavi step={5} />
                    </div>
                    <h2>서비스 이용 설문</h2>
                    <div className="form">
                        {SurveyAsk}
                        <div className={"qu qu1"}>
                            <h3>9. 기타의견</h3>
                            <textarea readOnly={isSurveyDone} value={surveyText} onChange={onChangeText} ></textarea>
                        </div>
                    </div>
                    <button className="btn_complete" onClick={onDone}>{isSurveyDone ? "뒤로 가기" : "작성 완료"} </button>
                </div>
            </div>
        </div>
    );
}
