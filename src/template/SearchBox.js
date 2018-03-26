import React, {Component} from 'react';
import '../CSS/SearchBox.css';

class SearchBox extends Component{
  constructor(){
    super();
    this.state = {
      searchString:'',
      showItem: false,
      currentItem: ''
    };
  }

  handleSearch=(e)=>{
    this.setState({
      searchString: e.target.value,
    })
  }


  autoComplete=()=>{
    if(this.state.currentItem != ''){
      this.setState({
        searchString: this.state.currentItem,
      })
      this.props.getSelectedValue(this.props.Box, this.state.currentItem)
    }
    else {
      this.props.getSelectedValue(this.props.Box, this.state.searchString)
    }
    this.setState({
      showItem:false,
      currentItem: '',
    })
  }

  onFocus=()=>{
    this.setState({
      showItem:true,
    })
  }

  onBlur=()=>{
    this.setState({
      currentItem: '',
    })
  }

  hoverItem=(data)=>{
    this.setState({
      currentItem:data,
    })
  }

  render(){
    var libraries = this.props.item,
    searchString = this.state.searchString.trim().toLowerCase();
    if(searchString.length > 0) {
      libraries = libraries.filter(i => (
        i.name.toLowerCase().indexOf(searchString) >= 0 )
      );
    }
    return(
      <div style={{display:'inline-block'}}>
        <div className="DropdownSearchbox">
          <input type="text" value={this.state.searchString} onChange={this.handleSearch} placeholder="กรุณากรอกข้อมูล" className="SearchBox" onFocus={()=>this.onFocus()} onBlur={()=>this.autoComplete()} required/>
          {this.state.searchString != '' && this.state.showItem === true
            ? <ul>
                {libraries.map((i,index) => {
                  return (
                    <li key={i.name} onMouseOver={()=>this.hoverItem(i.name)} onMouseOut={()=>this.onBlur()}>{i.name}</li>
                  )
                })}
              </ul>
            : null
          }
        </div>
      </div>
    );
  }
}

export default SearchBox;
