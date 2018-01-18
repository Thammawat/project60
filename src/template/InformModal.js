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
              <span>Feature1</span>
            </div>
          : null
        }
        {this.props.select === '2'
          ? <div className="Modal animated fadeInUp">
              <span>Feature2</span>
            </div>
          : null
        }
      </div>
    );
  }
}

export default Modal;
