import React, {Component} from 'react';
import '../CSS/Overview.css';
import GoogleMapReact from 'google-map-react';
import {Line, Bar} from 'react-chartjs-2';
import axios from 'axios';

class Overview extends Component {
  constructor(){
    super();
    this.state = {
      center: {lat: 13.75, lng: 100.517},
      zoom:13,
      history:{
        labels:['มกราคม','กุมภาพันธ์','มีนาคม','เมษายน','พฤษภาคม','มิถุนายน','กรกฎาคม','สิงหาคม','กันยายน','ตุลาคม','พฤศจิกายน','ธันวาคม'],
        datasets:[{
          label:'ขับออกนอกเส้นทาง',
          data:[
            945,
            846,
            784,
            514,
            654,
            684,
            589,
            432,
            314,
            395,
            248,
            187,
          ],
          borderWidth:2,
          pointHoverBackgroundColor:'#FFFFFF',
          pointHoverBorderColor:'#373a47',
          pointRadius:4.5,
          pointBorderColor:'#FFFFFF',
          pointBackgroundColor:'#373a47',
          borderColor:'#373a47',
          backgroundColor:'rgba(169,169,169,0.6)',
        },
        {
          label:'ขับไม่ครบป้าย',
          data:[
            187,
            654,
            395,
            589,
            248,
            314,
            784,
            846,
            684,
            514,
            432,
            945,
          ],
          borderWidth:2,
          pointHoverBackgroundColor:'#FFFFFF',
          pointHoverBorderColor:'#4a148c',
          pointRadius:4.5,
          pointBorderColor:'#FFFFFF',
          pointBackgroundColor:'#4a148c',
          borderColor:'#4a148c',
          backgroundColor:'rgba(124,67,189,0.3)',
        },
        {
          label:'ขับแซงกัน',
          data:[
            543,
            752,
            648,
            134,
            226,
            825,
            500,
            142,
            235,
            514,
            785,
            662,
          ],
          borderWidth:2,
          pointHoverBackgroundColor:'#FFFFFF',
          pointHoverBorderColor:'#5C69A2',
          pointRadius:4.5,
          pointBorderColor:'#FFFFFF',
          pointBackgroundColor:'#5C69A2',
          borderColor:'#5C69A2',
          backgroundColor:'rgba(63,81,181,0.3)',
        }]
      },
    };
  }

  componentWillMount=()=>{
    axios.get("http://localhost:3000/busGulity").then(data => {
      var temp = {
        labels:['39','63','97'],
        datasets:[{
          label:'Number Of Gulity',
          data:[
            data.data.busGulity.filter((eachBus) => (eachBus.busRoad === "39")).length,
            data.data.busGulity.filter((eachBus) => (eachBus.busRoad === "63")).length,
            data.data.busGulity.filter((eachBus) => (eachBus.busRoad === "97")).length,
          ],
          backgroundColor:[
            'rgba(169,169,169,0.6)',
            'rgba(124,67,189,0.6)',
            'rgba(63,81,181,0.6)'
          ],
          borderColor:[
            'rgba(154,154,154,1)',
            'rgba(127,96,165,1)',
            'rgba(92,105,162,1)'
          ],
          borderWidth:2,
        }]
      }

    })
  }

  render(){
    return(
      <div className="OverviewArea">
        <div className="OverviewTopic">
          <span>ภาพรวมระบบ</span>
        </div>
        <div className="OverviewBody">
          <div className="StaticBox">
            <div className="StaticTopic">
              <span>สายรถเมล์ที่ทำผิดบ่อยที่สุด</span>
            </div>
            <div className="center">
              <div className="StaticResult">
                <span>A1</span>
              </div>
              <div className="StaticDescription">
                <span>กรุงเทพ - ชลบุรี</span>
              </div>
            </div>
          </div>
          <div className="StaticBox">
            <div className="StaticTopic">
              <span>ช่วงเวลาที่ทำผิดบ่อยที่สุด</span>
            </div>
            <div className="center">
              <div className="StaticResult">
                <span>13.54</span>
              </div>
              <div className="StaticDescription">
                <span>13.00 น. - 14.00 น.</span>
              </div>
            </div>
          </div>
          <div className="StaticBox">
            <div className="StaticTopic">
              <span>ความผิดที่พบบ่อยที่สุด</span>
            </div>
            <div className="center">
              <div className="StaticResult">
                <span>2</span>
              </div>
              <div className="StaticDescription">
                <span>การจอดไม่ครบป้าย</span>
              </div>
            </div>
          </div>
          <div className="LongStaticBox">
            <div className="LongStaticTopic">
              <span>สถานที่ที่ทำผิดบ่อยที่สุด</span>
            </div>
            <div className="MapArea">
              <GoogleMapReact
                center={this.state.center}
                zoom={this.state.zoom}
              />
            </div>
          </div>
          <div className="LongStaticBox">
            <div className="LongStaticTopic">
              <span>ประวัติการทำผิด</span>
            </div>
            <div>
              <Line
                data={this.state.history}
                options={{
                  tooltips:{
                    mode: 'index',
                    intersect: false,
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Overview;
