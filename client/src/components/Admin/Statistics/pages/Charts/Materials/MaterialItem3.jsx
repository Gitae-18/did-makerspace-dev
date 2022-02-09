import React, { Component } from "react";
import Chart from "react-apexcharts";
import '../chart.css';

class MaterialItem3 extends Component {
    constructor(props) {
    super(props);

    this.state = {
    
      series: [44, 55, 13, 33],
      options: {
        chart: {
          type: 'donut',
          toolbar:{show:true},
        },
        dataLabels: {
          enabled: false
        },
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              show: false
            }
          }
        }],
        legend: {
          position: 'right',
          offsetY: 0,
          height: 230,
        },
        title:{
            text: '레이저',
         
        }
      },
    
    
    };
  }


 /* appendData() {
    var arr = this.state.series.slice()
    arr.push(Math.floor(Math.random() * (100 - 1 + 1)) + 1)
  
    this.setState({
      series: arr
    })
  }
  
  removeData() {
    if(this.state.series.length === 1) return
    
    var arr = this.state.series.slice()
    arr.pop()
  
    this.setState({
      series: arr
    })
  }
  
  randomize() {
    this.setState({
      series: this.state.series.map(function() {
        return Math.floor(Math.random() * (100 - 1 + 1)) + 1
      })
    })
  }
  
  reset() {
    this.setState({
      series: [44, 55, 13, 33]
    })
  }*/
  render() {
    return (
    <>
    <div id= "charts">
      <Chart
        options={this.state.options}
        series={this.state.series}
        width={250}
        height={250}
        type= "donut"
      />
     </div>
     </>
    );
  }
}
export default MaterialItem3;
