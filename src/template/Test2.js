import React, {Component} from 'react';

class Test2 extends Component {
  constructor(props){
    super(props);
    this.state = {
      inputObject: this.props.testObj,
    };
  }

  handleChange=(e)=>{
    var newName = this.state.inputObject
    newName.Name = e.target.value
    this.setState({
      inputObject: newName
    })
  }

  render(){
    console.log(this.props)
    return(
      <div>
        <input type="text" value={this.state.inputObject.Name} onChange={this.handleChange}/>
        <span>{this.props.testObj.Name}</span>
      </div>
    );
  }
}

export default Test2;
