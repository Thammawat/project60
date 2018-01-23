import React, {Component} from 'react';
import '../CSS/ListInSideBar.css';
import Fa from 'react-fa';

class List extends Component {
  constructor(){
    super();
    this.state = {

    };
  }

  render(){
    return(
      <div>
        <div className="SideBarList" onClick={()=>this.props.selectedOption(this.props.menu)}>
          <Fa name={this.props.icon} />
          <span className="listName">{this.props.listName}</span>
        </div>
      </div>
    );
  }
}

export default List;
