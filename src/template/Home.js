import React, { Component } from 'react';
import '../CSS/Home.css';
import '../animate.css'
import busStop from '../icon.png';
import GoogleMapReact from 'google-map-react';
import Fa from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-free-solid';
import SideBarList from './ListInSideBar.js';
import InformModal from './InformModal.js';
import axios from 'axios';
import { connect } from 'react-redux';

import {InitialData} from '../reducers/roadData/roadDataAction.js';

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
      arrivals: true,
      selectedBus: null,
      selectedPath: null,
      currentBus: 0,
      busInputData: null,
      roadData: null,
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
    })
  }

  componentDidMount=()=>{
    axios.get('http://localhost:3000/currentBusPosition')
      .then(data => {

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
      GenBus = this.state.busInputData.filter((eachCurrentBus) => (
        eachCurrentBus.path === this.state.selectedBus
      ))
      Result = GenBus.map((eachBus) => {
        return(
          <div className="BusPosition" lat={eachBus.lat} lng={eachBus.lng}>
            <Fa icon="bus" size="lg" />
          </div>
        )
      })
    }
    return Result;
  }

  Polyline=(data)=>{
    var test = [];
    for(var i = 0; i < data.roadMapBus.roadMap.length; i++){
      var tempObj = {lat:data.roadMapBus.roadMap[i].lat, lng:data.roadMapBus.roadMap[i].lng}
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
      center:{lat: 13.75, lng: 100.517},
      selectedBus: null,
      selectedPath: null,
    })
  }

  toArrivals=()=>{
    this.setState({
      arrivals: true
    })
  }

  toDepartures=()=>{
    this.setState({
      arrivals:false
    })
  }

  render() {
    return (
      <div>
        <GoogleMapReact
          center={this.state.center}
          zoom={this.state.zoom}
          style={{ zIndex:-1 }}
          onGoogleApiLoaded={({ map, maps }) => { this.setState({ map: map, maps: maps, mapLoaded: true }) }}
        >
          {this.RenderBus()}
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
                      <SideBarList listName="สายรถเมย์" icon="bus" selectedOption={this.sideBarOption}
                      menu='2'/>
                      <div className="LoginList">
                        <SideBarList listName="เข้าสู่ระบบ" icon="sign-in-alt" selectedOption={this.sideBarOption} menu='0' />
                      </div>
                    </div>
                    <InformModal select={this.state.option} toMapDetail={this.toMapDetail} libraries={this.state.libraries}
                    results={this.state.results}
                    Polyline={this.Polyline}
                    getSelectedPath={this.getSelectedPath}
                    />
                    <div className="BgSideBar" onClick={()=>this.changeBurgerToggle()} />
                  </div>
              }
            </div>
          : <div style={{position:'fixed',zIndex:'1',width:'97vw'}}>
              <Fa icon="arrow-left" size="2x" className="backIcon" onClick={()=>{this.toInformModal(),this.removePolyline()}}/>
              <div style={{textAlign:'center',marginTop:'1em'}}>
                <div className="descriptionBox">
                  <div className="showBusLine">
                    <span>{this.state.selectedBus}</span>
                  </div>
                  <div className="showPath">
                    <span>{this.state.selectedPath}</span>
                  </div>
                  {this.state.arrivals === true
                    ? <div>
                        <div className="OnLeftOption">
                          <span>ขาเข้า</span>
                        </div>
                        <div className="RightOption" onClick={()=>this.toDepartures()}>
                          <span>ขาออก</span>
                        </div>
                      </div>
                    : <div>
                        <div className="LeftOption" onClick={()=>this.toArrivals()}>
                          <span>ขาเข้า</span>
                        </div>
                        <div className="OnRightOption">
                          <span>ขาออก</span>
                        </div>
                      </div>
                  }
                </div>
              </div>
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
