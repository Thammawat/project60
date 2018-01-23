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

  autoComplete=(data)=>{
    this.setState({
      searchString: data,
      showItem: false,
    })
  }

  onBlur=()=>{
    this.setState({
      searchString: this.state.currentItem,
      showItem:false,
    })
  }

  onFocus=()=>{
    this.setState({
      showItem:true,
    })
  }

  hoverItem=(data)=>{
    this.setState({
      currentItem:data,
    })
  }

  testFunc=()=>{
      console.log("hello")
  }

  render(){
    var libraries = this.props.item,
    searchString = this.state.searchString.trim().toLowerCase();
    if(searchString.length > 0) {
      libraries = libraries.filter(function(i){
        return i.name.toLowerCase().match(searchString);
      });
    }
    return(
      <div style={{display:'inline-block'}}>
        <div className="DropdownSearchbox">
          <input type="text" value={this.state.searchString} onChange={this.handleSearch} placeholder="type here..." className="SearchBox2" onFocus={()=>this.onFocus()} onBlur={()=>this.onBlur()}/>
          {this.state.searchString != '' && this.state.showItem === true
            ? <ul>
                {libraries.map(function(i){
                  return <li key={i.name} onMouseOver={()=>this.hoverItem(i.name)}>{i.name}</li>
                }.bind(this))}
              </ul>
            : null
          }
        </div>
      </div>
    );
  }
}

export default SearchBox;
