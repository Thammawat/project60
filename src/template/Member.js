import React, {Component} from 'react';
import '../CSS/Member.css';
import Fa from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-free-solid';
import MemberModal from './MemberModal.js';
import axios from 'axios';
import { connect } from 'react-redux';

class Member extends Component {
  constructor(){
    super();
    this.state = {
      inputObject:null,
      MemberModalTopic: null,
      MemberModalToggle: false,
      currentMember: null,
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

  updateMember=()=>{
    axios.get("http://localhost:3000/user").then(data => {
      this.setState({
        allOfUser: data.data.user,
      })
    })
  }

  changeMemberModalToggle=()=>{
    this.setState({
      MemberModalToggle: !this.state.MemberModalToggle,
    })
  }

  setData=(topic ,object ,index)=>{
    this.setState({
      MemberModalTopic: topic,
      inputObject: object,
      currentMember: index,
    })
  }

  render() {
    return(
      <div>
        {this.state.MemberModalToggle === true
          ? <MemberModal changeMemberModalToggle={this.changeMemberModalToggle} MemberModalTopic={this.state.MemberModalTopic} updateMember={this.updateMember} inputObject={this.state.inputObject} currentMember={this.state.currentMember}/>
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
                ? <button type="button" className="AddMemberButton" onClick={()=>{this.changeMemberModalToggle();this.setData("เพิ่มสมาชิกใหม่",{},null)}}>
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
                            <td><Fa icon="edit" size="lg" className="pointer mainColor" onClick={()=>{this.changeMemberModalToggle();this.setData("แก้ไขข้อมูลสมาชิก",eachMember,index)}}/></td>
                            <td><Fa icon="trash-alt" size="lg" className="pointer mainColor" onClick={()=>this.props.deleteMember(index)}/></td>
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

const mapStateToProps = (state) => ({
  userData: state.UserData.userData
});

export default connect(mapStateToProps, null)(Member);
