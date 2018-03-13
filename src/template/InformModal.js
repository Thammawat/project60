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
      resultPage: null,
      currentPage: 1,
      showSearch1: false,
      showSearch2: false,
      busName: null,
      selectedBusName: null,
      username:null,
      password:null,
    };
  }

  componentWillMount=()=>{
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

  showSearchToggle=(data)=>{
    var tempPage = []
    for(var temp = 0;temp < Math.ceil(this.props.results.length/10);temp++){
      tempPage[temp] = temp+1;
    }
    this.setState({
      resultPage: tempPage,
    })
    if(data === '1'){
      this.setState({
        showSearch1: true,
      })
    }
    if(data === '2'){
      this.setState({
        showSearch2: true,
      })
    }
  }

  closeSearchToggle=(data)=>{
    this.setState({
      resultPage: null,
      currentPage: 1,
    })
    if(data === '1'){
      this.setState({
        showSearch1: false,
      })
    }
    if(data === '2'){
      this.setState({
        showSearch2: false,
      })
    }
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

  getSelectedValue=(data)=>{
    for(var index = 0; index < this.state.busName.length;index++){
      if(this.state.busName[index].name === data){
        this.setState({
          selectedBusName: index,
        })
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
        this.props.getUserData(data.data.userData, data.data.token)
        this.context.router.history.push('/dashboard');
      }
    })
    .catch(error => {
      console.log(error)
    });
  }

  render(){
    return(
      <div>
        {this.props.select === '1'
          ? <div className="LargeModal animated fadeInUp">
              {this.state.showSearch1 === false
                ? <div>
                    <div className="ModalTopic">
                      <span>ค้นหาเส้นทาง</span>
                    </div>
                    <div className="ModalBody">
                      <div className="HalfSide">
                        <span className="ModalHeading">จุดเริ่มต้น</span>
                        <SearchBox item={this.props.libraries}/>
                      </div>
                      <div className="HalfSide">
                        <span className="ModalHeading">ปลายทาง</span>
                        <SearchBox item={this.props.libraries}/>
                      </div>
                      <div className="ButtonArea">
                          <button className="SearchButton" onClick={()=>this.showSearchToggle(this.props.select)}>ค้นหา</button>
                      </div>
                    </div>
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
                            <th>สายรถเมย์</th>
                            <th>เส้นทางการเดินรถ</th>
                            <th>ดูเส้นทาง</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.props.results.map((eachResult, index) => {
                            if(Math.ceil((index+1)/10) === this.state.currentPage){
                              return(
                                <tr key={eachResult.bus}>
                                  <td>{eachResult.bus}</td>
                                  <td>{eachResult.path}</td>
                                  <td><Fa icon="bus" size='lg' className="ToMapIcon" onClick={()=>{this.props.Polyline(),this.props.toMapDetail(eachResult.bus, eachResult.path)}}/></td>
                                </tr>
                              )
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
                    <SearchBox item={this.state.busName} getSelectedValue={this.getSelectedValue}/>
                  </div>
                  <div className="ButtonArea">
                    <button className="SearchButton" onClick={()=>{this.props.toMapDetail(this.state.busName[this.state.selectedBusName].name, this.state.busName[this.state.selectedBusName].fullname,this.props.roadData[this.state.selectedBusName].centerPath),this.props.Polyline(this.props.roadData[this.state.selectedBusName])}}>ค้นหา</button>
                  </div>
                </div>
              </div>
            </div>
          : null
        }
        {this.props.select === '0'
          ? <form onSubmit={this.checkLogin}>
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
  userData: state.UserData.userData
});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
