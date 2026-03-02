import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Column } from '@ant-design/plots';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const SkillBarChartForm = (props) => {

  
       const data1 = props.skillsCount
          let result = Object.keys(data1).map(key => {
            return ({ name: key, value: data1[key] })
          }
          )
        //   const newArray = result.map(element => {
        //     return `${element.name}  
        // -${element.value}`
        //   });

        //   let text = newArray.toString() + "\r\n";
          console.log("Bot2",result)

    //  console.log("Bot",props.skillsCount)
//     const data=[{
//         type:"HTML",
//         amount:637
//     },
//     {
//         type:"java",
//         amount:607
//     }
// ]

    const config = {
        data: result,
    //    data,
        xField: 'name',
        yField: 'value',
        label: {
            position: 'middle',
            style: {
                fill: '#FFFFFF',
                opacity: 0.9,
            },
        },
        xAxis: {
            label: {
                autoHide: true,
                autoRotate: false,
            },

        },
        style: {
            width: "55%",
            height: "20%",
            marginLeft: "25%"
        },
        // meta: {
        //     type: {
        //         alias: 'name',
        //     },
        //     amount: {
        //         alias: '40',
        //     },
        // },


    };
    return (
     <Column {...config} />
    )
    ;
}

const mapStateToProps = ({ order, auth }) => ({
    organizationId: auth.userDetails.organizationId,
    //barChart: order.barChart,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
           // getSkillsCount
            // getBarChartInOrder
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(SkillBarChartForm);








