import React , {Component} from 'react';
import '../CSS/LogoutConfirmModal.css';
import { Link } from 'react-router-dom';

class LogoutConfirmModal extends Component {
  constructor(){
    super();
    this.state = {

    };
  }

  render(){
    return(
      <div>
        <div className="LogoutConfirmModalOutside" />
        <div className="LogoutConfirmModalInside animated fadeInUp">
          <div className="LogoutConfirmModalTopic">
            <span>ออกจากระบบ</span>
          </div>
          <div className="LogoutConfirmModalBody">
            <span>คุณต้องการที่จะออกจากระบบใช่หรือไม่ ?</span>
          </div>
          <div className="LogoutConfirmModalbButtonArea">
            <div className="LogoutConfirmModalCancelArea">
              <button type="button" className="LogoutConfirmModalCancelButton" onClick={()=>this.props.changeLogoutToggle()}>ยกเลิก</button>
            </div>
            <div className="LogoutConfirmModalSubmitArea">
              <Link to="">
                <button type="submit" className="LogoutConfirmModalSubmitButton" >ตกลง</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default LogoutConfirmModal;
