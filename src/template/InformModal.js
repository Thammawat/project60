import React, {Component} from 'react';
import '../CSS/InformModal.css';
import '../animate.css';

class Modal extends Component {
  constructor(){
    super();
    this.state = {

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
                  <span>ต้นทาง</span>
                  <input type="text"/>
                </div>
                <div className="HalfSide">
                  <span>ปลายทาง</span>
                  <input type="text"/>
                </div>
                <div className="ButtonArea">
                  <button>ค้นหา</button>
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
            </div>
          : null
        }
      </div>
    );
  }
}

export default Modal;
