import React, {Component} from 'react';
import '../CSS/MemberModal.css';

class MemberModal extends Component {
  constructor(props){
    super(props);
    this.state = {
      tempMember: props.inputObject,
    }
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

  render(){
    return(
      <div>
        <div className="MemberModalOutside" onClick={()=>this.props.changeMemberModalToggle()} />
        <div className="MemberModalInside animated fadeInUp">
          <div className="MemberModalTopic">
            <span>{this.props.MemberModalTopic}</span>
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
              <input type="text" className="MemberModalInput" placeholder="รหัสผ่าน" value={this.state.tempMember.password} onChange={this.changePassword}/>
            </div>
            <div className="PermissionTopic">
              <span>สถานะของสมาชิก :</span>
            </div>
            <div className="PermissionList">
              <input type="radio" value="admin" checked={this.state.tempMember.status === 'admin'} onChange={this.changeStatus} className="PermissionChoice" />
              <span> ผู้ดูแลระบบ</span>
            </div>
            <div className="PermissionList">
              <input type="radio" value="member" checked={this.state.tempMember.status === 'member'} onChange={this.changeStatus} className="PermissionChoice" />
              <span> สมาชิกทั่วไป</span>
            </div>
            <div className="MemberModalbButtonArea">
              <div className="MemberModalCancelArea">
                <button type="button" className="MemberModalCancelButton" onClick={()=>this.props.changeMemberModalToggle()}>ยกเลิก</button>
              </div>
              <div className="MemberModalSubmitArea">
                <button type="button" className="MemberModalSubmitButton" onClick={this.props.MemberModalTopic === 'เพิ่มสมาชิกใหม่'?()=>{this.props.addMember(this.state.tempMember);this.props.changeMemberModalToggle()}:()=>{this.props.editMember(this.props.currentMember ,this.state.tempMember);this.props.changeMemberModalToggle()}}>ตกลง</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MemberModal;
