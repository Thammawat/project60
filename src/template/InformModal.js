import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../CSS/InformModal.css';
import '../animate.css';
import SearchBox from './SearchBox.js';
import Fa from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-free-solid';
import axios from 'axios';
import { connect } from 'react-redux';

import { getUserData } from '../reducers/userData/userDataAction.js'



class Modal extends Component {
  constructor(props){
    super(props)
    this.state = {
      resultFromSearch: null,
      resultPage: null,
      currentPage: 1,
      showSearch: false,
      busName: null,
      busStop: [],
      busPoint: [],
      selectedBusName: null,
      username:null,
      password:null,
      box1: null,
      box2: null,
      roadType: null,
      NoRoute: false,
      checkBus: false,
    };
  }

  componentWillMount=()=>{
    axios.get("http://localhost:3000/roadData/busStop").then(data =>{
      var temp = []
      data.data.busStop.map((eachRoute, index) => {
        eachRoute.busStop.map((eachSign) => {
          var check = temp.filter((element) => (
            element.name === eachSign.nameTH
          ))
          if(check.length === 0){
            temp.push({name: eachSign.nameTH})
          }
        })
      })
      this.setState({
        busStop: temp
      })
    })
    var temp = []
    for(var index = 0; index < this.props.roadData.length; index++){
      temp.push({
        name:this.props.roadData[index].name,
        fullname: this.props.roadData[index].fullname.slice(3),
      })
    }
    this.setState({
      busName: temp,
    })
  }

  changePage=(data)=>{
    this.setState({
      currentPage: data,
    })
  }

  closeSearchToggle=(data)=>{
    this.setState({
      resultPage: null,
      currentPage: 1,
      showSearch: false
    })
  }

  toPreviousPage=()=>{
    if(this.state.currentPage > 1){
      this.setState({
        currentPage: this.state.currentPage - 1,
      })
    }
  }

  toNextPage=()=>{
    if(this.state.currentPage < this.state.resultPage.length){
      this.setState({
        currentPage: this.state.currentPage + 1,
      })
    }
  }

  getSelectedValue=(box, data)=>{
    if(box === "1"){
      this.setState({
        box1: data
      })
    }
    if(box === "2"){
      this.setState({
        box2: data
      })
    }
    if(box === "3"){
      for(var index = 0; index < this.state.busName.length;index++){
        if(this.state.busName[index].name === data){
          this.setState({
            selectedBusName: index,
          })
        }
      }
    }
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

  checkLogin=e=>{
    e.preventDefault()
    axios.post("http://localhost:3000/user/login",
    {
      data: { username: this.state.username ,password: this.state.password }
    },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Control-Type': 'application/json'
      }
    })
    .then(data => {
      if(data.data.result === "success"){
        localStorage.setItem('username',data.data.userData.username)
        localStorage.setItem('firstname',data.data.userData.firstname)
        localStorage.setItem('lastname',data.data.userData.lastname)
        localStorage.setItem('status',data.data.userData.status)
        localStorage.setItem('token',data.data.token)
        this.props.getUserData(data.data.userData, data.data.token)
        this.context.router.history.push('/dashboard');
      }
    })
    .catch(error => {
      console.log(error)
    });
  }

  searchPath=(e)=>{
    e.preventDefault()
    console.log(this.state.box1)
    console.log(this.state.box2)
    axios.post("http://localhost:3000/roadData/findRoadPath",
    {
      data: {
        busStop1: this.state.box1,
        busStop2: this.state.box2
      }
    },
    {
      headers:{
        'Access-Control-Allow-Origin': '*',
        'Control-Type': 'application/json'
      }
    })
    .then(data =>{
      console.log(data)
      if(data.data.result === "success"){
        var tempPage = []
        for(var temp = 0;temp < Math.ceil(data.data.roadPath.length/10);temp++){
          tempPage[temp] = temp+1;
        }
        if(data.data.busPoint){
          this.setState({
            busPoint: data.data.busPoint,
          })
        }
        else {
          this.setState({
            busPoint: [this.state.box1, this.state.box2],
          })
        }
        this.setState({
          NoRoute: false,
          roadType: data.data.roadType,
          resultPage: tempPage,
          resultFromSearch: data.data.roadPath,
          showSearch: true,
        })
      }
      else {
        this.setState({
          NoRoute: true,
        })
      }
    })
    .catch(error => {
      console.log(error)
    });
  }

  getBoxValue=(data)=>{
    if(data === "1"){
      this.set
    }
  }

  showSelectedPath=(busRoute, index)=>{
    axios.post("http://localhost:3000/roadData/roadPathWay",
    {
      data: {
        startPlace: this.state.box1,
        endPlace: this.state.box2,
        roadPath: busRoute,
      }
    },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Control-Type': 'application/json'
      }
    })
    .then(data => {
      this.props.Polyline(data.data.roadWay)
      var temp = "";
      for(var idx = 0; idx < busRoute.length; idx++){
        if(idx === busRoute.length - 1){
          temp = temp.concat(busRoute[idx] + ".")
        }
        else {
          temp = temp.concat(busRoute[idx] + " ต่อ ")
        }
      }
      var path = "";
      if(this.state.roadType === 'single'){
        path = path.concat(this.state.busPoint[0] + " - " +  this.state.busPoint[1])
      }
      else{
        for(var i = 0; i < this.state.busPoint[index].buspoint.length; i++){
          if(i === this.state.busPoint[index].buspoint.length - 1){
            path = path.concat(this.state.busPoint[index].buspoint[i])
          }
          else {
            path = path.concat(this.state.busPoint[index].buspoint[i] + " - ")
          }
        }
      }
      var center = data.data.roadWay[Math.ceil(data.data.roadWay.length/2)]
      this.props.toMapDetail(temp,path,center)
    })
    .catch(error => {
      console.log(error)
    })
  }

  showBusRoute=(data)=>{
    console.log(data)
    if(data !== null){
      this.props.toMapDetail(this.state.busName[data].name, this.state.busName[data].fullname,this.props.roadData[data].centerPath)
      this.props.Polyline(this.props.roadData[data].roadMapBus.roadMap)
      this.setState({
        checkBus: false
      })
    }
    else {
      this.setState({
        checkBus: true
      })
    }
  }

  render(){
    return(
      <div>
        {this.props.select === '1'
          ? <div className="LargeModal animated fadeInUp">
              {this.state.showSearch === false
                ? <div>
                    <form onSubmit={this.searchPath}>
                      <div className="ModalTopic">
                        <span>ค้นหาเส้นทาง</span>
                      </div>
                      <div className="ModalBody">
                        <div className="HalfSide">
                          <span className="ModalHeading">จุดเริ่มต้น</span>
                          <SearchBox item={this.state.busStop} Box="1" getSelectedValue={this.getSelectedValue}/>
                        </div>
                        <div className="HalfSide">
                          <span className="ModalHeading">ปลายทาง</span>
                          <SearchBox item={this.state.busStop} Box="2" getSelectedValue={this.getSelectedValue}/>
                        </div>
                        {this.state.NoRoute === true
                          ? <div style={{textAlign:'center',color:'red',fontSize:'18px',marginTop:'1em'}}>
                              <span>** ขออภัย ไม่พบเส้นทางที่ท่านค้นหา **</span>
                            </div>
                          : null
                        }
                        <div className="ButtonArea">
                            <button type="submit" className="SearchButton" >ค้นหา</button>
                        </div>
                      </div>
                    </form>
                  </div>
                : <div>
                    <div className="ModalTopic">
                      <Fa icon="arrow-left" className="UndoIcon" onClick={()=>this.closeSearchToggle(this.props.select)}/>
                      <span>ผลการค้นหา</span>
                    </div>
                    <div className="ResultArea">
                      <table className="Result">
                        <thead>
                          <tr>
                            <th style={{width:"20%"}}>สายรถเมย์</th>
                            <th style={{width:"60%"}}>การเดินทาง</th>
                            <th style={{width:"20%"}}>ดูเส้นทาง</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.resultFromSearch.map((eachResult, index) => {
                            if(Math.ceil((index+1)/10) === this.state.currentPage){
                              if(this.state.roadType === "single"){
                                return(
                                  <tr key={index}>
                                    <td>{eachResult}</td>
                                    <td>{this.state.busPoint.map((way, index) => {
                                      if(index === this.state.busPoint.length-1){
                                        return(way)
                                      }
                                      else {
                                        return(way + " - ")
                                      }
                                    })}</td>
                                    <td><Fa icon="bus" size='lg' className="ToMapIcon" onClick={()=>this.showSelectedPath([eachResult], index)}/></td>
                                  </tr>
                                )
                              }
                              else {
                                return(
                                  <tr key={index}>
                                    <td>{
                                      eachResult.roadPath.map((eachRoute,index)=>{
                                        if(index === eachResult.roadPath.length-1){
                                          return(eachRoute)
                                        }
                                        else{
                                          return(eachRoute + " ต่อ ")
                                        }
                                      })
                                    }</td>
                                    <td>{this.state.busPoint[index].buspoint.map((way, idx) => {
                                      if(idx === this.state.busPoint[index].buspoint.length-1){
                                        return(way)
                                      }
                                      else{
                                        return(way + " - ")
                                      }
                                    })}</td>
                                    <td><Fa icon="bus" size='lg' className="ToMapIcon" onClick={()=>this.showSelectedPath(eachResult.roadPath, index)}/></td>
                                  </tr>
                                )
                              }
                            }
                          })}
                        </tbody>
                      </table>
                    </div>
                    {this.state.resultPage.length > 1
                      ? <div style={{textAlign:'center'}}>
                          {this.state.currentPage != 1
                            ? <Fa icon='caret-left' size='2x' className="PreviousPage" onClick={()=>this.toPreviousPage()}/>
                            : null
                          }
                          {this.state.resultPage.map((eachPage) => {
                            if(eachPage === this.state.currentPage){
                              return(
                                <span className="InPage" onClick={()=>this.changePage(eachPage)} id="">{eachPage}</span>
                              )
                            }
                            else{
                              return(
                                <span className="PageNumber" onClick={()=>this.changePage(eachPage)}>{eachPage}</span>
                              )
                            }
                          })}
                          {this.state.currentPage != this.state.resultPage.length
                            ? <Fa icon='caret-right' size='2x' className="NextPage" onClick={()=>this.toNextPage()}/>
                            : null
                          }
                        </div>
                      : null
                    }
                  </div>
              }
            </div>
          : null
        }
        {this.props.select === '2'
          ? <div>
              <div className="Modal animated fadeInUp">
                <div className="ModalTopic">
                  <span>สายรถเมย์</span>
                </div>
                <div className="ModalBody">
                  <div className="HalfSide">
                    <span className="ModalHeading">สายรถเมย์</span>
                    <SearchBox item={this.state.busName} Box="3" getSelectedValue={this.getSelectedValue}/>
                  </div>
                  {this.state.checkBus === true
                    ? <div style={{textAlign:'center',color:'red',fontSize:'18px',marginTop:'1em'}}>
                        <span>** ขออภัย ไม่พบสายรถที่ท่านค้นหา **</span>
                      </div>
                    : null
                  }
                  <div className="ButtonArea">
                    <button className="SearchButton" onClick={()=>this.showBusRoute(this.state.selectedBusName)}>ค้นหา</button>
                  </div>
                </div>
              </div>
            </div>
          : null
        }
        {this.props.select === '0'
          ? <div>
            {this.props.userToken !== null
              ? this.context.router.history.push('/dashboard')
              : <form onSubmit={this.checkLogin}>
                <div className="Modal animated fadeInUp">
                  <div className="ModalTopic" style={{marginBottom:'0.1em'}}>
                    <span>เข้าสู่ระบบ</span>
                  </div>
                  <div className="ModalWarning">
                    <span>**เฉพาะเจ้าหน้าที่เท่านั้น**</span>
                  </div>
                  <div className="ModalBody">
                    <div>
                      <span className="ModalHeading">ชื่อบัญชี</span>
                      <input type='text' value={this.state.username} onChange={this.handleUsername} placeholder='กรุณากรอกชื่อบัญชี' className="LoginBox" required/>
                    </div>
                    <div>
                      <span className="ModalHeading">รหัสผ่าน</span>
                      <input type='password' value={this.state.password} onChange={this.handlePassword} placeholder='กรุณากรอกรหัสผ่าน' className="LoginBox" required/>
                    </div>
                    <div className="LoginArea">
                      <button type="submit" value="submit" className="LoginButton">เข้าสู่ระบบ</button>
                    </div>
                  </div>
                </div>
              </form>
            }
          </div>
          : null
        }
      </div>
    );
  }
}

Modal.contextTypes = {
  router: PropTypes.object.isRequired
}

const mapDispatchToProps = (dispatch) => ({
  getUserData: (data, token) => dispatch(getUserData(data, token))
});

const mapStateToProps = (state) => ({
  roadData: state.RoadData.roadData,
  userData: state.UserData.userData,
  userToken: state.UserData.userToken,
});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
