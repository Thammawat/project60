import React, {Component} from 'react';
import '../CSS/ListInSideBar.css';

class List extends Component {
  constructor(){
    super();
    this.state = {

    };
  }

  render(){
    return(
      <div>
        <div className="SideBarList">
          <span className="listName">{this.props.listName}</span>
        </div>
      </div>
    );
  }
}

export default List;
