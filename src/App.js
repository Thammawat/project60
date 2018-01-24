import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './animate.css'
import busStop from './icon.png';
import GoogleMapReact from 'google-map-react';
import Fa from 'react-fa';
import SideBarList from './template/ListInSideBar.js';
import InformModal from './template/InformModal.js';
import UserOptionModal from './template/UserOptionModal.js';

import UserPic from './image/user_image.jpg';


class App extends Component {
  constructor(){
    super();
    this.state = {
      center: {lat: 13.75, lng: 100.517},
      zoom: 11,
      burgerToggle: false,
      option: null,
      userToggle: false,
      loginTest: false,
      userImage: './image/user_image.jpg',
      username: '',
      password: '',
      userChoice: null,
    };
  }

  changeBurgerToggle=()=>{
    this.setState({
      burgerToggle: !this.state.burgerToggle,
      option: null,
      userToggle: false,
    })
  }

  changeUserToggle=()=>{
    this.setState({
      userToggle: !this.state.userToggle,
    })
  }

  loginToggle=()=>{
    this.setState({
      loginTest: !this.state.loginTest,
      userToggle: false,
    })
  }

  sideBarOption=(data)=>{
    this.setState({
      option: data,
    })
  }

  userOption=(data)=>{
    this.setState({
      userChoice: data,
      userToggle: false,
    })
  }

  userCancel=()=>{
    this.setState({
      userChoice:null,
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

  render() {
    console.log(this.state.userToggle )
    return (
      <div>
        <GoogleMapReact
          defaultCenter={this.state.center}
          defaultZoom={this.state.zoom}
          style={{ zIndex:-1 }}
          layerTypes={['TrafficLayer']}
        />
        {this.state.burgerToggle === false
          ? <Fa name="bars" size="2x" className="burger" onClick={()=>{this.changeBurgerToggle()}}/>
          : <div>
              <div className="sideBar animated slideInLeft">
                <div className="SidebarCancelArea">
                  <Fa name="times" size="lg" className="CancelSidebarButton" onClick={()=>this.changeBurgerToggle()}/>
                </div>
                <SideBarList listName="ค้นหาเส้นทาง" icon="road" selectedOption={this.sideBarOption}
                menu='1'/>
                <SideBarList listName="สายรถเมย์" icon="bus" selectedOption={this.sideBarOption}
                menu='2'/>
              </div>
              <InformModal select={this.state.option}/>
              <div className="BgSideBar" onClick={()=>this.changeBurgerToggle()} />
            </div>
        }
        {this.state.loginTest === false
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
                : <img src={UserPic} className="userImage" onClick={()=>this.changeUserToggle()} />
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
              <UserOptionModal option={this.state.userChoice}/>
            </div>
          : null
        }
      </div>
    );
  }
}

export default App;
