import React , {Component} from 'react';
import "../CSS/DetailModal.css";
import GoogleMapReact from 'google-map-react';
import Fa from '@fortawesome/react-fontawesome';
import axios from 'axios';

class DetailModal extends Component {
  constructor(){
    super();
    this.state = {
      center: {lat: 13.75, lng: 100.517},
      zoom: 11,
      map: '',
      maps: '',
      mapLoaded: true,
      path: [],
      GulityPath: [],
      failData: false,
    };
  }

  componentWillMount=()=>{
    axios.get('http://localhost:3000/roadData').then(data => {
      var temp = data.data.roadData.filter((eachRoad) => (eachRoad.name === this.props.busRoad))
      var center = {lat:temp[0].centerPath.lat, lng:temp[0].centerPath.lng}
      var result = []
      for(var index = 0; index < temp[0].roadMapBus.roadMap.length;index++){
        result.push({lat:temp[0].roadMapBus.roadMap[index].lat, lng:temp[0].roadMapBus.roadMap[index].lng})
      }
      var GulityPath = []
      this.props.busLog.map((eachPosition) => {
        if(eachPosition.lat !== 0 || eachPosition.lng !== 0){
          GulityPath.push({lat: eachPosition.lat, lng: eachPosition.lng})
        }
        else{
          this.setState({
            failData: true,
          })
        }
      })
      this.setState({
        path: result,
        center: center,
        GulityPath: GulityPath,
      })
    })
  }

  RenderDetail=()=>{
    if(this.state.maps !== ''){
      var polyline = new this.state.maps.Polyline({
        path: this.state.path,
        strokeColor: "#373A47",
        strokeOpacity: 1,
        strokeWeight: 4,
      });
      polyline.setMap(this.state.map)
      var GulityPolyline = new this.state.maps.Polyline({
        path: this.state.GulityPath,
        strokeColor: "red",
        strokeOpacity: 1,
        strokeWeight: 4,
      })
      GulityPolyline.setMap(this.state.map)
    }
    console.log(this.props.overDrive.busID)
    if(!this.props.overDrive.busID){
      return(
        <Fa icon="map-marker-alt" size="2x" style={{color:"blue"}} lat={this.props.overDrive.lat} lng={this.props.overDrive.lng}/>
      )
    }
  }

  render(){
    return(
      <div>
        <div className="DetailModalOutside"/>
        <div className="DetailModalInside animated fadeInUp">
          <div className="DetailModalTopic">
            <span>รายละเอียด</span>
          </div>
          {this.state.failData === true
            ? <div className="FailArea">
                <span>ขออภัย</span>
                <br/>
                <span>ไม่สามารถแสดงรายละเอียดได้ เนื่องจากข้อมูลที่มีไม่ต่อเนื่องกัน</span>
              </div>
            : <div className="DetailModalBody">
                <GoogleMapReact
                  center={this.state.center}
                  zoom={this.state.zoom}
                  onGoogleApiLoaded={({ map, maps }) => { this.setState({ map: map, maps: maps, mapLoaded: true }) }}
                >
                  <Fa icon="dollar-sign" size="2x" style={{color:"blue"}} lat={this.props.busLog[0].lat} lng={this.props.busLog[0].lng}/>
                  <Fa icon="ban" size="2x" style={{color:"blue"}} lat={this.props.busLog[this.props.busLog.length-1].lat} lng={this.props.busLog[this.props.busLog.length-1].lng}/>
                  {this.RenderDetail()}
                </GoogleMapReact>
              </div>
          }
          <div className="DetailModalButtonArea">
            <button type="button" className="DetailModalCancelButton" onClick={()=>this.props.closeDetail()}>ปิด</button>
          </div>
        </div>
      </div>
    );
  }
}

export default DetailModal;
