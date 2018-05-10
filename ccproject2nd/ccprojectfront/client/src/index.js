import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';




class BasicInputelement extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      value:''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event){
    this.setState({
      value: event.target.value
    });
  }

  handleSubmit(event){
    this.props.getInfoFromChild(this.state.value);
  }

  render(){
    return(
      <div className="questionName"> 
        <div> {this.props.title} </div>
        <div className="NameInput">
          <input type="text" value={this.state.value} onChange={this.handleChange} />
          <input type="button" value ="Done" onClick={this.handleSubmit} /> 
        </div>
      </div>
    );
  }
}

class BasicRadiolement extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      value:'1',
      number:this.props.number,
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(changeEvent){
    this.setState({
      value: changeEvent.target.value
    });
    this.props.nextElment(this.props.number, changeEvent.target.value)
  }

  handleSubmit(event){
    alert('A name was submitted:'+this.state.value);
  }

  render(){
    return(
      <div className="question"> 
        <div>Q.{this.props.number}: {this.props.title}</div>
        <div className='radioEle'>
          <input type="button" className="yesbox" name={this.props.number} value={this.props.option[0]} onClick={this.handleChange} />
        </div>
        <div className='radioEle'>
          <input type="button" className="nobox" name={this.props.number} value={this.props.option[1]} onClick={this.handleChange} />
        </div>
      </div>
    );
  }
}

class Survey extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      title: ['Hey, could you tell us your name?','Do you like black coffee?',"Do you like grapefruit?"],
      optiontext: ['Yes','No'],
      name: null,
      value1: null,
      value2: null,
      response:null,
    };
    this.getInfoFromChild = this.getInfoFromChild.bind(this);
    this.startBtnClick = this.startBtnClick.bind(this);
    this.nextElment = this.nextElment.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
      // this.callApiTest();
  }
  
  callApi = async () => {
    alert(this.state.value1)
    const response = await fetch('/api/hello?q1='+this.state.value1+'&q2='+this.state.value2);
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };
  handleSubmit(event){
    this.callApi()
      .then(res => {this.setState({response:res.express});})
      .catch(err => console.log(err));
    alert('A new survey has been submitted.'+this.state.value1+this.state.value2);
  }

  getInfoFromChild(newInfo){
    this.setState({
      name:newInfo
    });
    if (newInfo === ''){alert('Valid input please~')}
    else{
      this.refs.greetingInfo.className = 'greetingEleHide'
      this.refs.greeting.className = 'greetingInfoShow'
    }
  }

  startBtnClick(event){
    this.refs.greeting.className = 'greetingInfoHide'
    this.refs.q1.className = 'questiondivshow'
  }

  nextElment(current,value){
    if (current === 1){
      this.setState({
        value1:value
      });
      this.refs.q1.className='questiondivhide'
      this.refs.q2.className='questiondivshow'
    }else{
      this.setState({
        value2:value
      });
      this.refs.q2.className='questiondivhide'
      this.refs.submitdiv.className='submitbtnshow'
    }
  }

  renderBasicElement(i){
    return(
      <BasicInputelement 
        number={i}
        title={this.state.title[i]}
        getInfoFromChild={ this.getInfoFromChild }
      />
    );
  }
  renderBasicRadioElement(i){
    return(
      <BasicRadiolement 
        number={i}
        title={this.state.title[i]}
        option={this.state.optiontext}
        nextElment = {this.nextElment}
      />
    );
  }

  render(){
    return (
      <div>
        <div className="header">
          <div className="innerheader"> 
            <div className="innerheader2">
              <label className="laberheader">Your Taste Profile{this.state.response}</label>
              <div className="divheader">
                <div>
                  <img className="imgheader" src={require('./pic/tab1.png')} alt='tab'/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="rootElement">
          <div className="greetingEle" ref="greetingInfo" >{this.renderBasicElement(0)}</div>
          <div className="greetingInfo" ref="greeting">
            <div>Nice to meet you, <span>{this.state.name}</span> We'd like to ask you a little about what you like to eat.</div>
            <div><input className="startbtn" type='button' value='Start' onClick={this.startBtnClick}/></div>
          </div>
          <div ref="q1" className="questiondiv">{this.renderBasicRadioElement(1)}</div>
          <div ref="q2" className="questiondiv">{this.renderBasicRadioElement(2)}</div>
          <div ref="submitdiv" className="submitbtn" >
            <input type="button" value ="Submit" onClick={this.handleSubmit} />
            <div className="returnInfo"> {this.state.response}</div>
          </div>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Survey />,
  document.getElementById('root')
);
