import React, {Component} from 'react';
import '../CSS/SearchBox.css';

class SearchBox extends Component{
  constructor(){
    super();
    this.state = {
      searchString:'',
    };
  }

  handleSearch=(e)=>{
    this.setState({
      searchString: e.target.value,
    })
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
          <input type="text" value={this.state.searchString} onChange={this.handleSearch} placeholder="type here..." className="SearchBox2"/>
          {this.state.searchString != ''
            ? <ul>
                {libraries.map(function(i){
                  return <li>{i.name}</li>
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
