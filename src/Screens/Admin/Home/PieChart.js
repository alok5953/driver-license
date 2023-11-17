import React, { Component } from "react";
import ReactPieChart from "react-apexcharts";

class PieChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [0, 0, 0],
      totalSum: 0,
      options: {
        legend: {
          show: false,
        },
        plotOptions: {
          pie: {
            donut: {
              size: "50%",
            },
          },
        },

        plotOptions: {
          pie: {
            customScale: 1.0,
          },
        },
        chart: {
          type: "donut",
        },
        dataLabels: {
          style: {
            color: this.themeColors,
          },
        },
        responsive: [
          {
            breakpoint: 900,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
          {
            breakpoint: 700,
            options: {
              chart: {
                width: 300,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
    };
    this.arrangePietListData(props.coursePerformanceResult)
  }

  componentWillReceiveProps(nextProps) {
    this.arrangePietListData(nextProps.coursePerformanceResult)
  }
  arrangePietListData = (coursePerformanceResult) => {
    let sum = 0, count = 0, value_list = []
    if (coursePerformanceResult.length > 0) {
      coursePerformanceResult && coursePerformanceResult?.map((val, index) => {
        sum = parseInt(sum) + parseInt(val.count)
        count = count + 1;
        if (val.course_status == 'IN_PROGRESS') {
          value_list.push({ status: 'IN_PROGRESS', count: parseInt(val.count) })
        }
        if (val.course_status == 'COMPLETED') {
          value_list.push({ status: 'COMPLETED', count: parseInt(val.count) })
        }
        if (val.course_status == 'EXPIRED') {
          value_list.push({ status: 'EXPIRED', count: parseInt(val.count) })
        }
        if (count >= coursePerformanceResult.length) {
          return { value_list, sum };
        }
      })
      let list = [0, 0, 0];

      let count_value = 0;
      value_list?.map((e, indx) => {
        count_value = count_value + 1
        if (e.status == 'IN_PROGRESS') {
          list[0] = e.count
        }
        if (e.status == 'COMPLETED') {
          list[1] = e.count
        }
        if (e.status == 'EXPIRED') {
          list[2] = e.count
        }
        if (count_value >= value_list.length) {
          return list;
        }
      })
      this.setState({ series: list })
    } else{
      this.setState({ series: [0,0,0] })
    }
    this.setState({ totalSum: sum })
  } 

  render() {
    return (
      <div id="chart">
        <div className="chartHearder">
          <div className="heading">
            <h3>Course Performance</h3>
          </div>
        </div>
        <div className="donutChart">
          <ReactPieChart
            options={this.state.options}
            series={this.state.series}
            type="donut"
            height={'310px'}
          />
          <div className="donutCenter">
            <h2>Total</h2>
            <h2>{this.state.totalSum}</h2>

          </div>
        </div>
        <div className="pieChartData">
          <div className="dataGet">
            <div className="dataIcon">
              <strong className="iConCircle iConGreen"></strong>
              <p>Completed</p>
            </div>
            <span>{this.state.series[1]}</span>
          </div>
          <div className="dataGet">
            <div className="dataIcon">
              <strong className="iConCircle iConYellow chart_color"></strong>
              <p>In-Progress</p>
            </div>
            <span>{this.state.series[0]}</span>
          </div>
          <div className="dataGet">
            <div className="dataIcon">
              <strong className="iConCircle iConRed"></strong>
              <p>Expired</p>
            </div>
            <span>{this.state.series[2]}</span>
          </div>
        </div>
      </div>
    );
  }
}
export default PieChart;
