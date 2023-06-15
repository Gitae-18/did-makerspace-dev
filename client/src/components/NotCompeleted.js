import React,{useState}from 'react';
import PopupModal from './Modals/PopupModal';
import '../css/common-s.css';
import '../css/style-s.css';

export default function () {
    const [modalVisible,setModalVisible] = useState(true);
    const closeModal = () =>{
      setModalVisible(false);
    }
    return (
        <div id="wrap" className="wrap join4">
            <div className="content_wrap">
                <div className="inner_wrap">
                {modalVisible && (<PopupModal visible={modalVisible} closable={true} maskClosable={true} onClose={closeModal}></PopupModal>)}
                    <div className="text_box">
                        <img src="/images/ico_alert.png" alt="alear" />
                        <p>페이지 업데이트중 입니다.</p>
                    </div>
                    <div className="btn_box">
                        <a href="/" className="btn_join">홈으로</a>
                        {/* <a href="/join" className="btn_join">회원가입</a> */}
                    </div>
                </div>
            </div>
        </div>
    );
}
