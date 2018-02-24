import React, {Component} from 'react';
import '../CSS/Report.css';
import SearchBox from './SearchBox.js';
import Fa from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-free-solid';

class Report extends Component {
  constructor(){
    super();
    this.state = {

    };
  }

  render() {
    return(
      <div className="ReportArea">
        <div className="ReportTopic">
          <span>รายงานความผิด</span>
        </div>
        <div className="ReportBody">
          <div className="ReportInputArea">
            <div className="Date">
              <span>วันที่</span>
            </div>
            <div className="datePickerArea">
              <input type="date" className="datePicker" />
            </div>
            <div className="Route">
              <span>สายรถ</span>
            </div>
            <div className='SearchRoute'>
              <SearchBox item={this.props.RoutePath} />
            </div>
          </div>
          <div className="ReportDownloadArea">
            <button type='button' className="DownloadReport">
              <Fa icon="download" size="lg" className="DownloadIcon"/>
              <span>ดาวน์โหลดรายงาน</span>
            </button>
          </div>
          <div>
            <table className="ReportResult">
              <tr>
                <th>วันที่</th>
                <th>สายรถ</th>
                <th>เส้นทาง</th>
                <th>ความผิด</th>
              </tr>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default Report;
