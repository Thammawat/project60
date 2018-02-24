import React, {Component} from 'react';
import '../CSS/Setting.css';
import Fa from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-free-solid';

class Setting extends Component {
  constructor(props){
    super(props);
    this.state = {
      onEdit: false,
      userAccount: this.props.userAccount,
    };
  }

  ToggleEdit=()=>{
    this.setState({
      onEdit: !this.state.onEdit,
    })
  }

  handleFirstname=(e)=>{
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

  render() {
    return(
      <div className="SettingArea">
        <div className="SettingTopic">
          <span>ข้อมูลผู้ใช้</span>
        </div>
        <div className="SettingBody">
          <div className="SettingHeaderArea">
            <span className="SettingHeader">รายละเอียดข้อมูล</span>
          </div>
          <div className="EditButtonArea">
            {this.state.onEdit === false
              ? <button type="button" className="EditButton" onClick={()=>this.ToggleEdit()}>
                  <Fa icon='pencil-alt' size="lg" className="EditIcon" />
                  <span>แก้ไขข้อมูล</span>
                </button>
              : <button type="button" className="EditButton" onClick={()=>this.ToggleEdit()}>
                  <Fa icon='save' size="lg" className="SaveIcon" />
                  <span>บันทึกข้อมูล</span>
                </button>
            }
          </div>
          <div className="spaceDiv" />
          <div className="EachFormArea">
            <div className="EachFormTopic">
              <span>ชื่อ</span>
            </div>
            {this.state.onEdit === false
              ? <div className="EachFormData">
                  <span className="DataFont">: {this.state.userAccount.firstname}</span>
                </div>
              : <div className="EachFormData">
                  <span className="DataFont">: </span>
                  <input type="text" value={this.state.userAccount.firstname} onChange={this.handleFirstname} className="DataInput"/>
                </div>
            }
          </div>
          <div className="EachFormArea">
            <div className="EachFormTopic">
              <span>นามสกุล</span>
            </div>
            {this.state.onEdit === false
              ? <div className="EachFormData">
                  <span className="DataFont">: {this.state.userAccount.lastname}</span>
                </div>
              : <div className="EachFormData">
                  <span className="DataFont">: </span>
                  <input type="text" value={this.state.userAccount.lastname} onChange={this.handleLastname} className="DataInput"/>
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
                  <span className="DataFont">: {this.state.userAccount.username}</span>
                </div>
              : <div className="EachFormData">
                  <span className="DataFont">: </span>
                  <input type="text" value={this.state.userAccount.username} onChange={this.handleUsername} className="DataInput"/>
                </div>
            }
          </div>
          <div className="EachFormArea">
            <div className="EachFormTopic">
              <span>รหัสผ่าน</span>
            </div>
            {this.state.onEdit === false
              ? <div className="EachFormData">
                  <span className="DataFont">: {this.state.userAccount.password}</span>
                </div>
              : <div className="EachFormData">
                  <span className="DataFont">: </span>
                  <input type="text" value={this.state.userAccount.password} onChange={this.handlePassword} className="DataInput"/>
                </div>
            }
          </div>
          <div className="spaceDiv" />
        </div>
      </div>
    );
  }
}

export default Setting;
