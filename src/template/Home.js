import React, { Component } from 'react';
import '../CSS/Home.css';
import '../animate.css'
import busStop from '../icon.png';
import GoogleMapReact from 'google-map-react';
import Fa from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-free-solid';
import SideBarList from './ListInSideBar.js';
import InformModal from './InformModal.js';

let polyline = null;

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
        {bus:'4',path:'เคหะร่มเกล้า - สะพานพุทธ'},
        {bus:'5',path:'สวนสยาม - สาทร'},
        {bus:'6',path:'ท่าอิฐ - อนุเสาวรีย์ชัยสมรภูมิ'},
        {bus:'7',path:'เคหะร่มเกล้า - สะพานพุทธ'},
        {bus:'8',path:'สวนสยาม - สาทร'},
        {bus:'9',path:'ท่าอิฐ - อนุเสาวรีย์ชัยสมรภูมิ'},
        {bus:'10',path:'เคหะร่มเกล้า - สะพานพุทธ'},
        {bus:'11',path:'สวนสยาม - สาทร'},
        {bus:'12',path:'ท่าอิฐ - อนุเสาวรีย์ชัยสมรภูมิ'},
        {bus:'13',path:'เคหะร่มเกล้า - สะพานพุทธ'},
        {bus:'14',path:'สวนสยาม - สาทร'},
        {bus:'15',path:'ท่าอิฐ - อนุเสาวรีย์ชัยสมรภูมิ'},
        {bus:'16',path:'เคหะร่มเกล้า - สะพานพุทธ'},
        {bus:'17',path:'สวนสยาม - สาทร'},
        {bus:'18',path:'ท่าอิฐ - อนุเสาวรีย์ชัยสมรภูมิ'},
        {bus:'19',path:'เคหะร่มเกล้า - สะพานพุทธ'},
        {bus:'20',path:'สวนสยาม - สาทร'},
        {bus:'21',path:'ท่าอิฐ - อนุเสาวรีย์ชัยสมรภูมิ'},
        {bus:'22',path:'เคหะร่มเกล้า - สะพานพุทธ'},
        {bus:'23',path:'สวนสยาม - สาทร'},
        {bus:'24',path:'ท่าอิฐ - อนุเสาวรีย์ชัยสมรภูมิ'},
        {bus:'25',path:'เคหะร่มเกล้า - สะพานพุทธ'},
        {bus:'26',path:'สวนสยาม - สาทร'},
        {bus:'27',path:'ท่าอิฐ - อนุเสาวรีย์ชัยสมรภูมิ'},
        {bus:'28',path:'เคหะร่มเกล้า - สะพานพุทธ'},
        {bus:'29',path:'สวนสยาม - สาทร'},
        {bus:'30',path:'ท่าอิฐ - อนุเสาวรีย์ชัยสมรภูมิ'},
        {bus:'31',path:'เคหะร่มเกล้า - สะพานพุทธ'},
        {bus:'32',path:'สวนสยาม - สาทร'},
        {bus:'33',path:'ท่าอิฐ - อนุเสาวรีย์ชัยสมรภูมิ'},
        {bus:'34',path:'เคหะร่มเกล้า - สะพานพุทธ'},
        {bus:'35',path:'สวนสยาม - สาทร'},
        {bus:'36',path:'ท่าอิฐ - อนุเสาวรีย์ชัยสมรภูมิ'},
      ],
    };
  }

  Polyline=()=>{
    var test = [
      { lat: 13.8438629475451, lng: 100.49841741567 },
      { lat: 13.8450056400873, lng: 100.566327685348 }
    ];
    polyline = new this.state.maps.Polyline({
      path: test,
      strokeColor: "blue",
      strokeOpacity: 1.0,
      strokeWeight: 4,
    });
    polyline.setMap(this.state.map)
  }

  removePolyline=()=>{
    polyline.setMap(null)
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

  toMapDetail=()=>{
    this.setState({
      showRoute: true,
      zoom:13,
    })
  }

  toInformModal=()=>{
    this.setState({
      showRoute:false,
      zoom:11,
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
        />
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
          : <div style={{position:'fixed',zIndex:'1',width:'98vw'}}>
              <Fa icon="arrow-left" size="2x" className="backIcon" onClick={()=>{this.toInformModal(),this.removePolyline()}}/>
              <div style={{textAlign:'center',marginTop:'1em'}}>
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
