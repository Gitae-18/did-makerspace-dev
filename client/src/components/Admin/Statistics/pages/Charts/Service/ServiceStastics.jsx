import React, { useState, useEffect } from "react";
import { PreUri } from "../../../../../../CommonCode";
import { saveAs } from "file-saver";
import axios from "axios";
import DatePicker from "react-datepicker";
import "../../../../../../css/chart/Datepicker.css";
import xlsx from "xlsx";
import Chart from "react-apexcharts";
import moment from "moment";
import styled from "styled-components";

//File다운로드
const fileType =
  "application/vnd.openxmlformats-officedocument .spreadsheetml .sheet;charset = UTF-8";

function ServiceStatics() {
  const printFunc = () => {
    setTimeout(() => {
      window.print();
    }, 500);
  };

  const [data, setData] = useState([]);
  const getService = async () => {
    try {
      let option = {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      };
      const res = await axios.get(PreUri + "/stastics/ser", option);
      setData(res.data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getService();
  }, []);
  let dataList = data.filter((v) => v.created_at);
  let threeMonthAgo = new Date(
    new Date().getFullYear(),
    new Date().getMonth() - 3,
    new Date().getDate()
  );
  let [dataFat, setDataFat] = useState([]);
  const [btnClick, setBtnClick] = useState("");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // 날짜 데이터 String

  const NewDate = moment(startDate, "YYYY-MM-dd hh:mm:ss").format();
  const EndDate = moment(endDate, "YYYY-MM-dd hh:mm:ss").format();

  // 날짜 버튼
  const handleClicked = (e) => {
    const { value } = e.target;

    setBtnClick(value);

    const currentDate = new Date();
    let hours, minutes, seconds;
  
    if (value === "기본") {
      setStartDate("");
      setEndDate("");
    }
    if (value === "당일") {
      let timeString;
      timeString = hours + ":" + minutes + ":" + seconds;
      setStartDate(new Date());
      setEndDate(new Date());
    }
    if (value === "1주일") {
      let sevenDays = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
      setStartDate(sevenDays);
      setEndDate(new Date());
    }
    if (value === "1개월") {
      let oneMonth = new Date(
        new Date().getFullYear(),
        new Date().getMonth() - 1,
        new Date().getDate()
      );
      setStartDate(oneMonth);
      setEndDate(new Date());
    }
    if (value === "3개월") {
      let threeMonthAgo = new Date(
        new Date().getFullYear(),
        new Date().getMonth() - 3,
        new Date().getDate()
      );
      setStartDate(threeMonthAgo);
      setEndDate(new Date());
    }
  };

  if (!data) return null;
  //날짜 기본 값
  if (btnClick === "" && NewDate === "Invalid date") {
    dataFat = dataList.filter(
      (v) =>
        v.created_at > moment(threeMonthAgo, "YYYY-MM-dd hh:mm:ss").format() &&
        v.created_at < moment(new Date(), "YYYY-MM-dd hh:mm:ss").format()
    );
  }
 
  const fileDownload = () => {
    const ws = xlsx.utils.json_to_sheet(dataFat);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = xlsx.write(wb, { boolType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    saveAs(data, `file_${Date.now()}.xlsx`);
  };

  const MyDatePicker = styled(DatePicker)`
    height: 25px;
    width: 140px;
    padding: 6px 12px;
    font-size: 14px;
    text-align: center;
    border: 2px solid #e5e5e5;
    border-radius: 4px;
    outline: none;
    cursor: pointer;
  `;
  const BetweenDate = styled.span`
    display: table;
    height: 20px;
    padding: 2px 12px;
    background-color: #ffffff;
    border: 1px solid #ffffff;
    font-size: 12px;
    cursor: pointer;
  `;
  const DateFilterData = [
    {
      id: 1,
      value: "당일",
    },
    {
      id: 2,
      value: "1주일",
    },
    {
      id: 3,
      value: "1개월",
    },
    {
      id: 4,
      value: "3개월",
    },
  ];
  let dayday = [];
  const histories = data
    .filter((arr) => arr.created_at > NewDate && arr.created_at < EndDate)
    .map((arr) => arr.created_at);

  for (let i = 0; i < histories.length; i++) {
    if (histories[i] != null) {
      dayday[i] = histories[i].substr(5, 6);
    }
  }
  /*const days = data
    .filter((arr) => arr.created_at > NewDate && arr.created_at < EndDate)
    .map((arr) => arr.created_at);
*/
  const arr = [40, 30, 50, 60, 70, 80];
  const options = {
    colors: ["#0f2753"],
    dataLabels: {
      enabled: false,
    },
    chart: {
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 500,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
      },
      id: "chart",
      stacked: false,
      toolbar: {
        show: true,
        tools: {
          pan: true,
          zoom: false,
          zoomin: false,
          zoomout: false,
          download: true,
          reset: true,
        },
      },
    },
    stroke: {
      colors: ["", ""],
      width: 2,
    },
    xaxis: {
      categories: dayday,
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        columnWidth: "60%",
      },
    },
  };
  const series = [
    {
      name: "sales",
      data: arr,
      type: "bar",
    },
  ];

  /*const DatePickerCustomInput = (onClick) => (
    <div className="calendar_icon">
      <VscCalendar onClick={onClick} />
    </div>
  );*/

  return (
    <>
      <div class="content">
        <div class="table">
          <div class="table_btn">
            {DateFilterData.map((el, idx) => (
              <button
                className="on"
                onClick={(event) => {
                  handleClicked(event);
                }}
                key={idx}
                backgroundColor={btnClick === el.value}
                type="button"
                value={el.value}
              >
                {el.value}
              </button>
            ))}

            <div className="filter">
              <p>
                <MyDatePicker
                  id="startdate"
                  showPopperArrow={false}
                  fixedHeight
                  placeholderText="시작일 입력"
                  locale="ko"
                  selected={startDate}
                  onChange={(value) => setStartDate(value)}
                />
              </p>
              <BetweenDate>~</BetweenDate>
              <p>
                <MyDatePicker
                  id="enddate"
                  showPopperArrow={false}
                  fixedHeight
                  placeholderText="종료일 입력"
                  locale="ko"
                  selected={endDate}
                  onChange={(value) => setEndDate(value)}
                />
              </p>
            </div>
            <button className="search"onClick={() =>setDataFat(dataList.filter( (v) => v.created_at > NewDate && v.created_at < EndDate))}>
              검색
            </button>
          </div>
        </div>
        <div id="print">
          <h2>당월 상담 통계 내역</h2>
          <div class="graph">
            <Chart
              options={options}
              series={series}
              width={900}
              height={300}
              type="line"
            />
          </div>
          <div class="sheet">
            <div>
              <span>통계 및 분석</span> / <span>서비스</span> /{" "}
              <span>상담 내역</span>
              <div class="download">
                <button class="btn_print" onClick={printFunc}>
                  프린트
                </button>
                <button class="btn_excel" onClick={fileDownload}>
                  Excel
                </button>
              </div>
            </div>
            <div class="table_wrap">
              <table>
                <colgroup>
                  <col width="33%"></col>
                  <col width="33%"></col>
                  <col width="34%"></col>
                </colgroup>
                <thead>
                  <tr>
                    <th>번호</th>
                    <th>
                      상담
                      <div class="filter2">
                        <span className="filterimg"></span>
                      </div>
                    </th>
                    <th>비고</th>
                  </tr>
                </thead>
                <tbody>
                  {dataFat.map((key) => (
                    <tr key={key.service_no}>
                      <td>{key.service_no}</td>
                      <td>{key.title}</td>
                      <td>{key.progress}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ServiceStatics;
