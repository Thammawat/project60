import React, {Component} from 'react';
import '../CSS/Report.css';
import Fa from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-free-solid';
import axios from 'axios';
import CsvDownloader from 'react-csv-downloader';
import DetailModal from './DetailModal.js'

class Report extends Component {
  constructor(){
    super();
    this.state = {
      busGulity: [],
      date: null,
      busName: [],
      chosenBus: "all",
      showDetail: false,
      busLog: [],
      overDrive: {},
      busRoad: "",
      busID: "",
      type: "",
    };
  }

  componentWillMount=()=>{
    axios.get("http://localhost:3000/busGulity").then(data =>{
      console.log(data)
      this.setState({
        busGulity: data.data.busGulity,
      })
    })
    axios.get("http://localhost:3000/roadData").then(data =>{
      var temp = []
      for(var index = 0; index < data.data.roadData.length; index++){
        temp.push(data.data.roadData[index].name)
      }
      this.setState({
        busName: temp
      })
    })
    var year = new Date().getFullYear();
    var month = new Date().getMonth()+1;
    var day = new Date().getDate();
    if(month < 10){
      month = "0" + month;
    }
    if(day < 10){
      day = "0" + day;
    }
    this.setState({
      date: "".concat(year + "-" + month + "-" + day)
    })
  }

  handleDate = e => {
    this.setState({
      date: e.target.value
    })
  }

  handleBus = e => {
    this.setState({
      chosenBus: e.target.value,
    })
  }

  filterTable=()=>{
    var temp = [];
    if(this.state.chosenBus === "all"){
      temp = this.state.busGulity.sort((a, b) => (new Date(a.timeStamp) - new Date(b.timeStamp))).filter((eachGulity) => (eachGulity.timeStamp.slice(0, 10) === this.state.date));
    }
    else {
      temp = this.state.busGulity.sort((a, b) => (new Date(a.timeStamp)-new Date(b.timeStamp))).filter((eachGulity) => (eachGulity.timeStamp.slice(0, 10) === this.state.date && eachGulity.busRoad === this.state.chosenBus));
    }
    return temp;
  }

  nextPage=(data)=>{
    console.log("work")
  }

  toDetail=(data)=>{
    this.setState({
      busLog: data.busLock,
      overDrive: data.overDriveOtherBus,
      busRoad: data.busRoad,
      busID: data.busID,
      type: data.type,
      showDetail: true,
    })
  }

  closeDetail=()=>{
    this.setState({
      showDetail: false,
    })
  }

  showBusGulity=()=>{
    if(this.state.busGulity.length !== 0){
      var result = [];
      if(this.state.chosenBus === 'all'){
        result = this.filterTable();
        if(result.length === 0){
          return(
            <div style={{textAlign:'center',fontSize:'20px',margin:'2em 0em'}}>
              <span>ไม่พบข้อมูลความผิดของรถทุกสายในช่วงเวลาที่ท่านค้นหา</span>
            </div>
          )
        }
        else {
          return(
            <div>
              <div style={{textAlign:'right',marginTop:"1em",fontSize:"18px"}}>
                <span> ผลการค้นหา: <span style={{fontWeight:"bold"}}>{result.length}</span> รายการ</span>
              </div>
              <table className="ReportResult">
                <tr>
                  <th style={{width:"10%"}}>ลำดับที่</th>
                  <th style={{width:"20%"}}>เวลา</th>
                  <th style={{width:"10%"}}>สายรถ</th>
                  <th style={{width:"20%"}}>ทะเบียนรถ</th>
                  <th style={{width:"25%"}}>ความผิด</th>
                  <th style={{width:"15%"}}>รายละเอียด</th>
                </tr>
                {result.map((eachList, index) => {
                  return(
                    <tr key={index}>
                      <td>{index+1}</td>
                      <td>{eachList.timeStamp.slice(11)}</td>
                      <td>{eachList.busRoad}</td>
                      <td>{eachList.busID}</td>
                      <td>{eachList.type}</td>
                      <td><Fa icon="info-circle" size="lg" className="infoIcon" onClick={()=>this.toDetail(eachList)}/></td>
                    </tr>
                  )
                })}
              </table>
            </div>
          )
        }
      }
      else {
        result = this.filterTable();
        if(result.length === 0){
          return(
            <div style={{textAlign:'center',fontSize:'20px',margin:'2em 0em'}}>
              <span>ไม่พบข้อมูลความผิดของรถสาย {this.state.chosenBus} ในช่วงเวลาที่ท่านค้นหา</span>
            </div>
          )
        }
        else {
          return(
            <div>
              <div style={{textAlign:'right',marginTop:"1em",fontSize:"18px"}}>
                <span> ผลการค้นหา: <span style={{fontWeight:"bold"}}>{result.length}</span> รายการ</span>
              </div>
              <table className="ReportResult">
                <tr>
                  <th style={{width:"10%"}}>ลำดับที่</th>
                  <th style={{width:"20%"}}>เวลา</th>
                  <th style={{width:"10%"}}>สายรถ</th>
                  <th style={{width:"20%"}}>ทะเบียนรถ</th>
                  <th style={{width:"25%"}}>ความผิด</th>
                  <th style={{width:"15%"}}>รายละเอียด</th>
                </tr>
                {result.map((eachList, index) => {
                  return(
                    <tr key={index}>
                      <td>{index+1}</td>
                      <td>{eachList.timeStamp.slice(11)}</td>
                      <td>{eachList.busRoad}</td>
                      <td>{eachList.busID}</td>
                      <td>{eachList.type}</td>
                      <td><Fa icon="info-circle" size="lg" className="infoIcon" onClick={()=>this.toDetail(eachList)}/></td>
                    </tr>
                  )
                })}
              </table>
            </div>
          )
        }
      }
    }
  }


  render() {
    const columns = [{
      id: 'index',
      displayName: 'ลำดับที่'
    }, {
      id: 'time',
      displayName: 'ช่วงเวลา'
    }, {
      id: 'busName',
      displayName: 'สายรถ'
    }, {
      id: 'busID',
      displayName: 'ทะเบียนรถ'
    }, {
      id: 'busGulity',
      displayName: 'ความผิด'
    }];
    var GlobalResult = this.filterTable();
    var result = [];
    for(var index = 0; index < GlobalResult.length; index++){
      result.push({
        index: index+1,
        time: GlobalResult[index].timeStamp.slice(11),
        busName: GlobalResult[index].busRoad,
        busID: GlobalResult[index].busID,
        busGulity: GlobalResult[index].type
      });
    }
    var datas = result;
    var year = new Date(this.state.date).getFullYear();
    var month = new Date(this.state.date).getMonth();
    var date = new Date(this.state.date).getDate();
    switch(month) {
      case 0:
          month = "Jan";
          break;
      case 1:
          month = "Feb";
          break;
      case 2:
          month = "Mar";
          break;
      case 3:
          month = "Apr";
          break;
      case 4:
          month = "May";
          break;
      case 5:
          month = "Jun";
          break;
      case 6:
          month = "Jul";
          break;
      case 7:
          month = "Aug";
          break;
      case 8:
          month = "Sep";
          break;
      case 9:
          month = "Oct";
          break;
      case 10:
          month = "Nov";
          break;
      case 11:
          month = "Dec";
    };
    var filename ="Report_" + date + "_" + month + "_" + year;
    return(
      <div className="ReportArea">
        {this.state.showDetail === true
          ? <DetailModal closeDetail={this.closeDetail} busLog={this.state.busLog} overDrive={this.state.overDrive} busRoad={this.state.busRoad} busID={this.state.busID} type={this.state.type} />
          : null
        }
        <div className="ReportTopic">
          <span>รายงานความผิด</span>
        </div>
        <div className="ReportBody">
          <div className="ReportInputArea">
            <div className="Date">
              <span>วันที่</span>
            </div>
            <div className="datePickerArea">
              <input type="date" className="datePicker" value={this.state.date} onChange={this.handleDate}/>
            </div>
            <div className="Route">
              <span>สายรถ</span>
            </div>
            <div className='SearchRoute'>
              <select className="busNameBox" onChange={this.handleBus}>
                <option value="all" selected>ทั้งหมด</option>
                {this.state.busName.map((eachBusName) => {
                  if(eachBusName !== "A1"){
                    return(
                      <option value={eachBusName}>{eachBusName}</option>
                    )
                  }
                })}
              </select>
            </div>
          </div>
          <div className="ReportDownloadArea">
            {GlobalResult.length === 0
              ? <button type='button' className="DownloadReport">
                  <Fa icon="download" size="lg" className="DownloadIcon"/>
                  <span>ดาวน์โหลดรายงาน</span>
                </button>
              : <CsvDownloader
                filename={filename}
                columns={columns}
                datas={datas}>
                  <button type='button' className="DownloadReport">
                    <Fa icon="download" size="lg" className="DownloadIcon"/>
                    <span>ดาวน์โหลดรายงาน</span>
                  </button>
                </CsvDownloader>
            }
          </div>
          {this.showBusGulity()}
        </div>
      </div>
    );
  }
}

export default Report;
