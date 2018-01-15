import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import busStop from './icon.png';
import GoogleMapReact from 'google-map-react';
import Fa from 'react-fa';

class App extends Component {
  constructor(){
    super();
    this.state = {
      center: {lat: 13.75, lng: 100.517},
      zoom: 11,
      burgerToggle: false,
    };
  }

  changeBurgerToggle=()=>{
    this.setState({
      burgerToggle: !this.state.burgerToggle
    })
  }

  addGps=() => {
    console.log("hello")
  }

  render() {
    return (
      <div>
        <GoogleMapReact
          defaultCenter={this.state.center}
          defaultZoom={this.state.zoom}
          style={{ zIndex:-1 }}
          layerTypes={['TrafficLayer']}
        />
        {this.state.burgerToggle === false
          ? <Fa name="bars" size="2x" className="burger" onClick={()=>this.changeBurgerToggle()}/>
          : <div>
              <div className="sideBar">
                <div className="SidebarCancelArea">
                  <Fa name="times" size="lg" className="CancelSidebarButton" onClick={()=>this.changeBurgerToggle()}/>
                </div>
              </div>
              <div className="BgSideBar" onClick={()=>this.changeBurgerToggle()}>
              </div>
            </div>
        }
      </div>
    );
  }
}

export default App;
