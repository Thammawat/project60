import React, {Component} from 'react';
import '../CSS/Overview.css';
import Fa from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-free-solid';
import GoogleMapReact from 'google-map-react';
import {Line, Bar} from 'react-chartjs-2';
import axios from 'axios';

class Overview extends Component {
  constructor(){
    super();
    this.state = {
      center: {lat: 13.75, lng: 100.517},
      zoom:13,
      mostGulity: [],
      mostBusID: [],
      mostType: [],
      showType: false,
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
      var AllOfBusId = [...new Set( data.data.busGulity.map(obj => obj.busID))]
      var BusIDArr = []
      for(var idx = 0;idx < AllOfBusId.length;idx++){
        var filterBusID = data.data.busGulity.filter((eachBus) => ( eachBus.busID === AllOfBusId[idx]))
        BusIDArr.push({"busID":AllOfBusId[idx],"number":filterBusID.length})
      }

      var AllOfType = [...new Set(data.data.busGulity.map(obj => obj.type))]
      var TypeArr = []
      for(var i = 0;i < AllOfType.length; i++){
        var filterType = data.data.busGulity.filter((eachBus) => (eachBus.type[i]))
        TypeArr.push({"type":AllOfType[i],"number":filterType.length})
      }

      var temp = {
        labels:['39','63','97'],
        datasets:[{
          label:'จำนวนความผิดในแต่ละสาย',
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

      var nineSeven = []
      var sixThree = []
      var threeNine = []
      for(var index = 0; index < data.data.busGulity.length;index++){
        if(data.data.busGulity[index].busRoad === "97"){
          nineSeven.push(data.data.busGulity[index])
        }
        else if(data.data.busGulity[index].busRoad === "63"){
          sixThree.push(data.data.busGulity[index])
        }
        else{
          threeNine.push(data.data.busGulity[index])
        }
      }
      if(nineSeven.length >= sixThree.length){
        if(nineSeven.length >= threeNine.length){
          var mostGulity = nineSeven
        }
        else{
          var mostGulity = threeNine
        }
      }
      else{
        if(sixThree.length >= threeNine.length){
          var mostGulity = sixthree
        }
        else{
          var mostGulity = threeNine
        }
      }

      this.setState({
        mostGulity: mostGulity,
        mostBusID: BusIDArr.sort((a,b)=>(b.number - a.number)),
        mostType: TypeArr.sort((a,b) => (b.number - a.number)),
        history: temp,
      })
    })
  }

  showGulityType=(inputData)=>{
    if(this.state.showType === false){
      axios.get("http://localhost:3000/busGulity").then(data => {
        var temp = {
          labels:['ขับออกนอกเส้นทาง','ขับไม่ครบทุกป้าย','ขับแซงรถในสายเดียวกัน'],
          datasets:[{
            label:'จำนวนความผิดแต่ละประเภทในสาย ' + inputData[0]._model.label,
            data:[
              data.data.busGulity.filter((eachBus) => (eachBus.busRoad === inputData[0]._model.label && eachBus.type === "ขับออกนอกเส้นทาง")).length,
              data.data.busGulity.filter((eachBus) => (eachBus.busRoad === inputData[0]._model.label && eachBus.type === "ขับไม่ครบทุกป้าย")).length,
              data.data.busGulity.filter((eachBus) => (eachBus.busRoad === inputData[0]._model.label && eachBus.type === "ขับแซงรถในสายเดียวกัน")).length,
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
        this.setState({
          history: temp,
          showType: true,
        })
      })
    }
  }

  toBusRoad=()=>{
    axios.get("http://localhost:3000/busGulity").then(data => {
      var temp = {
        labels:['39','63','97'],
        datasets:[{
          label:'จำนวนความผิดในแต่ละสาย',
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
      this.setState({
        history: temp,
        showType: false,
      })
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
                {this.state.mostGulity.length != 0
                  ? <span>{this.state.mostGulity[0].busRoad}</span>
                  : null
                }
              </div>
            </div>
          </div>
          <div className="StaticBox">
            <div className="StaticTopic">
              <span>ช่วงเวลาที่ทำผิดบ่อยที่สุด</span>
            </div>
            <div className="center">
              <div className="StaticResult" style={{fontSize:"24px"}}>
                {this.state.mostType.length != 0
                  ? <span>{this.state.mostType[0].type}</span>
                  : null
                }
              </div>
            </div>
          </div>
          <div className="StaticBox">
            <div className="StaticTopic">
              <span>ทะเบียนรถที่ทำผิดบ่อยที่สุด</span>
            </div>
            <div className="center">
              <div className="StaticResult">
                {this.state.mostBusID.length != 0
                  ? <span>{this.state.mostBusID[0].busID}</span>
                  : null
                }
              </div>
            </div>
          </div>
          {/*<div className="LongStaticBox">
            <div className="LongStaticTopic">
              <span>สถานที่ที่ทำผิดบ่อยที่สุด</span>
            </div>
            <div className="MapArea">
              <GoogleMapReact
                center={this.state.center}
                zoom={this.state.zoom}
              />
            </div>
          </div>*/}
          <div className="LongStaticBox">
            {this.state.showType === true
              ? <span className="reverseButton" onClick={()=>this.toBusRoad()}><Fa icon="angle-left" size="lg" style={{position:"relative",top:"1px"}}/> ย้อนกลับ</span>
              : null
            }
            <div className="LongStaticTopic" style={{textAlign:"center"}}>
              <span>ประวัติการทำผิด</span>
            </div>
            <div>
              <Bar
                data={this.state.history}
                getElementAtEvent={(elems)=>{this.showGulityType(elems)}}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Overview;
