import React, {Component} from 'react';
import '../CSS/Overview.css';
import GoogleMapReact from 'google-map-react';
import {Line} from 'react-chartjs-2';

class Overview extends Component {
  constructor(){
    super();
    this.state = {
      center: {lat: 13.75, lng: 100.517},
      zoom:13,
      history:{
        labels:['มกราคม','กุมภาพันธ์','มีนาคม','เมษายน','พฤษภาคม','มิถุนายน','กรกฎาคม','สิงหาคม','กันยายน','ตุลาคม','พฤศจิกายน','ธันวาคม'],
        datasets:[{
          label:'A1',
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
          backgroundColor:'rgba(169,169,169,0.3)',
        },
        {
          label:'8',
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
        }]
      }
    };
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
