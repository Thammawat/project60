import React, {Component} from 'react';
import '../CSS/ListInSideBar.css';
import Fa from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-free-solid';

class List extends Component {
  constructor(){
    super();
    this.state = {

    };
  }

  render(){
    return(
      <div className="SideBarList" onClick={()=>this.props.selectedOption(this.props.menu)}>
        <Fa icon={this.props.icon} size='lg'/>
        <span className="listName">{this.props.listName}</span>
      </div>
    );
  }
}

export default List;
