import React, { Component } from "react";
import Chart from "react-apexcharts";
import { Form } from 'react-bootstrap';

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
  maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  minimumFractionDigits: 0
});
var d = new Date();
var monthCategories  = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","sep","Oct","Nov","Dec"];
var amount= [0,0,0,0,0,0,0,0,0,0,0,0];
export class Charts extends Component {

  constructor(props) {
    super(props);
    this.state = {
      courselist: props.courseList,
      courseid:props?.courseList[0]?.id,year:d.getFullYear(),
      avgerage:0,
      options: {
        chart: {
          id: "apexchart-example",
          horizontal: true,
          
          borderRadius: "10px"
        },
        
        bar: {},
        yaxis: {
          show: true,
          labels: {
            formatter: value => {
              return formatter.format(value);
            }
          },
          min: 100
        },
        xaxis: {
          categories:monthCategories
        },
        // yaxis: {
        //   lable:"show",
        //   title: {
        //     text: 'Servings',
        //   },
        //   categories:[1,2,3,4,5,6,7]
        // },
        colors: ["#A3A1FB"],
        plotOptions: {
          bar: {
            horizontal: false,
            s̶t̶a̶r̶t̶i̶n̶g̶S̶h̶a̶p̶e̶: "flat",
            e̶n̶d̶i̶n̶g̶S̶h̶a̶p̶e̶: "flat",
            borderRadius: 10,
            columnWidth: "70%",
            barHeight: "70%"
          }
        },
        toolbar: {
          show: false,
          offsetX: 0,
          offsetY: 0,
          tools: {
            download: false
          }
        }
      },
      series: [
        {
          name: "series-1",
          data: amount
        }
      ]
    };
    this.arrangeChartListData(props?.totalCoursePayment);
  }
  onchange=(courseid,year)=>{
    this.setState({courseid:courseid,year:year})
    this.props.getDetailByCourseId(courseid,year)
  }
  componentWillReceiveProps(nextProps) {
    this.arrangeChartListData(nextProps.totalCoursePayment)
  }

  arrangeChartListData = (totalCoursePayment) =>{
    let count = 0;
    let totalAmount = 0 
    amount= [0,0,0,0,0,0,0,0,0,0,0,0];
    monthCategories?.map((val,index)=>{
      count++;
      totalCoursePayment && totalCoursePayment?.map((e,indx)=>{
        let d= new Date(totalCoursePayment[indx]?.month)
        if( d.getMonth()==index){
          totalAmount = totalAmount + totalCoursePayment[indx]?.payment;
          amount[index] = totalCoursePayment[indx]?.payment
        } 
        if(count>=monthCategories.length){
          return amount;
        }
      })
    })
    let obj = {
        name: "series-1",
        data: amount
      }
    this.setState({series: [obj] });
    let avg = parseFloat(totalAmount)/parseInt(monthCategories.length)
    this.setState({avgerage: avg.toFixed(2) });
  }
  
  render() {
     
    return (
      <div>
        <div className="chartHearder">
          <div className="heading">
            <h3>Total Earning</h3>
            <p>Avg. ${this.state.avgerage}</p>
          </div>
          <div className="HeadDropdown">
            <div className="dropdown chartDropdown">
              <div className="select_input">
                <Form.Control as="select" value={this.state.courseid} className="dark_font_color" id="inputState" onChange={(e)=>this.onchange(e.target.value,this.state.year)}>
                  <option>Select course</option>
                  {this.state.courselist?.map((val,i) => <option key={`colist-${i}`} value={val.id}>{val.course_title}</option>)}
                </Form.Control> 
              </div>
            </div>

            <div className="dropdown chartDropdown ml-2">
              <div className="select_input">
                <Form.Control as="select" value={this.state.year}  onChange={(e)=>this.onchange(this.state.courseid,e.target.value
                  )} className="dark_font_color" id="inputState" >
                  <option value="2021">2021</option>
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                  <option value="2027">2027</option>
                  <option value="2028">2028</option>
                  <option value="2029">2029</option>
                  <option value="2030">2030</option>
                </Form.Control>
              </div>

            </div>
          </div>
        </div>
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="bar"
          width={"100%"}
          height={"320px"}
        />
      </div>
    );
  }
  y;
}

export default Charts;
