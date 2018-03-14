import React, {Component} from 'react';
import '../CSS/MemberModal.css';
import axios from 'axios';
import { connect } from 'react-redux';



class MemberModal extends Component {
  constructor(){
    super();
    this.state = {
      tempMember: {},
      currentMember: {},
    }
  }

  componentWillMount=()=>{
    this.setState({
      currentMember: this.props.currentMember,
    })
  }

  changeFirstname=(e)=>{
    var temp = this.state.tempMember
    temp.firstname = e.target.value
    this.setState({
      tempMember: temp
    })
  }

  changeLastname=(e)=>{
    var temp = this.state.tempMember
    temp.lastname = e.target.value
    this.setState({
      tempMember: temp
    })
  }

  changeUsername=(e)=>{
    var temp = this.state.tempMember
    temp.username = e.target.value
    this.setState({
      tempMember: temp
    })
  }

  changePassword=(e)=>{
    var temp = this.state.tempMember
    temp.password = e.target.value
    this.setState({
      tempMember: temp
    })
  }

  changeStatus=(e)=>{
    var temp = this.state.tempMember
    temp.status = e.target.value
    this.setState({
      tempMember: temp
    })
  }

  editStatus=(e)=>{
    var temp = this.state.currentMember
    temp.status = e.target.value
    this.setState({
      currentMember: temp
    })
  }

  addData=(e)=>{
    e.preventDefault()
    axios.post("http://localhost:3000/user/addUser",
    {
      data: {
        adminUsername: this.props.userData.username,
        adminStatus: this.props.userData.status,
        token: this.props.userToken,
        firstname: this.state.tempMember.firstname,
        lastname: this.state.tempMember.lastname,
        username: this.state.tempMember.username,
        password: this.state.tempMember.password,
        status: this.state.tempMember.status,
      }
    },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Control-Type': 'application/json'
      }
    })
    .then(data => {
      console.log(data);
      if(data.data.result === "User has Created"){
        this.props.updateMember()
      }
    })
    .catch(error => {
      console.log(error)
    });
  }

  editData=(e)=>{
    e.preventDefault()
    axios.post("http://localhost:3000/user/editStatusUser",
    {
      data: {
        adminUsername: this.props.userData.username,
        adminStatus: this.props.userData.status,
        token: this.props.userToken,
        username: this.state.currentMember.username,
        userStatus: this.state.currentMember.status,
      }
    },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Control-Type': 'application/json'
      }
    })
    .then(data => {
      console.log(data);
      if(data.data.result === "User edit success"){
        this.props.getCurrentMember(this.state.currentMember)
        this.props.updateMember()
      }
    })
    .catch(error => {
      console.log(error)
    });
  }

  render(){
    console.log(this.props.currentMember)
    return(
      <div>
        {this.props.MemberModalTopic === "เพิ่มสมาชิกใหม่"
          ? <form onSubmit={this.addData}>
              <div className="MemberModalOutside" onClick={()=>this.props.changeMemberModalToggle()} />
              <div className="MemberModalInside animated fadeInUp">
                <div className="MemberModalTopic">
                  <span>เพิ่มสมาชิกใหม่</span>
                </div>
                <div className="MemberModalBody">
                  <div className="HalfModal">
                    <input type="text" className="MemberModalInput" placeholder="ชื่อ" value={this.state.tempMember.firstname} onChange={this.changeFirstname}/>
                  </div>
                  <div style={{width:'5%',display:'inline-block'}} />
                  <div className="HalfModal">
                    <input type="text" className="MemberModalInput" placeholder="นามสกุล" value={this.state.tempMember.lastname} onChange={this.changeLastname}/>
                  </div>
                  <div>
                    <input type="text" className="MemberModalInput" placeholder="ชื่อบัญชี" value={this.state.tempMember.username} onChange={this.changeUsername}/>
                  </div>
                  <div>
                    <input type="password" className="MemberModalInput" placeholder="รหัสผ่าน" value={this.state.tempMember.password} onChange={this.changePassword}/>
                  </div>
                  <div className="PermissionTopic">
                    <span>สถานะของสมาชิก :</span>
                  </div>
                  <div className="PermissionList">
                    <input type="radio" value="admin" checked={this.state.tempMember.status === 'admin'} onChange={this.changeStatus} className="PermissionChoice" />
                    <span> ผู้ดูแลระบบ</span>
                  </div>
                  <div className="PermissionList">
                    <input type="radio" value="assistant" checked={this.state.tempMember.status === 'assistant'} onChange={this.changeStatus} className="PermissionChoice" />
                    <span> ผู้ช่วยผู้ดูแลระบบ</span>
                  </div>
                  <div className="PermissionList">
                    <input type="radio" value="member" checked={this.state.tempMember.status === 'member'} onChange={this.changeStatus} className="PermissionChoice" />
                    <span> สมาชิกทั่วไป</span>
                  </div>
                  <div className="MemberModalButtonArea">
                    <div className="MemberModalCancelArea">
                      <button type="button" className="MemberModalCancelButton" onClick={()=>this.props.changeMemberModalToggle()}>ยกเลิก</button>
                    </div>
                    <div className="MemberModalSubmitArea">
                      <button type="submit" value="submit"  className="MemberModalSubmitButton">ตกลง</button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          : <form onSubmit={this.editData}>
              <div className="MemberModalOutside" onClick={()=>this.props.changeMemberModalToggle()} />
              <div className="MemberModalInside animated fadeInUp">
                <div className="MemberModalTopic">
                  <span>แก้ไขข้อมูลสมาชิก</span>
                </div>
                <div className="MemberModalBody">
                  <div className="HalfModal">
                    <input type="text" className="MemberModalInput" placeholder="ชื่อ" value={this.state.currentMember.firstname} disabled/>
                  </div>
                  <div style={{width:'5%',display:'inline-block'}} />
                  <div className="HalfModal">
                    <input type="text" className="MemberModalInput" placeholder="นามสกุล" value={this.state.currentMember.lastname} disabled/>
                  </div>
                  <div className="PermissionTopic">
                    <span>สถานะของสมาชิก :</span>
                  </div>
                  <div className="PermissionList">
                    <input type="radio" value="admin" checked={this.state.currentMember.status === 'admin'} onChange={this.editStatus} className="PermissionChoice" />
                    <span> ผู้ดูแลระบบ</span>
                  </div>
                  <div className="PermissionList">
                    <input type="radio" value="assistant" checked={this.state.currentMember.status === 'assistant'} onChange={this.editStatus} className="PermissionChoice" />
                    <span> ผู้ช่วยผู้ดูแลระบบ</span>
                  </div>
                  <div className="PermissionList">
                    <input type="radio" value="member" checked={this.state.currentMember.status === 'member'} onChange={this.editStatus} className="PermissionChoice" />
                    <span> สมาชิกทั่วไป</span>
                  </div>
                  <div className="MemberModalButtonArea">
                    <div className="MemberModalCancelArea">
                      <button type="button" className="MemberModalCancelButton" onClick={()=>this.props.changeMemberModalToggle()}>ยกเลิก</button>
                    </div>
                    <div className="MemberModalSubmitArea">
                      <button type="submit" value="submit" className="MemberModalSubmitButton">ตกลง</button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
        }
      </div>
    );
  }
}

const mapDispatchToProps = (dispat) => ({
  getCurrentMember: (data) => dispatch(getCurrentMember(data)),
});

const mapStateToProps = (state) => ({
  userData: state.UserData.userData,
  userToken: state.UserData.userToken,
  currentMember: state.UserData.currentMember,
});

export default connect(mapStateToProps, null)(MemberModal);
