import React  from 'react'

import '../css/common.css';
import '../css/style.css';

export default function ({onInputChange, onBtnDrop, onBtnCancel, email, value}) {
    return (
        <div id="wrap" className="wrap myInfo3">
            <div className="content_wrap">
                <div className="inner_wrap">
                    <h2>회원 탈퇴</h2>
                    <span>*필수입력</span>
                    <div className="join_box">
                        <p className="alert"><img src="/images/ico_alert_s.png" alt="img" />탈퇴하는 경우 악용 방지를 위해 일정 기간 또는 영구적으로 재가입이 제한됩니다.</p>
                        <table>
                            <tbody>
                                <tr>
                                    <th>아이디 (이메일 주소)</th>
                                    <td><input type="text" disabled={true} readOnly={true} defaultValue={email} /></td>
                                </tr>
                                <tr className="enter"></tr>
                                <tr>
                                    <th>*비밀번호</th>
                                    <td><input type="password" maxLength={20} value={value.password} name="password" placeholder="비밀번호" onChange={onInputChange} /></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="btn_box">
                        <button type="button" onClick={onBtnCancel} className="cancel">취소</button>
                        <button type="button" onClick={onBtnDrop} className="quit">탈퇴</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
