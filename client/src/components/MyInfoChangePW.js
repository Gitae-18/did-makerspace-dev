import React from 'react'

import '../css/common.css';
import '../css/style.css';

export default function ({onInputChange, onBtnChangePW, onBtnCancel, value}) {
    return (
        <div id="wrap" className="wrap myInfo2">
            <div className="content_wrap">
                <div className="inner_wrap">
                    <h2>비밀번호 변경</h2>
                    <span>*필수입력</span>
                    <div className="join_box">
                        <table>
                            <tbody>
                                <tr>
                                    <th>*현재 비밀번호</th>
                                    <td><input type="password" maxLength={20} value={value.password} name="password" placeholder="현재 비밀번호" onChange={onInputChange}/></td>
                                </tr>
                                <tr className="enter"></tr>
                                <tr>
                                    <th>*비밀번호</th>
                                    <td><input type="password" maxLength={20} value={value.newPassword} name="newPassword" placeholder="신규 비밀번호" onChange={onInputChange}/></td>
                                </tr>
                                <tr className="enter"></tr>
                                <tr>
                                    <th>*비밀번호 확인</th>
                                    <td><input type="password" maxLength={20} value={value.newPasswordConfirm} name="newPasswordConfirm" placeholder="비밀번호 확인" onChange={onInputChange}/></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="btn_box">
                        <button type="button" onClick={onBtnCancel} className="cancel">취소</button>
                        <button type="button" onClick={onBtnChangePW} className="modify">변경</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
