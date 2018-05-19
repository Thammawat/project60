import React, { Component } from 'react';
import '../CSS/Home.css';
import '../animate.css'
import GoogleMapReact from 'google-map-react';
import Fa from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-free-solid';
import SideBarList from './ListInSideBar.js';
import InformModal from './InformModal.js';
import axios from 'axios';
import ReactTooltip from 'react-tooltip';
import { connect } from 'react-redux';

import {InitialData} from '../reducers/roadData/roadDataAction.js';

import busStopIcon from '../image/bus_icon.png';
import busIcon from '../image/bus_icon_circle.png';
import StartingIcon from '../image/start.png';
import EndingIcon from '../image/stop.png';

let polyline = null;
let borderPolyline = null;

class Home extends Component {
  constructor(){
    super();
    this.state = {
      center: {lat: 13.75, lng: 100.517},
      zoom: 11,
      mapLoaded: true,
      maps: '',
      map: '',
      burgerToggle: false,
      option: null,
      showRoute: false,
      selectedBus: null,
      selectedPath: null,
      currentBus: 0,
      busInputData: null,
      busAllInputData: null,
      roadData: null,
      finishedLoading: false,
      busStop: [],
      showAllBus: false,
      start: {},
      stop: {},
      libraries:[
        {name:'ลาดกระบัง'},
        {name:'สนามบินสุวรรณภูมิ'},
        {name:'เมกะ บางนา'},
        {name:'อนุเสาวรีย์ชัยสมรภูมิ'},
        {name:'บ้านไอ้โด่ง'},
        {name:'บางเสร่'},
        {name:'บ้านโน่น'},
        {name:'บ้านนู้น'},
        {name:'บ้านนั่น'},
      ],
      results:[
        {bus:'1',path:'เคหะร่มเกล้า - สะพานพุทธ'},
        {bus:'2',path:'สวนสยาม - สาทร'},
        {bus:'3',path:'ท่าอิฐ - อนุเสาวรีย์ชัยสมรภูมิ'},
      ],
    };
  }

  componentWillMount=()=>{
    axios.get('http://localhost:3000/roadData').then(data => {
      this.props.InitialData(data.data.roadData)
      setTimeout(()=>{
        this.setState({
          finishedLoading: true
        })
      },1000)
    })
  }

  componentDidMount=()=>{
    axios.get('http://localhost:3000/currentBusPosition')
      .then(data => {
        this.setState({
          busAllInputData: data.data.busData
        })
    })
    axios.get('http://localhost:3000/currentBusPosition/busData')
      .then(data => {
        this.setState({
          busInputData: data.data.busData
        })
      })
    this.inputInterval = setInterval(this.updateBusPosition,6000)
  }

  componentWillUnmount=()=>{
    clearInterval(this.inputInterval)
  }

  updateBusPosition=()=>{
    axios.get('http://localhost:3000/currentBusPosition')
      .then(data => {
        this.setState({
          busAllInputData: data.data.busData
        })
      })
    axios.get('http://localhost:3000/currentBusPosition/busData')
      .then(data => {
        this.setState({
          busInputData: data.data.busData
        })
      })
  }

  RenderBus=()=>{
    var GenBus = null
    var Result = null
    if(this.state.showRoute === true){
      if(this.state.showAllBus === false){
        GenBus = this.state.busInputData.filter((eachCurrentBus) => (
          eachCurrentBus.path === this.state.selectedBus
        ))
        Result = GenBus.map((eachBus) => {
          return(
            <div lat={eachBus.lat} lng={eachBus.lng} style={{position:"relative",zIndex:"20"}}>
              <img src={busIcon} className="icon" style={{height:"30px",position:"relative",top:"-30px",left:"-15px"}}/>
            </div>
          )
        })
      }
      else {
        GenBus = this.state.busAllInputData
        Result = GenBus.map((eachBus) => {
          return(
            <div lat={eachBus.lat} lng={eachBus.lon} style={{position:"relative",zIndex:"20"}}>
              <img src={busIcon} style={{height:"30px",position:"relative",top:"-30px",left:"-15px"}}/>
            </div>
          )
        })
      }
    }
    return Result;
  }

  RenderBusStop=()=>{
    var result = null
    if(this.state.showRoute === true){
      result = this.state.busStop.map((eachBus, index) => {
        if(index === 0){
          return(
            <div lat={eachBus.lat} lng={eachBus.lng}>
              <img src={busStopIcon} data-tip data-for={eachBus.nameTH} className="icon"/>
              <ReactTooltip place="right" id={eachBus.nameTH} type="info" effect="solid">
                <span>{eachBus.nameTH}</span>
              </ReactTooltip>
            </div>
          )
        }
        return(
          <div lat={eachBus.lat} lng={eachBus.lng}>
            <img src={busStopIcon} data-tip data-for={eachBus.nameTH} className="icon"/>
            <ReactTooltip place="right" id={eachBus.nameTH} type="info" effect="solid">
              <span>{eachBus.nameTH}</span>
            </ReactTooltip>
          </div>
        )
      })
    }
    return result
  }

  Polyline=(data)=>{
    this.setState({
      start: {lat: data[0].lat, lng: data[0].lng},
      stop: {lat: data[data.length-1].lat, lng: data[data.length-1].lng}
    })
    var test = [];
    for(var i = 0; i < data.length; i++){
      var tempObj = {lat:data[i].lat, lng:data[i].lng}
      test.push(tempObj)
    }
    polyline = new this.state.maps.Polyline({
      path: test,
      strokeColor: "#373A47",
      strokeOpacity: 1,
      strokeWeight: 4,
    });
    polyline.setMap(this.state.map)
  }

  removePolyline=()=>{
    polyline.setMap(null)
    borderPolyline.setMap(null)
  }

  changeBurgerToggle=()=>{
    this.setState({
      burgerToggle: !this.state.burgerToggle,
      option: null,
    })
  }

  sideBarOption=(data)=>{
    this.setState({
      option: data,
    })
  }

  handleUsername=(e)=>{
    this.setState({
      username: e.target.value,
    })
  }

  handlePassword=(e)=>{
    this.setState({
      password: e.target.value,
    })
  }

  toMapDetail=(bus, path, center)=>{
    var centerTemp = {lat:center.lat, lng:center.lng};
    this.setState({
      showRoute: true,
      center: centerTemp,
      selectedBus: bus,
      selectedPath: path,
    })
  }

  toInformModal=()=>{
    this.setState({
      showRoute:false,
      showAllBus:false,
      zoom:11,
      center:{lat: 13.75, lng: 100.517},
      selectedBus: null,
      selectedPath: null,
      busStop: [],
    })
  }

  showZombieMode=()=>{
    this.setState({
      showRoute:true,
      showAllBus:true,
    })
  }

  getBusStop=(busRoadArr, busPointArr)=>{
    console.log(busRoadArr)
    console.log(busPointArr)
    var busStopArr = []
    axios.get("http://localhost:3000/roadData/busStop").then(data => {
      for(var index = 0;index < busRoadArr.length;index++){
        var temp = data.data.busStop.filter((element)=>(element.busRoad === busRoadArr[index]))
        var checkStart = false
        for(var idx = 0;idx < temp[0].busStop.length;idx++){
          if(temp[0].busStop[idx].nameTH === busPointArr[index]){
            checkStart = true
          }
          if(checkStart){
            busStopArr.push(temp[0].busStop[idx])
          }
          if(temp[0].busStop[idx].nameTH === busPointArr[index+1]){
            checkStart = false
          }
        }
      }
      this.setState({
        busStop: busStopArr,
      })
    })
  }

  render() {
    return (
      <div>
        {this.state.finishedLoading === false
          ? <div>
              <div className="onLoading" />
              <div className="loadingModal">
                <div style={{display:"block",textAlign:"center",marginBottom:"0.5em"}}>
                  <Fa icon="spinner" size="3x" spin/>
                </div>
                <span style={{display:"block"}}>กำลังโหลดข้อมูล...</span>
              </div>
            </div>
          : null
        }
        <GoogleMapReact
          center={this.state.center}
          zoom={this.state.zoom}
          style={{ zIndex:-1 }}
          onGoogleApiLoaded={({ map, maps }) => { this.setState({ map: map, maps: maps, mapLoaded: true }) }}
        >
          {this.RenderBus()}
          {this.RenderBusStop()}
          {this.state.showRoute === true && this.state.showAllBus === false
            ? <div lat={this.state.start.lat} lng={this.state.start.lng}>
                <img src={StartingIcon} data-tip data-for="StartingPoint" style={{height:"40px",position:"relative",top:"-40px",left:"-10px"}}/>
                <ReactTooltip place="right" id="StartingPoint" type="warning" effect="solid">
                  <span>จุดเริ่มต้น</span>
                </ReactTooltip>
              </div>
            : null
          }
          {this.state.showRoute === true && this.state.showAllBus === false
            ? <div lat={this.state.stop.lat} lng={this.state.stop.lng}>
                <img src={EndingIcon} data-tip data-for="EndingPoint" style={{height:"40px",position:"relative",top:"-40px",left:"-10px"}}/>
                <ReactTooltip place="right" id="EndingPoint" type="warning" effect="solid">
                  <span>จุดสิ้นสุด</span>
                </ReactTooltip>
              </div>
            : null
          }
        </GoogleMapReact>
        {this.state.showRoute === false
          ? <div>
              {this.state.burgerToggle === false
                ? <Fa icon="bars" size="2x" className="burger" onClick={()=>{this.changeBurgerToggle()}}/>
                : <div>
                    <div className="sideBar animated slideInLeft">
                      <div className="SidebarCancelArea">
                        <Fa icon="times" size="lg" className="CancelSidebarButton" onClick={()=>this.changeBurgerToggle()}/>
                      </div>
                      <SideBarList listName="ค้นหาเส้นทาง" icon="road" selectedOption={this.sideBarOption}
                      menu='1'
                      />
                      <SideBarList listName="สายรถเมล์" icon="bus" selectedOption={this.sideBarOption}
                      menu='2'/>
                      {/* ส่วนแสดงข้อมูลทั้งหมด }
                      <div className="zombieMode" onClick={this.showZombieMode}>
                        <Fa icon="globe" size='lg' />
                        <span style={{margin:"0em 1em",fontSize:"20px"}}>แสดงข้อมูลทั้งหมด</span>
                      </div>
                      {/* ส่วนแสดงข้อมูลทั้งหมด */}
                      <div className="LoginList">
                        <SideBarList listName="เข้าสู่ระบบ" icon="sign-in-alt" selectedOption={this.sideBarOption} menu='0' />
                      </div>
                    </div>
                    <InformModal select={this.state.option} toMapDetail={this.toMapDetail} libraries={this.state.libraries}
                    results={this.state.results}
                    Polyline={this.Polyline}
                    getSelectedPath={this.getSelectedPath}
                    getBusStop={this.getBusStop}
                    />
                    <div className="BgSideBar" onClick={()=>this.changeBurgerToggle()} />
                  </div>
              }
            </div>
          : <div style={{position:'fixed',zIndex:'1',width:'97vw'}}>
              <Fa icon="arrow-left" size="2x" className="backIcon" onClick={()=>{this.toInformModal(),this.removePolyline()}}/>
              {this.state.showAllBus === true
                ? null
                : <div style={{textAlign:'center',marginTop:'1em'}}>
                    <div className="descriptionBox">
                      <div className="showBusLine">
                        <span>สายที่ {this.state.selectedBus}</span>
                      </div>
                      <div className="showPath">
                        <span>{this.state.selectedPath}</span>
                      </div>
                    </div>
                  </div>
              }
            </div>
        }
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  InitialData: (data) => dispatch(InitialData(data)),
});

const mapStateToProps = (state) => ({
  roadData: state.RoadData.roadData,
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
