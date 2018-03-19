import React, { Component } from 'react';
import "../CSS/ConfirmModal.css";

class ConfirmModal extends Component {
  constructor(){
    super();
    this.state = {

    };
  }

  render(){
    return(
      <div>
        <div className="ConfirmModalOutside" />
        {this.props.MemberModalTopic === "เพิ่มสมาชิกใหม่"
          ? <div className="ConfirmModalInside animated fadeInUp">
              <div className="ConfirmModalTopic">
                <span>เพิ่มสมาชิกสำเร็จ</span>
              </div>
              <div className="ConfirmModalBody">
                <span>เพิ่มข้อมูลสมาชิกใหม่เรียบร้อย</span>
              </div>
              <div className="ConfirmModalButtonArea">
                <button type="button" className="ConfirmModalSubmitButton" onClick={()=>this.props.closeConfirmModal()} >ตกลง</button>
              </div>
            </div>
          : null
        }
        {this.props.MemberModalTopic === "แก้ไขข้อมูลสมาชิก"
          ? <div className="ConfirmModalInside animated fadeInUp">
              <div className="ConfirmModalTopic">
                <span>แก้ไขสมาชิกสำเร็จ</span>
              </div>
              <div className="ConfirmModalBody">
                <span>แก้ไขข้อมูลสมาชิกเรียบร้อย</span>
              </div>
              <div className="ConfirmModalButtonArea">
                <button type="button" className="ConfirmModalSubmitButton" onClick={()=>this.props.closeConfirmModal()} >ตกลง</button>
              </div>
            </div>
          : null
        }
        {this.props.MemberModalTopic === "ลบข้อมูลสมาชิก"
          ? <div className="ConfirmModalInside animated fadeInUp">
              <div className="ConfirmModalTopic">
                <span>ลบสมาชิกสำเร็จ</span>
              </div>
              <div className="ConfirmModalBody">
                <span>ลบข้อมูลสมาชิกเรียบร้อย</span>
              </div>
              <div className="ConfirmModalButtonArea">
                <button type="button" className="ConfirmModalSubmitButton" onClick={()=>this.props.closeConfirmModal()} >ตกลง</button>
              </div>
            </div>
          : null
        }
        {this.props.MemberModalTopic === "เปลี่ยนรหัสผ่าน"
          ? <div className="ConfirmModalInside animated fadeInUp">
              <div className="ConfirmModalTopic">
                <span>ตั้งรหัสผ่านใหม่สำเร็จ</span>
              </div>
              <div className="ConfirmModalBody">
                <span>เปลี่ยนรหัสผ่านเรียบร้อย</span>
              </div>
              <div className="ConfirmModalButtonArea">
                <button type="button" className="ConfirmModalSubmitButton" onClick={()=>this.props.closeSuccessModal()} >ตกลง</button>
              </div>
            </div>
          : null
        }
        {this.props.MemberModalTopic === "แก้ไขข้อมูลส่วนตัว"
          ? <div className="ConfirmModalInside animated fadeInUp">
              <div className="ConfirmModalTopic">
                <span>แก้ไขข้อมูลสำเร็จ</span>
              </div>
              <div className="ConfirmModalBody">
                <span>แก้ไขข้อมูลส่วนตัวเรียบร้อย</span>
              </div>
              <div className="ConfirmModalButtonArea">
                <button type="button" className="ConfirmModalSubmitButton" onClick={()=>this.props.closeSuccessModal()} >ตกลง</button>
              </div>
            </div>
          : null
        }
      </div>
    );
  }
}

export default ConfirmModal;
