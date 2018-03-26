import React , {Component} from 'react';
import '../CSS/LogoutConfirmModal.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getUserData } from '../reducers/userData/userDataAction.js';

class LogoutConfirmModal extends Component {
  constructor(){
    super();
    this.state = {

    };
  }

  LogOut=()=>{
    localStorage.clear()
    this.props.getUserData(null, null)
    this.context.router.history.push('/')
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
          <div className="LogoutConfirmModalButtonArea">
            <div className="LogoutConfirmModalCancelArea">
              <button type="button" className="LogoutConfirmModalCancelButton" onClick={()=>this.props.changeLogoutToggle()}>ยกเลิก</button>
            </div>
            <div className="LogoutConfirmModalSubmitArea">
              <button type="submit" className="LogoutConfirmModalSubmitButton" onClick={this.LogOut}>ตกลง</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

LogoutConfirmModal.contextTypes = {
  router: PropTypes.object.isRequired
}

const mapDispatchToProps = (dispatch) => ({
  getUserData: (data, token) => dispatch(getUserData(data, token)),
});

export default connect(null, mapDispatchToProps)(LogoutConfirmModal);
