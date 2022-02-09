import React, { Component, state, useState, useEffect, useMemo } from "react";
import Chart from "react-apexcharts";


function MaterialMount() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      let option = {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      };
      try {
        const res = await fetch(
          "http://localhost:3005/api/v1/stastics",
          option
        );
        const response = await res.json();
        setData(response.data);
        /*setData(data=>({...data,
          material_item_no :Number(response.material_item_no),
          quantity:Number(response.quantity),
          name:String(response.name)
        }));*/
      } catch (e) {
        console.log(e);
      }
    };
    
    getData();
  }, []);
  const quantity = data.filter((arr)=>arr.material_item_no<7).map((arr)=> arr.quantity);  
  const name = data.filter((arr)=>arr.material_item_no<7).map((arr)=> arr.name);
  const series = 
    [
      {
        name: "사용중인 품목 수",
        type: "column",
        data: [20, 29, 37, 36, 44,46],
      },
  
      {
        name: "사용하지 않는 품목 수",
        type: "column",
        data: [20, 29, 37, 36, 44,67],
      },
      {
        name: "전체 품목 수",
        type: "line",
        data: quantity,
      },
    ]
  
  const options={
    
      colors: ["#0C2840", "#097368", "#FFDAB9"],
      dataLabels: {
        enabled: false,
        enabledOnSeries: [2],
        textAnchor: "middle",
        style: {
          colors: ["#000"],
        },
      },
      chart: {
        animations:{
          enabled:true,
          easing:'linear',
          speed:1000,
          animateGradually: {
            enabled: true,
            delay: 150
        },
          dynamicAnimation:{
            enabled:true,
            speed:350
          }
        },
        type: "line",
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
      legend: {
        labels: {
          colors: "#000",
          useSeriesColors: false,
        },
        markers: {
          fillColors: ["#0C2840", "#097368", "#FFDAB9"],
        },
      },
      plotOptions: {
        bar: {
          borderRadius: 10,
          columnWidth: "70%",
        },
      },
  
      stroke: {
        colors: ["", "", "#FFDAB9"],
        width: 4,
      },//line chart선
  
      xaxis: {
        categories: name,
        tickPlacement: "on",// x축제목 start or center
       labels:{ style:{
          fontSize:'11px',
          fontWeight:300,
        }
      },
      },
      yaxis: {
        title: {
          text: "단위: 건 ",
        },
        min: 0,
        max: 100,
      },
  
      grid: {
        row: {
          colors: ["#fff", "#f2f2f2"],
        },
      },
      tooltip: {
        fixed: {
          enabled: true,
          position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
          offsetY: 30,
          offsetX: 60,
        },
      },
  }
  

  //console.log(dataList);
  
  return (
    <>
      <Chart options={options} series={series} width={900} height={300} />
    </>
  );
}
export default MaterialMount;
