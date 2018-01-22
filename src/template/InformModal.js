import React, {Component} from 'react';
import '../CSS/InformModal.css';
import '../animate.css';
import SearchBox from './SearchBox.js'

class Modal extends Component {
  constructor(){
    super();
    this.state = {
      libraries:[
        {name:'hello'},
        {name:'world'}
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
                  <input type="text" className="SearchBox"/>
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
                <span>สายการเดินรถ</span>
                <input type="text" className="SearchBox"/>
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
