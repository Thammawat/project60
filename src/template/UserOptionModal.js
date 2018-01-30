import React, {Component} from 'react';
import '../CSS/UserOptionModal.css';
import AvatarEditor from 'react-avatar-editor';
import Fa from 'react-fa';

import UserPic from '../image/user_image.jpg';

class UserOptionModal extends Component{
  constructor(){
    super();
    this.state = {

    };
  }

  onClickSave = () => {
   if (this.editor) {
     const canvas = this.editor.getCroppingRect()
     const canvasScaled = this.editor.getImageScaledToCanvas()
     const pic = this.editor.getImage()
     console.log(canvas)
     console.log(canvasScaled)
     console.log(pic)
   }
 }

 setEditorRef = (editor) => this.editor = editor

  render(){
    return(
      <div>
        {this.props.option === '1'
          ? <div className="UserOptionModal animated fadeInUp">
              <div className="Topic">
                <span>เพิ่มสมาชิกใหม่</span>
              </div>
              <div className="Body">
                <span>ชื่อบัญชี</span>
                <input type="text" placeholder="กรุณาใส่ชื่อบัญชี" className="RegisterBox"/>
              </div>
              <div className="Body">
                <span>รหัสผ่าน</span>
                <input type="text" placeholder="กรุณาใส่รหัสผ่าน" className="RegisterBox"/>
              </div>
              <div className="Body">
                <span>สิทธิ์ในการเข้าถึง :</span>
                <div className="PermissionList">
                  <input type='checkbox' name="permission" value='1' className='PermissionChoice'/>
                  <span> การอ่านรายงาน</span>
                </div>
                <div className="PermissionList">
                  <input type='checkbox' name="permission" value='2' className='PermissionChoice'/>
                  <span> การเพิ่มสมาชิกใหม่</span>
                </div>
              </div>
              <div className="AreaOfButton">
                <button type="button" className="CancelButton" onClick={()=>this.props.userCancel()}>ยกเลิก</button>
                <button type="submit" className="SubmitButton">ตกลง</button>
              </div>
            </div>
          : null
        }
        {this.props.option === '2'
          ? <div className="UserOptionModal animated fadeInUp">
              <div className="Topic">
                <span>การตั้งค่า</span>
              </div>
              <div style={{textAlign:'center'}}>
                <Fa name="upload" size="5x"/>
                <div>
                  <button onClick={()=>this.onClickSave()}>SAVE</button>
                </div>
              </div>
            </div>
          : null
        }
      </div>
    );
  }
}

export default UserOptionModal;
