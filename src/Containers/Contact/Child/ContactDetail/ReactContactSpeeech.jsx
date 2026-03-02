import { Button, Tooltip } from 'antd';
import React from 'react';
import { connect } from "react-redux";
import styled from 'styled-components';

import { bindActionCreators } from "redux";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { FlexContainer } from '../../../../Components/UI/Layout';

import { addNote,getNotesListByContactId } from "../../ContactAction";
import { ClearOutlined, PlayCircleOutlined, StopOutlined } from '@ant-design/icons';

const Dictaphone = (props) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  function callback(){
    props.getNotesListByContactId(props.contactId)
  }

  function handleReactSpeech(){
    let data={
      notes:transcript,
      contactId: props.contactId,
      type: "contact",
    }
    props.addNote(data,callback)
  }

  return (
    <div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <div>
      <span
      onClick={SpeechRecognition.startListening}
      > 
      <Tooltip title="Start">
         <span style={{ fontSize: "1.5em",
    color: "red" }}>
<PlayCircleOutlined/>
        </span>
        </Tooltip>
      </span>
     
      <span
      // onClick={()=>{
      // SpeechRecognition.stopListening
      // }}
      onClick={SpeechRecognition.stopListening}
      >
         <Tooltip title="Stop">
         <span style={{ fontSize: "1.5em",color:"green",marginLeft:"3px" }}>
         
       <StopOutlined/>
       
        </span>
        </Tooltip>
      </span>
    
      {/* <button onClick={SpeechRecognition.stopListening}>Stop</button> */}
      <span
      onClick={resetTranscript}
      >
          <Tooltip title="Clear">
             <span style={{ fontSize: "1.5em",marginLeft:"3px" }}>
       <ClearOutlined/>
        </span>
        </Tooltip>
        </span>
        </div>
        <div>
        <textarea
        className="textarea"
        type="text"
        value={transcript}
        >
        
        </textarea>
      {/* <p>{transcript}</p> */}
      </div>
      <FlexContainer justifyContent="flex-end">
      <Button 
      type='primary'
      htmlType='submit'
      onClick={handleReactSpeech}
      >
        Submit
      </Button>
      </FlexContainer>
    </div>
  );
};

const mapStateToProps = ({ auth, team, contact }) => ({
  user: auth.userDetails,
  fetchingNotesListByContactId: contact.fetchingNotesListByContactId,

  //   team: team.user,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addNote,
      getNotesListByContactId
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Dictaphone);


const textarea = styled.div`
width: 100%;
min-height: 11.5em;
// border-radius: 0.1875em;
border: 0.0625em solid gainsboro;
background-color: #fff;
color: #444;
display: block;
margin: 0.3rem 0;
// border-radius: 0.3rem;
outline: none;
box-shadow: 0em 0.25em 0.625em -0.25em #aaa;
padding: 0.3rem 1rem;
`
