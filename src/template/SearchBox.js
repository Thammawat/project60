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
    console.log(this.state.currentItem)
    return(
      <div style={{display:'inline-block'}}>
        <div className="DropdownSearchbox">
          <input type="text" value={this.state.searchString} onChange={this.handleSearch} placeholder="type here..." className="SearchBox" onFocus={()=>this.onFocus()} onBlur={()=>this.autoComplete()}/>
          {this.state.searchString != '' && this.state.showItem === true
            ? <ul>
                {libraries.map(function(i){
                  return <li key={i.name} onMouseOver={()=>this.hoverItem(i.name)} onMouseOut={()=>this.onBlur()}>{i.name}</li>
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
