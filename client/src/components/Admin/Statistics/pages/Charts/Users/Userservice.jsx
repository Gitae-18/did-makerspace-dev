import React, { useState, useEffect } from "react";
import { PreUri } from "../../../../../../CommonCode";
import Chart from "react-apexcharts";
import axios from "axios";
import DatePicker from "react-datepicker";
import "../../../../../../css/chart/Datepicker.css";
import moment from "moment";
import styled from "styled-components";

function Userservice() {
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
    let timeString;
    if (value === "기본") {
      setStartDate("");
      setEndDate("");
    }
    if (value === "당일") {
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
      value: "기본",
    },
    {
      id: 2,
      value: "당일",
    },
    {
      id: 3,
      value: "1주일",
    },
    {
      id: 4,
      value: "1개월",
    },
    {
      id: 5,
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
  const series = [
    {
      name: "3D프린팅",
      data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10],
    },
    {
      name: "제품설계",
      data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51, 32, 35],
    },
    {
      name: "CNC가공",
      data: [87, 57, 74, 99, 75, 38, 62, 47, 82, 56, 45, 47],
    },
    {
      name: "레이저컷 가공",
      data: [35, 59, 70, 69, 79, 35, 68, 41, 58, 86, 42, 64],
    },
  ];
  const options = {
    chart: {
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: [5, 5, 5, 3],
      curve: "straight",
      dashArray: [0, 8, 5],
    },
    legend: {
      tooltipHoverFormatter: function (val, opts) {
        return (
          val +
          " - " +
          opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
          ""
        );
      },
    },
    markers: {
      size: 0,
      hover: {
        sizeOffset: 6,
      },
    },
    xaxis: {
      categories: [
        "01 Jan",
        "02 Feb",
        "03 Mar",
        "04 Apr",
        "05 May",
        "06 Jun",
        "07 Jul",
        "08 Aug",
        "09 Sep",
        "10 Oct",
        "11 Nov",
        "12 Dec",
      ],
    },
    tooltip: {
      y: [
        {
          title: {
            formatter: function (val) {
              return val + " (mins)";
            },
          },
        },
        {
          title: {
            formatter: function (val) {
              return val + " per session";
            },
          },
        },
        {
          title: {
            formatter: function (val) {
              return val;
            },
          },
        },
      ],
    },
    grid: {
      borderColor: "#f1f1f1",
    },
  };

  return (
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

          <div class="filter">
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
          <button
            class="search"
            onClick={() =>
              setDataFat(
                dataList.filter(
                  (v) => v.created_at > NewDate && v.created_at < EndDate
                )
              )
            }
          >
            조회
          </button>
        </div>
      </div>
      <h2>월별 사용자 서비스 이용</h2>
      <div class="graph">
        <Chart
          options={options}
          series={series}
          type="line"
          width={900}
          height={500}
        />
      </div>
    </div>
  );
}
export default Userservice;
