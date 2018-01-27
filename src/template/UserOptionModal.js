import React, {Component} from 'react';
import '../CSS/UserOptionModal.css';
import AvatarEditor from 'react-avatar-editor';

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
                <div className="AreaOfButton">
                  <button type="button" className="CancelButton">ยกเลิก</button>
                  <button type="submit" className="SubmitButton">ตกลง</button>
                </div>
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
              <AvatarEditor
                ref={this.setEditorRef}
                image={UserPic}
                width={120}
                height={120}
                border={10}
                borderRadius={200}
                color={[0, 0, 0, 0.5]} // RGBA
                scale={1.8}
                rotate={0}
                style={{border:'3px solid #373a47'}}
              />
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
