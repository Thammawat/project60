import React, {Component} from 'react';
import '../CSS/Setting.css';
import Fa from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-free-solid';
import ResetModal from './ResetModal.js';
import ConfirmModal from './ConfirmModal.js';
import axios from 'axios';
import { connect } from 'react-redux';

import { getUserData } from '../reducers/userData/userDataAction.js';

class Setting extends Component {
  constructor(props){
    super(props);
    this.state = {
      onEdit: false,
      userAccount: {},
      resetPasswordToggle: false,
      alreadyReset: false,
      MemberModalTopic: null,
    };
  }

  ToggleEdit=()=>{
    this.setState({
      onEdit: !this.state.onEdit,
    })
  }

  handleFirstname = (e) => {
    var temp = this.state.userAccount
    temp.firstname = e.target.value
    this.setState({
      userAccount: temp
    })
  }

  handleLastname=(e)=>{
    var temp = this.state.userAccount
    temp.lastname = e.target.value
    this.setState({
      userAccount: temp
    })
  }

  handleUsername=(e)=>{
    var temp = this.state.userAccount
    temp.username = e.target.value
    this.setState({
      userAccount: temp
    })
  }

  handlePassword=(e)=>{
    var temp = this.state.userAccount
    temp.password = e.target.value
    this.setState({
      userAccount: temp
    })
  }

  changeResetPasswordToggle=()=>{
    this.setState({
      resetPasswordToggle: !this.state.resetPasswordToggle
    })
  }

  showResetSuccess=()=>{
    this.setState({
      resetPasswordToggle: false,
      alreadyReset: true,
    })
  }

  closeSuccessModal=()=>{
    this.setState({
      alreadyReset: false,
    })
  }

  changeTopic=(data)=>{
    this.setState({
      MemberModalTopic: data,
    })
  }

  saveData=(e)=>{
    e.preventDefault()
    if(!this.state.userAccount.firstname){
      console.log("hello")
      var temp = this.state.userAccount
      temp.firstname = this.props.userData.firstname
      this.setState({
        userAccount: temp
      })
    }
    if(!this.state.userAccount.lastname){
      var temp = this.state.userAccount
      temp.lastname = this.props.userData.lastname
      this.setState({
        userAccount: temp
      })
    }
    if(!this.state.userAccount.username){
      var temp = this.state.userAccount
      temp.username = this.props.userData.username
      this.setState({
        userAccount: temp
      })
    }
    axios.post("http://localhost:3000/user/editProfileUser",
    {
      data: {
        username: this.props.userData.username,
        token: this.props.userToken,
        newUsername: this.state.userAccount.username,
        newFirstname: this.state.userAccount.firstname,
        newLastname: this.state.userAccount.lastname,
      }
    },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Control-Type': 'application/json'
      }
    })
    .then(data => {
      if(data.data.result === "User edit success"){
        this.props.getUserData(data.data.userData, data.data.token)
        this.ToggleEdit()
        this.setState({
          alreadyReset: true
        })
      }
    })
    .catch(error => {
      console.log(error)
    });
  }

  render() {
    return(
      <div className="SettingArea">
        {this.state.resetPasswordToggle === true
          ? <ResetModal changeResetPasswordToggle={this.changeResetPasswordToggle} showResetSuccess={this.showResetSuccess}/>
          : null
        }
        {this.state.alreadyReset === true
          ? <ConfirmModal closeSuccessModal={this.closeSuccessModal} MemberModalTopic={this.state.MemberModalTopic}/>
          : null
        }
        <div className="SettingTopic">
          <span>ข้อมูลผู้ใช้</span>
        </div>
        <div className="SettingBody">
          <div className="SettingHeaderArea">
            <span className="SettingHeader">รายละเอียดข้อมูล</span>
          </div>
          <div className="ResetButtonArea">
            <button type="button" className="ResetButton" onClick={()=>{this.changeResetPasswordToggle();this.changeTopic("เปลี่ยนรหัสผ่าน")}}>
              <Fa icon="unlock" size="lg" className="ResetIcon" />
              <span>ตั้งรหัสผ่านใหม่</span>
            </button>
          </div>
          <div className="EditButtonArea">
            {this.state.onEdit === false
              ? <button type="button" className="EditButton" onClick={()=>{this.ToggleEdit();this.changeTopic("แก้ไขข้อมูลส่วนตัว")}}>
                  <Fa icon='pencil-alt' size="lg" className="EditIcon" />
                  <span>แก้ไขข้อมูล</span>
                </button>
              : <button type="button" className="OnEdit">
                  <Fa icon='pencil-alt' size="lg" className="SaveIcon" />
                  <span>กำลังแก้ไข</span>
                </button>
            }
          </div>
          <form onSubmit={this.saveData}>
            <div className="spaceDiv" />
            <div className="EachFormArea">
              <div className="EachFormTopic">
                <span>ชื่อ</span>
              </div>
              {this.state.onEdit === false
                ? <div className="EachFormData">
                    <span className="DataFont">: {this.props.userData.firstname}</span>
                  </div>
                : <div className="EachFormData">
                    <span className="DataFont">: </span>
                    <input type="text"
                     defaultValue={this.props.userData.firstname}
                     value={this.state.userAccount.firstname}
                    name="firstname" onChange={this.handleFirstname} className="DataInput"/>
                  </div>
              }
            </div>
            <div className="EachFormArea">
              <div className="EachFormTopic">
                <span>นามสกุล</span>
              </div>
              {this.state.onEdit === false
                ? <div className="EachFormData">
                    <span className="DataFont">: {this.props.userData.lastname}</span>
                  </div>
                : <div className="EachFormData">
                    <span className="DataFont">: </span>
                    <input type="text" defaultValue={this.props.userData.lastname} value={this.state.userAccount.lastname} onChange={this.handleLastname} className="DataInput"/>
                  </div>
              }
            </div>
            <div className="spaceDiv" />
            <div className="spaceDiv" />
            <div className="EachFormArea">
              <div className="EachFormTopic">
                <span>ชื่อบัญชี</span>
              </div>
              {this.state.onEdit === false
                ? <div className="EachFormData">
                    <span className="DataFont">: {this.props.userData.username}</span>
                  </div>
                : <div className="EachFormData">
                    <span className="DataFont">: </span>
                    <input type="text" defaultValue={this.props.userData.username} value={this.state.userAccount.username} onChange={this.handleUsername} className="DataInput"/>
                  </div>
              }
            </div>
            {this.state.onEdit === true
              ? <div style={{marginTop:"1em"}}>
                  <div style={{display:"inline-block",width:"50%",textAlign:"left"}}>
                    <button type="button" className="SettingCancelButton" onClick={()=>this.ToggleEdit()}>ยกเลิก</button>
                  </div>
                  <div style={{display:"inline-block",width:"50%",textAlign:"right"}}>
                    <button type="submit" className="AcceptButton" >ตกลง</button>
                  </div>
                </div>
              : null
            }
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getUserData: (data, token) => dispatch(getUserData(data, token)),
});

const mapStateToProps = (state) => ({
  userData: state.UserData.userData,
  userToken: state.UserData.userToken,
});

export default connect(mapStateToProps, mapDispatchToProps)(Setting);
