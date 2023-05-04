import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CommonHeader, PreUri, Method, getFormatDate } from '../../../CommonCode';
import { useSelector } from "react-redux";
import {useLocation,useNavigate,useParams} from 'react-router-dom';
import FullCalendar/*, { formatDate }*/ from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import SubSideMenu from '../../contents/SubSideMenu';
import $ from "jquery";

import '../../../css/common-s.css';
import '../../../css/style-s.css';

/*
const colorTable = ['#0790e1', '#e3b7c9', '#fbc7ba', '#e0bd3c', '#0e753b', '#3747ac',
					'#8321a0', '#d21a55', '#ed6100', '#b8c32d', '#008b7d', '#6e7bc4',
					'#6e4b3f', '#cf0000', '#ee8800', '#71aa3a', '#aa92d6', '#565656',
					'#e27168', '#f5b722', '#2dad6e', '#3a7af2', '#945ea6', '#9d9083'];
*/

export default function () {

	const calendarRef = React.createRef()
    const mountedRef = useRef(true)
    const { token } = useSelector(state => state.user);

    const [selectInfo, setSelectInfo] = useState(null);
    const [eventInfo, setEventInfo] = useState(null);
	const [popupAddType, setPopupAddType] = useState(true);
	const [scheduleEvents, setScheduleEvents] = useState([]);
	const [scheduleContent, setScheduleContent] = useState('');
	const [lastScheduleContent, setLastScheduleContent] = useState('');
	
    const getSchedule = useCallback(async (date) => {
        CommonHeader.authorization = token;
        const response = await fetch(PreUri + '/schedule/date/' + date, {
            method: Method.get,
            headers: CommonHeader
        });

        if (!response.ok) {
            console.log('잘못된 접근입니다.');
            return;
        }

        const json = await response.json();
		if (!mountedRef.current) { return }
		setScheduleEvents(json);
    }, [token]);

    useEffect(() => {
		getSchedule(getFormatDate(new Date()));
        return () => {
            mountedRef.current = false
        }
	}, [getSchedule])

	const select = useCallback((selectInfo) => {
		let popupState = $('.pop').css('display');
		if (popupState === 'block') {
			$('.pop').css('display', 'none');
			return;
		}

		setPopupAddType(true);
		setSelectInfo(selectInfo);
		if (scheduleContent.length > 0) {
			setScheduleContent('');
		}

		$('.pop').css('display', 'block');
	}, [scheduleContent]);

	const selectPopup = useCallback(async (e, action) => {
		e.preventDefault();
		if (action === false) {
			return $('.pop').css('display', 'none');
		}

		if (scheduleContent.length <= 0) {
			alert('내용이 비어있습니다');
			return;
		}

        CommonHeader.authorization = token;
        const response = await fetch(PreUri + '/schedule', {
            method: Method.post,
			headers: CommonHeader,
			body: JSON.stringify({
				title: scheduleContent,
				start_date: selectInfo.startStr,
				end_date: selectInfo.endStr,
			}) 
		});

		if (!response.ok) {
            console.log('잘못된 접근입니다.');
            return;
		}

        const json = await response.json();
		setScheduleEvents(scheduleEvents => scheduleEvents.concat({
			id: json.schedule_no,
			user_no: json.user_no,
			title: scheduleContent,
			start: selectInfo.startStr,
			end: selectInfo.endStr,
		//	color: colorTable[0]
		}));

		$('.pop').css('display', 'none');
		// console.log(selectInfo);
		// console.log(scheduleContent);
	}, [scheduleContent, selectInfo, token]);

	const eventClick = useCallback((eventClickInfo) => {
		setPopupAddType(false);
		setEventInfo(eventClickInfo.event);
		setLastScheduleContent(eventClickInfo.event.title);
		setScheduleContent(eventClickInfo.event.title);

		$('.pop').css('display', 'block');
	}, []);

	const eventPopup = useCallback(async (e, action) => {
		e.preventDefault();
		if (!eventInfo) {
			return $('.pop').css('display', 'none');
		}

		CommonHeader.authorization = token;
		if (action === false) {	// 삭제
			const response = await fetch(PreUri + '/schedule/id/' + eventInfo.id, {
				method: Method.delete,
				headers: CommonHeader,
			});

			if (!response.ok) {
				const json = await response.json();
				alert(json.message);
			} else {
				setScheduleEvents(scheduleEvents.filter(it => it.id !== Number(eventInfo.id)));
			}
		} else { // 수정
			if (scheduleContent !== lastScheduleContent) {
				console.log(eventInfo);
				const response = await fetch(PreUri + '/schedule/id/' + eventInfo.id, {
					method: Method.put,
					headers: CommonHeader,
					body: JSON.stringify({
						title: scheduleContent,
						// start_date: selectInfo.startStr,
						// end_date: selectInfo.endStr,
					}) 
				});

				if (!response.ok) {
					const json = await response.json();
					alert(json.message);
				} else {
					for (let i = 0; i < scheduleEvents.length; i++) {
						if (scheduleEvents[i].id === Number(eventInfo.id)) {
							const old = scheduleEvents[i];
							const updated = { ...old, 'title': scheduleContent }
							const clone = [...scheduleEvents];
							clone[i] = updated;
							setScheduleEvents(clone);
							break;
						}
					}
				}
			}
		}
		
		$('.pop').css('display', 'none');
	}, [token, eventInfo, scheduleEvents, scheduleContent, lastScheduleContent]);

	const onChange = useCallback((e) => {
		e.preventDefault();
		setScheduleContent(e.target.value);
	}, []);

	// const renderEventContent = useCallback((eventInfo) => {
	// 	console.log(eventInfo)
	// 	return (
	// 		<>
	// 			<b>{eventInfo.timeText}</b>
	// 			<i>{eventInfo.event.title}</i>
	// 		</>
	// 	)
	// }, []);

	const Popup = useCallback((props) => {
		return (
			<div className="pop">
				{/* <p><textarea placeholder="제목 및 시간 추가" name="scheduleContent"/></p> */}
				<p><input type="text" placeholder="제목 및 시간 추가" value={props.value} name={props.name} onChange={props.onChange} /></p>
				<ul>
					{props.new ?
						<li className="no"><button onClick={(e) => { props.selectPopup(e, false) }}>취소</button></li>
						: <li className="no"><button onClick={(e) => { props.eventPopup(e, false) }}>삭제</button></li>
					}

					{props.new ?
						<li className="yes"><button onClick={(e) => { props.selectPopup(e, true) }}>저장</button></li>
						: <li className="yes"><button onClick={(e) => { props.eventPopup(e, true) }}>확인</button></li>
					}
				</ul>
			</div>
		);
	}, []);

	return (
		<div id="wrap" className="wrap schedule">
			<div className="content_wrap">
					<SubSideMenu title="월간일정"/>
				<div className="content">
					{/* <h2>스케줄 관리</h2> */}
					<div className="calendar">
						<FullCalendar
							plugins={[dayGridPlugin, interactionPlugin]}
							headerToolbar={{
								left:'today',
								center:'title',
								right:'prev,next',
							// center: 'title',
							// right: 'dayGridMonth, timeGridWeek, timeGridDay'
							}}
							buttonText={{
								today: '오늘',
								month: '월',
								week: '주',
								day: '일',
								list: '일정목록'
							}}

							initialView='dayGridMonth'
							editable={true}
							selectable={true}
							selectMirror={true}
							dayMaxEvents={true}
							weekends={true}
							showNonCurrentDates={true}
							droppable={false}
							//height="auto"
							//contentHeight="auto"
							locale='ko'
							timeZone={'Asia/Seoul'}
							select={select}
							eventClick={eventClick}
							events={scheduleEvents}
							ref={calendarRef}
							customButtons={{
								next: {
									click: function () {
										let calendarApi = calendarRef.current.getApi();
										calendarApi.next();
										getSchedule(getFormatDate(calendarApi.getDate()));
									}
								},
								prev: {
									click: function () {
										let calendarApi = calendarRef.current.getApi();
										calendarApi.prev();
										getSchedule(getFormatDate(calendarApi.getDate()));
									}
								},
								today: {
									text: '오늘',
									click: function () {
										let calendarApi = calendarRef.current.getApi();
										calendarApi.today();
										getSchedule(getFormatDate(calendarApi.getDate()));
									}
								},
							}}
							// events={[
							// 	{ title: 'event 1', start: '2020-08-01', end: '2020-08-05', date: '2020-08-03' }, 
							// 	{ title: 'event 2', date: '2020-08-02', color: colorTable[5] } ]}
							//eventContent={renderEventContent} // custom render function
							//eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
							// titleFormat={{ year: 'numeric', month: 'numeric', day: 'numeric' }}
						/>
					</div>
				</div>
			</div>
			<Popup value={scheduleContent} name="scheduleContent" onChange={onChange} 
				selectPopup={selectPopup} eventPopup={eventPopup} new={popupAddType} />
		</div>
	);
}
