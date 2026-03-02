
import { Button, Popconfirm } from "antd";
import React, { useEffect,useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {addAttendence} from "../../Customer/CustomerAction"

function StartStop(props) {

    const [state,setState]=useState(false);
    
    const toggle =() => {
        setState(!state);
        let data = {
          userId:props.userId
         
        }
        props.addAttendence(data)
    }

  return (
    <div>
    
     
     <Button type="primary"
     style={{height:"1.75rem"}}
     htmlType="submit"
     onClick={toggle}>
        {state ? "Stop" : "Start"}          
     </Button>
    
    </div>
  );
}
const mapStateToProps = ({ customer,auth }) => ({
  userId:auth.userDetails.userId
 
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addAttendence
      
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StartStop); 

// import React from 'react';
// import ReactDOM from 'react-dom';
// import StopwatchDisplay from "./StopwatchDisplay";
// import StopwatchHistory from './StopwatchHistory';

// class Stopwatch extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       running: false,
//       currentTimeMs: 0,
//       currentTimeSec: 0,
//       currentTimeMin: 0,
//     };
//   }

//   formatTime = (val, ...rest) => {
//     let value = val.toString();
//     if (value.length < 2) {
//       value = '0' + value;
//     }
//     if (rest[0] === 'ms' && value.length < 3) {
//       value = '0' + value;
//     }
//     return value;
//   };

//   start = () => {
//     if (!this.state.running) {
//       this.setState({ running: true });
//       this.watch = setInterval(() => this.pace(), 10);
//     }
//   };

//   stop = () => {
//     this.setState({ running: false });
//     clearInterval(this.watch);
//   };

//   pace = () => {
//     this.setState({ currentTimeMs: this.state.currentTimeMs + 10 });
//     if (this.state.currentTimeMs >= 1000) {
//       this.setState({ currentTimeSec: this.state.currentTimeSec + 1 });
//       this.setState({ currentTimeMs: 0 });
//     }
//     if (this.state.currentTimeSec >= 60) {
//       this.setState({ currentTimeMin: this.state.currentTimeMin + 1 });
//       this.setState({ currentTimeSec: 0 });
//     }
//   };

//   reset = () => {
//     this.setState({
//       currentTimeMs: 0,
//       currentTimeSec: 0,
//       currentTimeMin: 0,
//     });
//   };

//   render() {
//     return (
//       <div className={'stopwatch'}>
//         <h2 ref="header">Stopwatch</h2>
//         {this.state.running === false && (
//           <button onClick={this.start}>START</button>
//         )}
//         {this.state.running === true && (
//           <button onClick={this.stop}>STOP</button>
//         )}
//         <button onClick={this.reset}>RESET</button>
//         <StopwatchDisplay
//           ref="display"
//           {...this.state}
//           formatTime={this.formatTime}
//         />
//         <StopwatchHistory {...this.state} formatTime={this.formatTime} />
//       </div>
//     );
//   }
// }

// export default Stopwatch;