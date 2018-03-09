import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import '../CSS/InformModal.css';
import '../animate.css';
import SearchBox from './SearchBox.js';
import Fa from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-free-solid';
import { connect } from 'react-redux';

class Modal extends Component {
  constructor(){
    super();
    this.state = {
      resultPage: null,
      currentPage: 1,
      showSearch1: false,
      showSearch2: false,
      busName: null,
      selectedBusName: null,
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

  render(){
    console.log(this.state.selectedBusName)
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
          ? <div className="Modal animated fadeInUp">
              <div className="ModalTopic" style={{marginBottom:'0.1em'}}>
                <span>เข้าสู่ระบบ</span>
              </div>
              <div className="ModalWarning">
                <span>**เฉพาะเจ้าหน้าที่เท่านั้น**</span>
              </div>
              <div className="ModalBody">
                <div>
                  <span className="ModalHeading">ชื่อบัญชี</span>
                  <input type='text' placeholder='กรุณากรอกชื่อบัญชี' className="LoginBox"/>
                </div>
                <div>
                  <span className="ModalHeading">รหัสผ่าน</span>
                  <input type='password' placeholder='กรุณากรอกรหัสผ่าน' className="LoginBox"/>
                </div>
                <div className="LoginArea">
                  <Link to="dashboard">
                    <button className="LoginButton">เข้าสู่ระบบ</button>
                  </Link>
                </div>
              </div>
            </div>
          : null
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  roadData: state.RoadData.roadData
});

export default connect(mapStateToProps, null)(Modal);
