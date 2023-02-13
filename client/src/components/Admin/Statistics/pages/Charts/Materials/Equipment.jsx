import React, { useState, useEffect, useRef } from "react";
import { PreUri } from "../../../../../../CommonCode";
import { saveAs } from "file-saver";
import "../../../../../../css/chart/Datepicker.css";
import xlsx from "xlsx";
import Chart from "react-apexcharts";
import "../../../../../../css/chart/Material.css";
const fileType =
  "application/vnd.openxmlformats-officedocument .spreadsheetml .sheet;charset = UTF-8";
function Equipment() {
  const [input, setInput] = useState("");
  const onChange = (e) => {
    setInput(e.target.value);
  };

  const inputRef = useRef(null);

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
      const res = await fetch(PreUri + "/stastics/eqi", option);
      const response = await res.json();
      setData(response.data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getService();
    dataList = data.filter((item) => item.model_name.indexOf(input) !== -1);
  }, [input]);
  let dataList = data.filter((v) => v.equipment_category_no);
  if (!data) return null;
  console.log(input);
  if (dataList.filter((item) => item.model_name.includes(input))) {
    dataList = dataList.filter((item) =>
      item.model_name.toLowerCase().includes(input)
    );
  } else if (input === "") {
    dataList = data.filter((v) => v.equipment_category_no);
  }
/*   const handleSearch = (e) => {
    const inputValue = e.target.value;
    setInput(inputValue);
  }; */
  let dayday = [];
  const arr = [40, 30, 50, 60, 70, 80];
  const fileDownload = () => {
    const ws = xlsx.utils.json_to_sheet(dataList);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = xlsx.write(wb, { boolType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    saveAs(data, `file_${Date.now()}.xlsx`);
  };

  const options = {
    colors: ["#0f2750"],
    dataLabels: {
      enabled: false,
    },
    chart: {
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
  return (
    <>
      <div className="content">
        <div className="form">
          <div className="first">
            <div className="float_l">
              <span>
                관리번호<em>*</em>
              </span>
              <input
                ref={inputRef}
                type="search"
                placeholder="관리번호를 입력하세요."
                onChange={onChange}
              />
            </div>
          </div>
        </div>
        <div className="graph">
          <Chart
            options={options}
            series={series}
            width={900}
            height={200}
            type="line"
          />
        </div>
        <div className="sheet">
          <div>
            <span>통계 및 분석</span> / <span>기자재,자재</span> /{" "}
            <span>자재 품목관리 장비현황</span>
            <div className="download">
              <button className="btn_print" onClick={printFunc}>
                프린트
              </button>
              <button className="btn_excel" onClick={fileDownload}>
                Excel
              </button>
            </div>
          </div>
          <div className="table_wrap">
            <table>
              <thead>
                <tr>
                  <th>번호</th>
                  <th>장비이름</th>
                  <th>장비번호</th>
                  <th>목적</th>
                </tr>
              </thead>
              <tbody>
                {dataList.map((item) => (
                  <tr key={item.equipment_category_no}>
                    <td>{item.equipment_category_no}</td>
                    <td>{item.model_name}</td>
                    <td>{item.model_number}</td>
                    <td>{item.purpose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
export default Equipment;
