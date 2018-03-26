import React , {Component} from 'react';
import '../CSS/Dashboard.css';
import Fa from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-free-solid';
import Overview from './Overview.js';
import Report from './Report.js';
import Member from './Member.js';
import Setting from './Setting.js';
import LogoutConfirmModal from './LogoutConfirmModal.js';
import { connect } from 'react-redux';

class Dashboard extends Component {
  constructor(){
    super();
    this.state = {
      DbOption:'home',
      LogoutToggle:false,
    };
  }

  InOption=(data)=>{
    this.setState({
      DbOption: data,
    })
  }

  changeLogoutToggle=()=>{
    this.setState({
      LogoutToggle: !this.state.LogoutToggle,
    })
  }

  render(){
    return(
      <div className="DbBackground">
        {this.state.LogoutToggle === true
          ? <LogoutConfirmModal changeLogoutToggle={this.changeLogoutToggle}/>
          : null
        }
        <div className="DbSidebar">
          <div className="WelcomeSign">
            <div className="center">
              <span>ยินดีต้อนรับ</span>
            </div>
            <div className="center">
              <span>คุณ{this.props.userData.firstname} {this.props.userData.lastname}</span>
            </div>
          </div>
          {this.state.DbOption === 'home'
            ? <div className="DbListOnFocus">
                <Fa icon='chart-bar' size="lg" className="DbIcon" />
                <span className="DbListName">ภาพรวมระบบ</span>
              </div>
            : <div className="DbList" onClick={()=>this.InOption('home')}>
                <Fa icon='chart-bar' size="lg" className="DbIcon" />
                <span className="DbListName">ภาพรวมระบบ</span>
              </div>
          }
          {this.state.DbOption === 'report'
            ? <div className="DbListOnFocus">
                <Fa icon='file-alt' size="lg" className="DbIcon" />
                <span className="DbListName">รายงานความผิด</span>
              </div>
            : <div className="DbList" onClick={()=>this.InOption('report')}>
                <Fa icon='file-alt' size="lg" className="DbIcon" />
                <span className="DbListName">รายงานความผิด</span>
              </div>
          }
          {this.state.DbOption === 'member'
            ? <div className="DbListOnFocus">
                <Fa icon='users' size="lg" className="DbIcon" />
                <span className="DbListName">การจัดการสมาชิก</span>
              </div>
            : <div className="DbList" onClick={()=>this.InOption('member')}>
                <Fa icon='users' size="lg" className="DbIcon" />
                <span className="DbListName">การจัดการสมาชิก</span>
              </div>
          }
          {this.state.DbOption === 'setting'
            ? <div className="DbListOnFocus">
                <Fa icon='address-card' size="lg" className="DbIcon" />
                <span className="DbListName">ข้อมูลผู้ใช้</span>
              </div>
            : <div className="DbList" onClick={()=>this.InOption('setting')}>
                <Fa icon='address-card' size="lg" className="DbIcon" />
                <span className="DbListName">ข้อมูลผู้ใช้</span>
              </div>
          }
          <div className="DbList LogoutArea" onClick={()=>this.changeLogoutToggle()}>
              <Fa icon='sign-out-alt' size="lg" className="DbIcon" />
              <span className="DbListName">ออกจากระบบ</span>
          </div>
        </div>
        {this.state.DbOption === 'home'
          ? <Overview />
          : null
        }
        {this.state.DbOption === 'report'
          ? <Report RoutePath={this.state.RoutePath}/>
          : null
        }
        {this.state.DbOption === 'member'
          ? <Member />
          : null
        }
        {this.state.DbOption === 'setting'
          ? <Setting />
          : null
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userData: state.UserData.userData,
});

export default connect(mapStateToProps, null)(Dashboard);
