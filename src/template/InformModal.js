import React, {Component} from 'react';
import '../CSS/InformModal.css';
import '../animate.css';
import SearchBox from './SearchBox.js'

class Modal extends Component {
  constructor(){
    super();
    this.state = {
      libraries:[
        {name:'ลาดกระบัง'},
        {name:'สนามบินสุวรรณภูมิ'},
        {name:'เมกะ บางนา'},
        {name:'อนุเสาวรีย์ชัยสมรภูมิ'},
        {name:'บ้านไอ้โด่ง'}
      ],
    };
  }

  render(){
    return(
      <div>
        {this.props.select === '1'
          ? <div className="Modal animated fadeInUp">
              <div className="ModalTopic">
                <span>ค้นหาเส้นทาง</span>
              </div>
              <div className="ModalBody">
                <div className="HalfSide">
                  <span>จุดเริ่มต้น</span>
                  <SearchBox item={this.state.libraries}/>
                </div>
                <div className="HalfSide">
                  <span>ปลายทาง</span>
                  <SearchBox item={this.state.libraries}/>
                </div>
                <div className="ButtonArea">
                  <button className="SearchButton">ค้นหา</button>
                </div>
              </div>
            </div>
          : null
        }
        {this.props.select === '2'
          ? <div className="Modal animated fadeInUp">
              <div className="ModalTopic">
                <span>สายรถเมย์</span>
              </div>
              <div className="ModalBody">
                <div className="HalfSide">
                  <span>สาย</span>
                  <SearchBox item={this.state.libraries}/>
                </div>
                <div className="ButtonArea">
                  <button className="SearchButton">ค้นหา</button>
                </div>
              </div>
            </div>
          : null
        }
      </div>
    );
  }
}

export default Modal;
