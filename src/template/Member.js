import React, {Component} from 'react';
import '../CSS/Member.css';
import Fa from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-free-solid';
import MemberModal from './MemberModal.js';
import axios from 'axios';
import { connect } from 'react-redux';

import { getCurrentMember } from '../reducers/userData/userDataAction.js';

class Member extends Component {
  constructor(props){
    super(props);
    this.state = {
      MemberModalTopic: null,
      MemberModalToggle: false,
      allOfUser: [],
    };
  }

  componentWillMount=()=>{
    axios.get("http://localhost:3000/user").then(data => {
      this.setState({
        allOfUser: data.data.user,
      })
    })
  }

  changeMemberModalToggle=()=>{
    axios.get("http://localhost:3000/user").then(data => {
      this.setState({
        allOfUser: data.data.user,
      })
    })
    console.log(this.state.allOfUser)
    this.setState({
      MemberModalToggle: !this.state.MemberModalToggle,
    })
  }

  deleteMember=(data)=>{
    console.log(data)
    axios.post("http://localhost:3000/user/removeUser",
    {
      data: {
        adminUsername: this.props.userData.username,
        adminStatus: this.props.userData.status,
        token: this.props.userToken,
        username: data,
      }
    },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Control-Type': 'application/json'
      }
    })
    .then(data => {
      if(data.data.result === "User remove success"){
        this.updateMember()
      }
    })
    .catch(error =>{
      console.log(error)
    });
  }

  selectedMember=(data)=>{
    this.props.getCurrentMember(data)
  }

  setTopic=(data)=>{
    this.setState({
      MemberModalTopic: data,
    })
  }

  render() {
    return(
      <div>
        {this.state.MemberModalToggle === true
          ? <MemberModal changeMemberModalToggle={this.changeMemberModalToggle} MemberModalTopic={this.state.MemberModalTopic} updateMember={this.updateMember} />
          : null
        }
        <div className="MemberArea">
          <div className="MemberTopic">
            <span>การจัดการสมาชิก</span>
          </div>
          <div className="MemberBody">
            <div className="MemberHeaderArea">
              <span className="MemberHeader">รายชื่อสมาชิก</span>
            </div>
            <div className="AddMemberButtonArea">
              {this.props.userData.status === 'admin' || this.props.userData.status === 'assistant'
                ? <button type="button" className="AddMemberButton" onClick={()=>{this.changeMemberModalToggle();this.setTopic("เพิ่มสมาชิกใหม่")}}>
                    <Fa icon="user-plus" size='lg' className="AddMemberIcon"/>
                    เพิ่มสมาชิกใหม่
                  </button>
                : null
              }
            </div>
            {this.state.allOfUser.length === 0
              ? <div className="NoMemberArea">
                  <div>
                    <span>ขณะนี้ยังไม่มีสมาชิกอยู่ในระบบ</span>
                  </div>
                  <div>
                    <span>กรุณากดที่ปุ่มเพิ่มสมาชิกด้านบนเพื่อเพิ่มสมาชิก</span>
                  </div>
                </div>
              : <div>
                  <table className="MemberResult">
                    {this.props.userData.status === 'admin' || this.props.userData.status === 'assistant'
                      ? <tr>
                          <th>ลำดับที่</th>
                          <th>ชื่อ</th>
                          <th>นามสกุล</th>
                          <th>สถานะ</th>
                          <th>แก้ไข</th>
                          <th>ลบ</th>
                        </tr>
                      : <tr>
                          <th>ลำดับที่</th>
                          <th>ชื่อ</th>
                          <th>นามสกุล</th>
                          <th>สถานะ</th>
                        </tr>
                    }
                    {this.state.allOfUser.map((eachMember, index) => {
                      if(this.props.userData.status === 'admin' || this.props.userData.status === 'assistant'){
                        return(
                          <tr key={index}>
                            <td>{index+1}</td>
                            <td>{eachMember.firstname}</td>
                            <td>{eachMember.lastname}</td>
                            <td>
                              {eachMember.status === 'admin'
                                ? <span>ผู้ดูแลระบบ</span>
                                : null
                              }
                              {eachMember.status === 'assistant'
                                ? <span>ผู้ช่วยผู้ดูแลระบบ</span>
                                : null
                              }
                              {eachMember.status === 'member'
                                ? <span>สมาชิกทั่วไป</span>
                                : null
                              }
                            </td>
                            <td><Fa icon="edit" size="lg" className="pointer mainColor" onClick={()=>{this.changeMemberModalToggle();this.selectedMember(eachMember);this.setTopic("แก้ไขข้อมูลสมาชิก")}}/></td>
                            <td><Fa icon="trash-alt" size="lg" className="pointer mainColor" onClick={()=>this.deleteMember(eachMember.username)}/></td>
                          </tr>
                        )
                      }
                      else{
                        return(
                          <tr key={index}>
                            <td>{index+1}</td>
                            <td>{eachMember.firstname}</td>
                            <td>{eachMember.lastname}</td>
                            <td>
                              {eachMember.status === 'admin'
                                ? <span>ผู้ดูแลระบบ</span>
                                : null
                              }
                              {eachMember.status === 'assistant'
                                ? <span>ผู้ช่วยผู้ดูแลระบบ</span>
                                : null
                              }
                              {eachMember.status === 'member'
                                ? <span>สมาชิกทั่วไป</span>
                                : null
                              }
                            </td>
                          </tr>
                        )
                      }
                    })}
                  </table>
                </div>
            }
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getCurrentMember: (data) => dispatch(getCurrentMember(data))
});

const mapStateToProps = (state) => ({
  userData: state.UserData.userData,
  userToken: state.UserData.userToken
});

export default connect(mapStateToProps, mapDispatchToProps)(Member);
