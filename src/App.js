import { subscribeToPods } from './api';
import { subscribeToServices } from './api';
import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    const podInfo = Object.keys(this.state.pods).map(key => 
      <p>{this.state.pods[key].objectName}</p>  
    )

    const podGroup = Object.keys(this.state.pods).map(key => 
      <>
        <circle cy="80" cx={key * 150 + 70} r={this.state.podSize} className={this.state.pods[key].objectStatus}/>
        <text x={key * 150 + 70} y={50 + (key*20)} textAnchor="middle" stroke="#000" className="podlabel">{this.state.pods[key].objectName}</text>
      </>
    )

    const serviceGroup = Object.keys(this.state.services).map(key => 
      <>
        <rect x="150" y="200" width="200" height="75" rx="15" ry="15" fill="cornflowerblue" stroke="cornflowerblue"/>
        <text x="245" y="245" textAnchor="middle" stroke="#000" className="podlabel">{this.state.services[key].objectName}</text>
      </>
    )
    const serviceInfo = Object.keys(this.state.services).map(key => 
      <p>{key} &nbsp; {this.state.services[key].objectName}</p>  
    )

    return (
      <div className="App">
        <svg width="800" height={this.state.chartHeight}>
          <g id="pods">
            {podGroup}
          </g> 
          <g id="services">
            {serviceGroup}
          </g>           
        </svg>
        <div className="App-intro">
        Number of Pods {this.state.pods.length}
        {podInfo}
        <br/>
        Number of Services {this.state.services.length}
        {serviceInfo}
        </div>
      </div>
    );
  }

  constructor(props) {
    super(props);
    subscribeToPods((err, pods) => this.setState({ 
      pods 
    }));
    subscribeToServices((err, services) => this.setState({ 
      services 
    }));
  }

  state = {
    pods: [],
    chartHeight: 400,
    podSize: 60,
    services: []
  };
}

export default App;
