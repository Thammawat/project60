import React, {Component} from 'react';
import Test2 from './Test2.js';

class Test1 extends Component {
  constructor(){
    super();
    this.state = {
      testObj: [{
        Name:'hello',
      }],
    };
  }

  render(){
    console.log(this.state.testObj[0].Name)
    return(
      <div>
        {this.state.testObj.map((eachTest) => {
          return(
            <span>{eachTest.Name}</span>
          )
        })}
        <Test2 testObj={this.state.testObj[0]} />
      </div>
    );
  }
}

export default Test1;
