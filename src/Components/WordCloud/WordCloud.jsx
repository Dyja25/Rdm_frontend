import React,{useEffect} from 'react';
import { ReactWordcloud } from '@cp949/react-wordcloud';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {getSkillsCloud} from "../../Containers/Dashboard/DashboardAction"
 
const words = [
  {
    text: 'told',
    value: "5",
  },
  {
    text: 'mistake',
    value: "5",
  },
  {
    text: 'thought',
    value: "5",
  },
  {
    text: 'bad',
    value: "1",
  },
]

const options = {
  colors: ["#4E197F", "#2A63B3", "#4FB35D", "#E19D23", "#CC3A38"],
  enableTooltip: true,
  deterministic: false,
  fontFamily: "Lora",
  fontSizes: [10, 40],
  fontStyles: "normal",
  fontWeight: "700",
  padding: 1,
  rotations: 1,
  rotationAngles: [0, 90],
  scale: "liner",
  spiral: "archimedean",
  transitionDuration: 1000
};


// const callbacks = {
//   getWordColor: word => word.value > 50 ? "blue" : "red",
//   onWordClick: console.log,
//   onWordMouseOver: console.log,
//   // getWordTooltip: word => `${word.text} (${word.value}) [${word.value > 50 ? "good" : "bad"}]`,
// }
// const options = {
//   rotations: 2,
//   // rotationAngles: [-90, 0],
// };
//  const size = [600, 400];

//  const words = [...];
 
function SimpleWordcloud(props) {
  console.log(props.skillsCloud)
  // const words=[props.skillsCloud.length&&props.skillsCloud[0]]
  // console.log(words)
  
  
  useEffect(() => {
      props.getSkillsCloud();
    // props.getDesignations();
    // props.getRoles(props.organizationId); 
  }, []);

  
  const arryOfOB = props.skillsCloud.map((item,i) => {
    return { text: item.skillName, value:`${item.count}` };
  
  });
  
function getUniqueListBy(arr, key) {
  return [...new Map(arr.map(item => [item[key], item])).values()]
}

const arr1 = getUniqueListBy(arryOfOB, 'text')

  console.log(arryOfOB)
  return (
    
   
  <ReactWordcloud 
  words={arr1}
  //  callbacks={callbacks}
   options={options}
  // size={size} 
  />
  );
}

const mapStateToProps = ({ dashboard }) => ({
  skillsCloud:dashboard.skillsCloud,
  // fetchingSkillsCloud:dashboard.fetchingSkillsCloud
    // user: auth.userDetails,
    // fetchingNotesListByOpportunityId: opportunity.fetchingNotesListByOpportunityId,
  
    //   team: team.user,
  });

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
       getSkillsCloud
    //   addNote,
    //   getNotesListByOpportunityId
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(SimpleWordcloud);