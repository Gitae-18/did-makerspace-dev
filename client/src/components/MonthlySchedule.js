import React from 'react'
import SubSideMenu from './contents/SubSideMenu'
export default function () {

    return (
        <div id="wrap" className='wrap mnthschd'>
            <div className="content_wrap">
            <SubSideMenu title="월간일정"/>
                <div className="inner_wrap">
                    <iframe title="ggschedule" src="https://calendar.google.com/calendar/embed?src=hhe2i0tv2f1303kbro1khcn210%40group.calendar.google.com&ctz=Asia%2FSeoul"
                        style={{ border: "0px", width: "1230px", height: "700px", frameborder: "0px", scrolling: "no",margin:"auto 0" ,left:"40px",position:"relative"}} />
                </div>
            </div>
        </div>
    )
}