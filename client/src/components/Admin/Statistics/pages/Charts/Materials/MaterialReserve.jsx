import React, { Component } from "react";
import ApexCharts from "apexcharts";
import Chart from "react-apexcharts";
import '../chart.css';
const data=[13,28,20,13,58,24,30,11,19,8,20,16,10]
const dynamicWidth = data.length * 100;
const chartWidth = dynamicWidth < window.innerWidth ? '100%' : dynamicWidth;


class MaterialReserve extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
        
            series: [{
                name:"전체 품목수",
                data:data
            },
            {
                name:"사용중인 품목수",
                data:[1,28,1,13,53,10,5,10,11,3,19,8,4]
            }   
            ],
          options: {
            chart: {
              height: 350,
              type: 'bar',
              toolbar:{
                show:true,
              tools:{
                  pan:true,
                  zoom:false,
                  zoomin:false,
                  zoomout:false,
                  reset:true,
                  download:true,
          }
        }
            },
            colors:["#4527A0","#00BCD4"],
            legend: {
                position: 'top',
                offsetY: 0,
              },
              title:{
                  text: '재고 보유량',
               
              },
            dataLabels: {
              enabled: false
            },
            responsive: [{
          breakpoint: 480,
          options: {
            chart: {
                width:250,
                height:250
            },
          }
        }],
            
            grid: {
              row: {
                colors: ['#fff', '#f2f2f2']
              }
            },
            xaxis:{
                categories:["레이저아크릴빨강","레이저아크릴파랑","레이저mdf(6t)","레이저mdf(4.5t)","레이저mdf(2.7t)","TPE(2kg)","FLEXA Soft(2kg)","FLEXA Black(2kg)","PA11Onyx READY Powder(2kg)","PA12 Smooth READY Powder(2kg)","PA12 Smooth FRESH powder(2kg)","HP 3D400 Printhead Cleaning Roll","HP 3D400 Air Intent Filter"],
                style:{
                    fontSize:'10px',
                    fontWeight:300,
                },
                floating:false,
                labels:{
                    rotate:-35,
                    hideOverlappingLabels:true,
                },
              tickPlacement: 'on',
              axisTicks:{
                show:true,
                borderType:'solid',
                color:'#78709C',
                height:5,
            }
            },
            yaxis:{
              min:0,
              max:100
            }
          },
        
        
        };
    }


 
  render() {
    return (
    <>
    <div id= "chartsReserve">
      <Chart
        options={this.state.options}
        series={this.state.series}
        width={950}
        height={400}
        type= "bar"
      />
     </div>
     </>
    );
  }
}
export default MaterialReserve;
