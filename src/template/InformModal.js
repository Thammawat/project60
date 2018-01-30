import React, {Component} from 'react';
import '../CSS/InformModal.css';
import '../animate.css';
import SearchBox from './SearchBox.js';
import Fa from 'react-fa';

class Modal extends Component {
  constructor(){
    super();
    this.state = {
      libraries:[
        {name:'ลาดกระบัง'},
        {name:'สนามบินสุวรรณภูมิ'},
        {name:'เมกะ บางนา'},
        {name:'อนุเสาวรีย์ชัยสมรภูมิ'},
        {name:'บ้านไอ้โด่ง'},
        {name:'บางเสร่'},
        {name:'บ้านโน่น'},
        {name:'บ้านนู้น'},
        {name:'บ้านนั่น'},
      ],
      results:[
        {bus:'1',path:'เคหะร่มเกล้า - สะพานพุทธ'},
        {bus:'2',path:'สวนสยาม - สาทร'},
        {bus:'3',path:'ท่าอิฐ - อนุเสาวรีย์ชัยสมรภูมิ'},
        {bus:'4',path:'เคหะร่มเกล้า - สะพานพุทธ'},
        {bus:'5',path:'สวนสยาม - สาทร'},
        {bus:'6',path:'ท่าอิฐ - อนุเสาวรีย์ชัยสมรภูมิ'},
        {bus:'7',path:'เคหะร่มเกล้า - สะพานพุทธ'},
        {bus:'8',path:'สวนสยาม - สาทร'},
        {bus:'9',path:'ท่าอิฐ - อนุเสาวรีย์ชัยสมรภูมิ'},
        {bus:'10',path:'เคหะร่มเกล้า - สะพานพุทธ'},
        {bus:'11',path:'สวนสยาม - สาทร'},
        {bus:'12',path:'ท่าอิฐ - อนุเสาวรีย์ชัยสมรภูมิ'},
        {bus:'13',path:'เคหะร่มเกล้า - สะพานพุทธ'},
        {bus:'14',path:'สวนสยาม - สาทร'},
        {bus:'15',path:'ท่าอิฐ - อนุเสาวรีย์ชัยสมรภูมิ'},
        {bus:'16',path:'เคหะร่มเกล้า - สะพานพุทธ'},
        {bus:'17',path:'สวนสยาม - สาทร'},
        {bus:'18',path:'ท่าอิฐ - อนุเสาวรีย์ชัยสมรภูมิ'},
        {bus:'19',path:'เคหะร่มเกล้า - สะพานพุทธ'},
        {bus:'20',path:'สวนสยาม - สาทร'},
        {bus:'21',path:'ท่าอิฐ - อนุเสาวรีย์ชัยสมรภูมิ'},
        {bus:'22',path:'เคหะร่มเกล้า - สะพานพุทธ'},
        {bus:'23',path:'สวนสยาม - สาทร'},
        {bus:'24',path:'ท่าอิฐ - อนุเสาวรีย์ชัยสมรภูมิ'},
        {bus:'25',path:'เคหะร่มเกล้า - สะพานพุทธ'},
        {bus:'26',path:'สวนสยาม - สาทร'},
        {bus:'27',path:'ท่าอิฐ - อนุเสาวรีย์ชัยสมรภูมิ'},
        {bus:'28',path:'เคหะร่มเกล้า - สะพานพุทธ'},
        {bus:'29',path:'สวนสยาม - สาทร'},
        {bus:'30',path:'ท่าอิฐ - อนุเสาวรีย์ชัยสมรภูมิ'},
        {bus:'31',path:'เคหะร่มเกล้า - สะพานพุทธ'},
        {bus:'32',path:'สวนสยาม - สาทร'},
        {bus:'33',path:'ท่าอิฐ - อนุเสาวรีย์ชัยสมรภูมิ'},
        {bus:'34',path:'เคหะร่มเกล้า - สะพานพุทธ'},
        {bus:'35',path:'สวนสยาม - สาทร'},
        {bus:'36',path:'ท่าอิฐ - อนุเสาวรีย์ชัยสมรภูมิ'},
      ],
      resultPage: null,
      currentPage: 1,
      showSearch: false,
    };
  }

  changePage=(data)=>{
    console.log(data)
    this.setState({
      currentPage: data,
    })
    console.log(this.state.currentPage)
  }

  showSearchToggle=()=>{
    var tempPage = []
    for(var temp = 0;temp < Math.ceil(this.state.results.length/10);temp++){
      tempPage[temp] = temp+1;
    }
    this.setState({
      resultPage: tempPage,
      showSearch: true,
    })
  }

  closeSearchToggle=()=>{
    this.setState({
      resultPage: null,
      showSearch: false,
      currentPage: 1,
    })
  }

  toPreviousPage=()=>{
    if(this.state.currentPage > 1){
      this.setState({
        currentPage: this.state.currentPage - 1,
      })
    }
  }

  toNextPage=()=>{
    if(this.state.currentPage < this.state.resultPage.length){
      this.setState({
        currentPage: this.state.currentPage + 1,
      })
    }
  }

  render(){
    console.log(this.state.results.length)
    console.log(this.state.resultPage)
    return(
      <div>
        {this.props.select === '1'
          ? <div className="Modal animated fadeInUp">
              {this.state.showSearch===false
                ? <div>
                    <div className="ModalTopic">
                      <span>ค้นหาเส้นทาง</span>
                    </div>
                    <div className="ModalBody">
                      <div className="HalfSide">
                        <span className="ModalHeading">จุดเริ่มต้น</span>
                        <SearchBox item={this.state.libraries}/>
                      </div>
                      <div className="HalfSide">
                        <span className="ModalHeading">ปลายทาง</span>
                        <SearchBox item={this.state.libraries}/>
                      </div>
                      <div className="ButtonArea">
                          <button className="SearchButton" onClick={()=>this.showSearchToggle()}>ค้นหา</button>
                      </div>
                    </div>
                  </div>
                : <div>
                    <div className="ModalTopic">
                      <Fa name="arrow-left" className="UndoIcon" onClick={()=>this.closeSearchToggle()}/>
                      <span>ผลการค้นหา</span>
                    </div>
                    <div className="ResultArea">
                      <table className="Result">
                        <thead>
                          <tr>
                            <th>สายรถเมย์</th>
                            <th>เส้นทางการเดินรถ</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.results.map((eachResult, index) => {
                            if(Math.ceil((index+1)/10) === this.state.currentPage){
                              return(
                                  <tr key={eachResult.bus}>
                                    <td>{eachResult.bus}</td>
                                    <td>{eachResult.path}</td>
                                  </tr>
                                )
                            }
                          })}
                        </tbody>
                      </table>
                    </div>
                    <div style={{textAlign:'center'}}>
                      {this.state.currentPage != 1
                        ? <Fa name='caret-left' size='2x' className="PreviousPage" onClick={()=>this.toPreviousPage()}/>
                        : null
                      }
                      {this.state.resultPage.map((eachPage) => {
                        if(eachPage === 1){
                          return(
                            <span className="PageNumber" onClick={()=>this.changePage(eachPage)} id="">{eachPage}</span>
                          )
                        }
                        else{
                          return(
                            <span className="PageNumber" onClick={()=>this.changePage(eachPage)}>{eachPage}</span>
                          )
                        }
                      })}
                      {this.state.currentPage != this.state.resultPage.length
                        ? <Fa name='caret-right' size='2x' className="NextPage" onClick={()=>this.toNextPage()}/>
                        : null
                      }
                    </div>
                  </div>
              }
            </div>
          : null
        }
        {this.props.select === '2'
          ? <div className="Modal animated fadeInUp">
              <div className="ModalTopic">
                <span>สายรถเมย์</span>
              </div>
              <div className="ModalBody">
                <div className="HalfSide">
                  <span className="ModalHeading">สาย</span>
                  <SearchBox item={this.state.libraries}/>
                </div>
                <div className="ButtonArea">
                  <button className="SearchButton">ค้นหา</button>
                </div>
              </div>
            </div>
          : null
        }
      </div>
    );
  }
}

export default Modal;
