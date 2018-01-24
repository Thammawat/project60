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

  render(){
    return(
      <div>
        {this.props.option === '1'
          ? <div className="UserOptionModal animated fadeInUp">
              <div className="Topic">
                <span>เพิ่มสมาชิกใหม่</span>
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
                image={UserPic}
                width={150}
                height={150}
                border={10}
                borderRadius={200}
                color={[0, 0, 0, 0.6]} // RGBA
                scale={1.8}
                rotate={0}
              />
              </div>
            </div>
          : null
        }
      </div>
    );
  }
}

export default UserOptionModal;
