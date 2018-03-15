import React, {Component} from 'react';
import "../CSS/ResetModal.css";
import axios from 'axios';
import { connect } from 'react-redux';

import { getUserData } from '../reducers/userData/userDataAction.js';

class ResetModal extends Component {
  constructor(){
    super();
    this.state = {
      oldPassword: null,
      newPassword: null,
      commitPassword: null,
      notSamePassword: false,
    };
  }

  handleOldPassword=(e)=>{
    this.setState({
      oldPassword: e.target.value,
    })
  }

  handleNewPassword=(e)=>{
    this.setState({
      newPassword: e.target.value,
    })
  }

  handleCommitPassword=(e)=>{
    this.setState({
      commitPassword: e.target.value,
    })
  }

  resetPassword=()=>{
    if(this.state.newPassword === this.state.commitPassword){
      axios.post("http://localhost:3000/user/editPasswordUser",
      {
        data: {
          username: this.props.userData.username,
          token: this.props.userToken,
          password: this.state.oldPassword,
          newPassword: this.state.newPassword,
        }
      },
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Control-Type': 'application/json'
        }
      })
      .then(data => {
        console.log(data.data.token);
        if(data.data.result === "User change password success"){
          this.props.getUserData(data.data.userData,data.data.token)
          this.setState({
            notSamePassword: false,
          })
          this.props.showResetSuccess()
        }
      })
      .catch(error => {
        console.log(error)
      });
    }
    else {
      console.log(this.state.newPassword)
      console.log(this.state.commitPassword)
      this.setState({
        notSamePassword: true,
      })
    }
  }

  render(){
    return(
      <div>
        <div className="ResetModalOutside" />
        <div className="ResetModalInside animated fadeInUp">
          <div className="ResetModalTopic">
            <span>ตั้งรหัสผ่านใหม่</span>
          </div>
          <div className="ResetModalBody">
            <div style={{padding:"0em 1em"}}>
              <div style={{width:"40%",display:"inline-block",textAlign:"center"}} >
                <span>รหัสผ่านเก่า</span>
              </div>
              <div style={{width:"50%",display:"inline-block"}} >
                <input type="password" placeholder="รหัสผ่านเก่า" value={this.state.oldPassword} onChange={this.handleOldPassword} className="ResetModalInput" />
              </div>
            </div>
            <div style={{padding:"0em 1em"}}>
              <div style={{width:"40%",display:"inline-block",textAlign:"center"}} >
                <span>รหัสผ่านใหม่</span>
              </div>
              <div style={{width:"50%",display:"inline-block"}} >
                <input type="password" placeholder="รหัสผ่านใหม่" value={this.state.newPassword} onChange={this.handleNewPassword} className="ResetModalInput" />
              </div>
            </div>
            <div style={{padding:"0em 1em"}}>
              <div style={{width:"40%",display:"inline-block",textAlign:"center"}} >
                <span>ยืนยันรหัสผ่านใหม่</span>
              </div>
              <div style={{width:"50%",display:"inline-block"}} >
                <input type="password" placeholder="ยืนยันรหัสผ่านใหม่" value={this.state.commitPassword} onChange={this.handleCommitPassword} className="ResetModalInput" />
              </div>
            </div>
            {this.state.notSamePassword === true
              ? <div style={{textAlign:'center'}}>
                  <span className="alertPassword">** รหัสผ่านใหม่ไม่ตรงกัน **</span>
                </div>
              : null
            }
          </div>
          <div className="ResetModalButtonArea">
            <div className="ResetModalCancelArea">
              <button type="button" className="ResetModalCancelButton" onClick={()=>this.props.changeResetPasswordToggle()}>ยกเลิก</button>
            </div>
            <div className="ResetModalSubmitArea">
              <button type="button" onClick={()=>this.resetPassword()} className="ResetModalSubmitButton">ตกลง</button>
            </div>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ResetModal);
