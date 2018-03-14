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
      userIndex:1,
      RoutePath:[
        {name:'ต.113'},
        {name:'A1'},
        {name:'T3'},
        {name:'8'},
        {name:'ปอ. 79'},
        {name:'1548'},
        {name:'ต.13'},
        {name:'751'},
        {name:'B'},
      ],
      memberData: [
        {
          firstname:'ธรรมวัฒน์',
          lastname:'บงการณ์',
          username:'BBFL',
          password:'1234',
          status:'admin',
        },
        {
          firstname:'ดรัณภพ',
          lastname:'ปั้นมา',
          username:'Nadood',
          password:'4321',
          status:'admin',
        },
        {
          firstname:'ธนนภัช',
          lastname:'สุโพธิ์',
          username:'DKKs',
          password:'5678',
          status:'member',
        },
        {
          firstname:'ทศพล',
          lastname:'พรมเพชร์',
          username:'Dewdroid',
          password:'8765',
          status:'member',
        }
      ],
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

  addMember=(data)=>{
    var newMember = this.state.memberData.slice()
    newMember.push(data)
    this.setState({
      memberData: newMember,
    })
  }

  deleteMember=(index)=>{
    var newMember = this.state.memberData
    newMember.splice(index, 1)
    this.setState({
      memberData: newMember,
    })
  }

  editMember=(index, data)=>{
    var newMember = this.state.memberData
    newMember.splice(index, 1, data)
    this.setState({
      memberData: newMember,
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
          ? <Member memberData={this.state.memberData} addMember={this.addMember} deleteMember={this.deleteMember} editMember={this.editMember} userAccount={this.state.memberData[this.state.userIndex]}/>
          : null
        }
        {this.state.DbOption === 'setting'
          ? <Setting userAccount={this.state.memberData[this.state.userIndex]} />
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
