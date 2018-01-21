import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './animate.css'
import busStop from './icon.png';
import GoogleMapReact from 'google-map-react';
import Fa from 'react-fa';
import SideBarList from './template/ListInSideBar.js';
import Modal from './template/InformModal.js';


class App extends Component {
  constructor(){
    super();
    this.state = {
      center: {lat: 13.75, lng: 100.517},
      zoom: 11,
      burgerToggle: false,
      option: null,
    };
  }

  changeBurgerToggle=()=>{
    this.setState({
      burgerToggle: !this.state.burgerToggle,
      option: null,
    })
  }

  selectedOption=(data)=>{
    console.log("hello")
    this.setState({
      option: data,
    })
  }

  render() {
    console.log(this.state.option)
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
                <SideBarList listName="ค้นหาเส้นทาง" icon="road" selectedOption={this.selectedOption}
                menu='1'/>
                <SideBarList listName="สายรถเมย์" icon="bus" selectedOption={this.selectedOption}
                menu='2'/>
              </div>
              <Modal select={this.state.option}/>
              <div className="BgSideBar" onClick={()=>this.changeBurgerToggle()}>
              </div>
            </div>
        }
        <Fa name="user-circle-o" size="2x" className="UserIcon"/>
      </div>
    );
  }
}

export default App;
