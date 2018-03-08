import React, { Component } from 'react';
import '../CSS/Home.css';
import '../animate.css'
import busStop from '../icon.png';
import GoogleMapReact from 'google-map-react';
import Fa from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-free-solid';
import SideBarList from './ListInSideBar.js';
import InformModal from './InformModal.js';
import TestBusPath from '../JSON/roadmapbuses.json';
import axios from 'axios';

let polyline = null;
let borderPolyline = null;

class App extends Component {
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
      pathDetail: null,
      currentBus: 0,
      busInputData: null,
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

  componentDidMount=()=>{
    axios.get('http://localhost:3000/currentBusPosition')
      .then(data => {
        this.setState({
          busInputData: data.data.busData
        })
    })
    var test = [];
    for(var i = 0; i < TestBusPath.roadMap.length; i++){
      var tempObj = {lat:TestBusPath.roadMap[i].lat, lng:TestBusPath.roadMap[i].lng}
      test.push(tempObj)
    }
    this.setState({
      pathDetail: test,
    })
    this.inputInterval = setInterval(this.updateBusPosition,60000)
  }

  componentWillUnmount=()=>{
    clearInterval(this.inputInterval)
    clearInterval(this.busPositonInterval)
  }

  updateBusPosition=()=>{
    axios.get('http://localhost:3000/currentBusPosition')
      .then(data => {
        this.setState({
          busInputData: data.data.busData
        })
      })
  }

  RenderBus=()=>{
    var GenBus = null
    if(this.state.showRoute === true){
      GenBus = this.state.busInputData.map((eachBus) => {
        return(
          <div className="BusPosition" lat={eachBus.lat} lng={eachBus.lon}>
            <Fa icon="bus" size="lg" />
          </div>
        )
      })
    }
    return GenBus;
  }

  Polyline=()=>{
    polyline = new this.state.maps.Polyline({
      path: this.state.pathDetail,
      strokeColor: "#373A47",
      strokeOpacity: 1,
      strokeWeight: 4,
    });
    borderPolyline = new this.state.maps.Polyline({
      path: this.state.pathDetail,
      strokeColor: "#111420",
      strokeOpacity: 1,
      strokeWeight: 8,
    });
    polyline.setMap(this.state.map)
    // borderPolyline.setMap(this.state.map)
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

  toMapDetail=(bus, path)=>{
    var centerTemp = {lat:(TestBusPath.roadMap[Math.floor(TestBusPath.roadMap.length/2)].lat + 0.1), lng:TestBusPath.roadMap[Math.floor(TestBusPath.roadMap.length/2)].lng};
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
                    Polyline={this.Polyline}/>
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
              {/*<div className="center">
                <div className="descriptionBox">
                  <div className="showBusLine">
                    <span>{this.state.results[1].bus}</span>
                  </div>
                  <div className="showPath">
                    <span>{this.state.results[1].path}</span>
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
              </div>*/}
            </div>
        }
        {/*{this.state.loginToken === false
          ? <div style={{display:'inline'}}>
              <Fa name="user-circle-o" size="2x" className="UserIcon" onClick={()=>this.changeUserToggle()}/>
              {this.state.userToggle === true
                ? <div>
                    <div className="LoginModal animated fadeInDown">
                      <div style={{width:'100%',textAlign:'center'}}>
                        <span className="Warning">เฉพาะเจ้าหน้าที่เท่านั้น</span>
                      </div>
                      <input type="text" value={this.state.username} onChange={this.handleUsername} placeholder="บัญชีผู้ใช้" className="FillForm"/>
                      <input type="password" value={this.state.password} onChange={this.handlePassword} placeholder="รหัสผ่าน" className="FillForm"/>
                      <div style={{width:'100%',textAlign:'center'}}>
                        <button className="LoginButton" onClick={()=>this.loginToggle()}>เข้าสู่ระบบ</button>
                      </div>
                    </div>
                  </div>
                : null
              }
            </div>
          : <div style={{display:'inline'}}>
              {this.state.userImage === ''
                ? <Fa name="user-circle-o" size="2x" className="UserIcon" onClick={()=>this.changeUserToggle()}/>
                : <img src={this.state.userImage} className="userImage" onClick={()=>this.changeUserToggle()} />
              }
              {this.state.userToggle === true
                ? <div>
                    <div className="LoginModal animated fadeInDown" style={{padding:'0px'}}>
                      <div style={{textAlign:'center',padding:'0.5em',borderBottom:'1px solid #A9A9A9'}}>
                        <span className="Welcome">นายธนนภัช สุโพธิ์</span>
                      </div>
                      <div style={{textAlign:'center'}}>
                        <ul className="UserOption">
                          <li onClick={()=>this.userOption('1')}>เพิ่มสมาชิกใหม่</li>
                          <li onClick={()=>this.userOption('2')}>การตั้งค่า</li>
                          <li onClick={()=>this.loginToggle()} style={{borderRadius:'0px 0px 5px 5px'}}>ออกจากระบบ</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                : null
              }
            </div>
        }
        {this.state.userChoice != null
          ? <div>
              <div className="BgSideBar" onClick={()=>this.userCancel()} />
              <UserOptionModal option={this.state.userChoice} userCancel={this.userCancel}/>
            </div>
          : null
        }*/}
      </div>
    );
  }
}

export default App;
