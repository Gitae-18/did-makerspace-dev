import React, { Component } from "react";
import Chart from "react-apexcharts";
function Userobject() {
  const series = [
    {
      name: "서비스 지원",
      data: [80, 50, 30, 40, 70, 20],
    },
    {
      name: "올해 서비스 총 지원",
      data: [90, 70, 68, 80, 85, 99],
    },
  ];
  const options = {
    chart: {
      type: "radar",
      dropShadow: {
        enabled: true,
        blur: 1,
        left: 1,
        top: 1,
      },
    },
    title: {
      text: "사용자 목적 통계",
      style: {
        fontSize: "20px",
      },
    },
    stroke: {
      width: 2,
    },
    fill: {
      opacity: 0.1,
    },
    markers: {
      size: 0,
    },
    xaxis: {
      categories: ["AI 스마트제조", "에너지", "드론", "ICT", "바이오", "화학"],
    },
  };

  return (
    <Chart
      options={options}
      series={series}
      type="radar"
      width={900}
      height={330}
    />
  );
}
export default Userobject;
