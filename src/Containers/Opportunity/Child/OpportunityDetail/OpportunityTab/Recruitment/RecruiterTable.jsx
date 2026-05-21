import React, { useEffect, useState,useMemo } from "react";
import { connect } from "react-redux";
import SkillsLoadMore from "../../../../../Candidate/Child/CandidateTable/SkillsLoadMore";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import { LinkCandidateRecruit,getSkillsCount,getRecruiter } from "../../../../OpportunityAction";
import { StyledTable } from "../../../../../../Components/UI/Antd";
import { Button, Input,Progress } from "antd";
import Highlighter from 'react-highlight-words';
import { MultiAvatar, SubTitle } from "../../../../../../Components/UI/Elements";
import RecruiterSkillLoadMore from "./RecruiterSkillLoadMore.jsx";
import { SearchOutlined } from "@ant-design/icons";
import Title from "antd/lib/skeleton/Title";
import { FormattedMessage } from "react-intl";

const includesMulti = (elements, inArray) => {
  const unmatched = inArray.slice();
  for (const element of elements) {
    const matchIndex = unmatched.indexOf(element);
    if (matchIndex === -1) return false;
    unmatched.splice(matchIndex, 1);
  }
  return true;
};



function RecruiterTable(props) {
  
  console.log("ff",props.candidatePostData.filtercandidatetList)
  const data=props.candidatePostData.filtercandidatetList===null?[]:props.candidatePostData.filtercandidatetList.map((item)=>{
    return item.candidateId
    
  })
  // console.log("ren",data)

  const desc=props.skillsCount
  let result = Object.keys(desc).map(key => {
    return ({ name: key, id:key })
  }
  )
 
 


  console.log("desc",result)

  //  const desc1=result.map((item)=>{
  //   return item.name
  // })
  // console.log("desc1",desc1)

  useEffect(() => {
    props.getSkillsCount(props.candidatePostData.recruitmentId,props.organizationId,);
    // props.getCountries();
       
  }, []);

  const filteredData = props.recruiter.filter((item) => { return item.match==="Best Match" })
  console.log("match",filteredData)
  const data2=filteredData.map((item)=>{
    return item.candidateId
  })
  console.log("match1",data2)

  // const mergeddata=data.concat(filteredData)
  // const data1=props.candidatePostData.match
   
    // console.log("GGG",data1)
  // const data1=props.candidatePostData.billing
  // console.log("match",data1)
  // const data1= Best Match

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState(data);
  const [selectedRowData, setSelectedRowData] = useState(data);
  const [button, setButton] = useState([]);
//const [selectedfilterData, setSelectedFilteredData] = useState("");
  const [loading, setLoading] = useState(false);

  const [selected, setSelected] = useState(0);
  const [state, setState] = useState({
    name: "bob",
    color: "blue"
  });

  // const handleColor = (row) => {
    
  // };

  const reqSkill=result.map((item)=>{
return item;

  })
  console.log(reqSkill.length);

  
  

  // function handleRecruiter() {
  //   props.getRecruiter(props.candidatePostData.skillName,props.candidatePostData.recruitmentId,props.opportunityId,);
   
  // }

  // function handleFilterCandidate(value,row) {
  //   setSelected(row.id);
    
  //   setSelectedFilteredData( value,  )
  // }

  function handleButton(data) {
    const checkData = button.includes(data);
    if (!checkData) {
      setButton([...button, data]);
    }
  }

  const start = () => {
    setLoading(true); // ajax request after empty completing

    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const onSelectChange = (newSelectedRowKeys, b) => {

    console.log('selectedRowKeys changed: ', selectedRowKeys, newSelectedRowKeys, b);
    setSelectedRowKeys(newSelectedRowKeys);
    setSelectedRowData(newSelectedRowKeys)

  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  function getColumnSearchProps(dataIndex) {
    return {
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            // ref={node => {
            //   this.searchInput = node;
            // }}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ width: 240, marginBottom: 8, display: "block" }}
          />

          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
             icon={<SearchOutlined />}
            //icon="search"
            size="small"
            style={{ width: 90 }}
          >
            {/* Search */}
            <FormattedMessage id="app.search" defaultMessage="Search" />
          </Button>
          &nbsp;
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            {/* Reset */}
                        <FormattedMessage id="app.reset" defaultMessage="Reset" />
          </Button>
          &nbsp;
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            {/* Filter */}
                                    <FormattedMessage id="app.filter" defaultMessage="Filter" />

          </Button>

        </div>
      ),
      filterIcon: (filtered) => (
        // <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
        <SearchOutlined type="search" style={{ color: filtered ? 'tomato' : '1890ff' }} />
      ),
      onFilter: (value, record) =>
        record[dataIndex]
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          // setTimeout(() => this.searchInput.select());
        }
      },
      render: (text) =>
        searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text.toString()}
          />
        ) : (
          text
        ),
    };
  }

  function handleSearch(selectedKeys, confirm, dataIndex) {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  }

  function handleReset(clearFilters) {
    clearFilters();
    setSearchText("");
  }
  // const countryTypeOption = useMemo(() => {
  //   if (!props.countries) return [];
  //   return (
  //     props.countries.length &&
  //     props.countries.map((countries) => {
  //       return {
  //         // text: countries.countryAlpha3Code|| "",
  //         value: countries.countryAlpha3Code
  //         ,
  //       };
  //     })
  //   );
  // }, [props.countries]);
  // console.log("country",countryTypeOption);

  const {
    recruiter
  } = props;
  console.log("Pop",recruiter);
  console.log("recruit",props.recruiter&&props.recruiter.length&&props.recruiter[0].currency)

  const columns = [

    // {
    //   title: "",
    //   width: "2%",
    //   render: (name, item, i) => {
    //     console.log(name);
    //     console.log(item);
    //     return (
    //       <>
    //         <FlexContainer justifyContect="space-evenly">
    //           <CandidateActivity
    //             item={item}
    //             fullName={item.fullName}
    //             opportunityId={props.opportunityId}
    //             candidatePostData={props.candidatePostData}
    //             // completionInd={item.completionInd}
    //           />
    //         </FlexContainer>
    //         {/* )} */}
    //       </>
    //     );
    //   },
    // },
    {
      title: "",
      dataIndex: "imageId",
      width: "3%",
      render: (name, item, i) => {
        return (
          <SubTitle>
            <MultiAvatar
              primaryTitle={item.firstName}
              imageId={item.imageId}
              imageURL={item.imageURL}
              imgWidth={"2.5em"}
              imgHeight={"2.5em"}
            />
          </SubTitle>
        );
      },
    },

    {
      // title: "Name",
        title: <FormattedMessage id="app.name" defaultMessage="Name" />,
      dataIndex: "fullName",
      ...getColumnSearchProps('fullName'),
      width: "12%",
      render: (name, item, i) => {
        return (
          <>
            {item.fullName} &nbsp;&nbsp;
            <span
              style={{
                color: "tomato",
                fontWeight: "bold",
                fontSize: "0.9em",
              }}

            >
              {item.match}
            </span>
          </>
        );
      },
    },
    {
      // title: "Skills",
       title: <FormattedMessage id="app.skills" defaultMessage="Skills" />,
      dataIndex: "skillList",
      ...getColumnSearchProps('skillList'),
      width: "15%",
      render: (name, item, i) => {
        const data=item.skillList.filter((skill)=>{
          return skill!==null&&skill!==""
         }
         )
        return (
          <span>
            <SkillsLoadMore
              skillList={data}
            />
          </span>

         
        );
      }

     


    },
    {
      // title: "Matched Skill",
       title: <FormattedMessage id="app.matchedSkill" defaultMessage="Matched Skill" />,
      dataIndex:"matchSkill",
      width: "15%",
      sorter: (a, b) => {
        var nameA = a.matchSkill; // ignore upper and lowercase
        var nameB = b.matchSkill; // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        return 0;
      },
      render: (name, item, i) => {
        const data=item.matchSkill===null?[]:item.matchSkill.filter((skill)=>{
         return skill!==null&&skill!==""
        }
        )
         return <>
  
           {/* {item.skillList===[] ? "No Data" : */}
           <span>
             <RecruiterSkillLoadMore
             matchSkill={data}
          
             />
           </span>
       {/* } */}
           </>
         
       },
    },
//     {
//       title: "",
//       //  dataIndex:"workPreference",
//        width: "10%",
  
//        render: (name, item, i) => {
// const reqSkillData=reqSkill.length
// // const matchSkill=item.matchSkill && item.matchSkill.map((item)=>{
// //   return item;
// // })
// const matchSkill = Array.isArray(item.matchSkill) ? item.matchSkill.length : 0;
// let content = null;
// if (reqSkillData !== 0 && !isNaN(matchSkill)) {
//   const totalData = (matchSkill / reqSkillData * 100);
//   if (!isNaN(totalData)) {
//     const totalPercentData = Math.floor(totalData);
//     content = <span>{totalPercentData}%</span>;
//   }
// }



//          return <>
//            <span>
//            {content }
//            </span>
//            </>
         
//        },
//     },
{
  // title: "Match Skill",
  width: "10%",
  render: (name, item, i) => {
    const reqSkillData = reqSkill.length;
    const matchSkill = Array.isArray(item.matchSkill) ? item.matchSkill.length : 0;
    let content = null;

    if (reqSkillData !== 0 && !isNaN(matchSkill)) {
      const totalData = (matchSkill / reqSkillData * 100);
      if (!isNaN(totalData)) {
        const totalPercentData = Math.floor(totalData);
        content = `${totalPercentData}%`;
      }
    }

    return (
      <span>
        {content}
      </span>
    );
  },
  sorter: (a, b) => {
   
    const contentA = parseInt(a.matchSkill.length / reqSkill.length * 100);
    const contentB = parseInt(b.matchSkill.length / reqSkill.length * 100);

    return contentA - contentB;
  }
},

    {
      // title: "Cost",
        title: <FormattedMessage id="app.cost" defaultMessage="Cost" />,
      dataIndex: "billing",
      width: "7%",
      sorter: (a, b) => {
        var nameA = a.billing; // ignore upper and lowercase
        var nameB = b.billing; // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        return 0;
      },
      render: (name, item, i) => {
        return (
          <>
            {item.billing} {item.currency}
          </>
        );
      },



    },
    {
      // title: "Partner",
        title: <FormattedMessage id="app.partner" defaultMessage="Partner" />,
      dataIndex: "partnerName",
      ...getColumnSearchProps('partner'),
      width: "9%",

    },
    {
      // title: "Country",
        title: <FormattedMessage id="app.country" defaultMessage="Country" />,
      dataIndex: "country",
      // filters: countryTypeOption,

      // onFilter: (value, record) => {
      //   return record.country === value;
      // },
      //  ...getColumnSearchProps('partner'),
      width: "7%",

    },
    {
      // title: "Role",
        title: <FormattedMessage id="app.role" defaultMessage="Role" />,
      dataIndex: "roleType",
      ...getColumnSearchProps('role'),
      width: "7%",

    },
    {
      // title: "Availability",
        title: <FormattedMessage id="app.availability" defaultMessage="Availability" />,
      dataIndex: "availableDate",

      width: "10%",
      render: (text, item) => {
        const availableDate = dayjs(item.availableDate).format("ll");
        return <>
          {item.availableDate === null ? "No Data" :
            <span>
              {dayjs(item.availableDate).format("l")} &nbsp;&nbsp;
            </span>
          }
        </>
      },


    },
 
    {
      // title: "Category",
              title: <FormattedMessage id="app.category" defaultMessage="Category" />,
      dataIndex:"category",
      width:"7%"
    },

    {
      title: "Type",
      dataIndex:"workType",
      width: "7%",
    },

    {
      // title: "Work Preference",
              title: <FormattedMessage id="app.workPreference" defaultMessage="Work Preference" />,

       dataIndex:"workPreference",
       width: "10%",
    },

  ];

  const getIndexSkillData = recruiter.filter((data, index) => {
    if (button.length !== 0 && includesMulti(button, data.skillList)) {
      return data;
    }
  });

 // const filterValue = "horror";
 // const finalFilteredRecruiters = selectedfilterData.length===0?recruiter:recruiter.filter(val => val.skillList.includes(selectedfilterData));
 // const filteredBooks = books.filter(val => val.areas.some((el)=>filterValue.includes(el)));
  //const finalFilteredRecruiters = selectedfilterData.length===0?recruiter:recruiter.filter(val => val.skillList.some((el)=>selectedfilterData.includes(el)));
  // console.log("Filter",finalFilteredRecruiters)
//   console.log("Filter1",selectedfilterData)
// console.log("Filter2",finalFilteredRecruiters);

const finalFilteredRecruiters=button.length > 0 ? getIndexSkillData : recruiter


  return (

    <>
      {/* <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}> */}
     
      <span
        style={{
          marginLeft: 8,
        }}
      >
        {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
      </span>
      <Button type="primary" 
       onClick={()=>setButton([])}
      >
        Clear Search
      </Button>
      
      {/* <span
             onClick={() => {
              handleRecruiter()}
            }
            //onClick={() => props.handleDonotCallModal(true)}
              style={{
                marginRight: "0.5rem",
                //color: props.viewType === "dashboard" && "#1890ff",
                fontSize: "17px",
                cursor: "pointer",
              }}
            >
                
                 <FontAwesomeIcon icon={solid("rotate")} />
            
              </span> */}

       {result.map((item,i) => {
            return (
              <>
             
                <Button
                 onClick={()=>{
                  
                   handleButton(item.name)
                 
     }}
    //  key={item.id}
     
    style={{ backgroundColor: button.includes(item.name) ? "tomato" : "white" }}
                
                // style={{
                //     border: `1px solid`,
                //     padding: "0px 0.4em",
                //     textAlign: "center",
                //     margin: "2px",
                //     borderRadius: "0.4em",
                //  // backgroundColor: item.name === selectedfilterData ? "red" : ""
                //     // color: selectedfilterData ? 'white' : '', 
                //   }}
                  >

                    {item.name}
                    </Button>
        
              </>
            );
          })} 

<Button
type="primary" 
>
          Check Interest
        </Button>
        &nbsp;
        <span style={{color:"black",fontSize:"1rem"}}>Searched Skill-{props.linkSkills.skillName}</span>
      
         
      <StyledTable
        rowKey="candidateId"
        columns={columns}
        loading={props.fetchingRecruiter}
        dataSource={finalFilteredRecruiters}
        scroll={{ y: 460 }}
         rowSelection={rowSelection}
        pagination={false}
      />
      <Button type="primary" onClick={() => {
        console.log(props.item)
        props.LinkCandidateRecruit(
          {
            opportunityId: props.candidatePostData.opportunityId,
            stageId: props.candidatePostData.stageId,
            recruitOwner :props.userId,
            recruitmentProcessId: props.candidatePostData.recruitmentProcessId,

            recruitmentId: props.candidatePostData.recruitmentId,
            profileId: props.candidatePostData.profileId,
            candidateIds: selectedRowData
          },
          props.opportunityId,
        );

      }}>Select</Button>
    </>
  );
}
// }
const mapStateToProps = ({ auth, opportunity }) => ({

  organizationId: auth.userDetails.organizationId,
  skillsCount:opportunity.skillsCount,
  userId:auth.userDetails.userId,
  countries:auth.countries,
  linkSkills:opportunity.linkSkills,

  fetchingRecruiter: opportunity.fetchingRecruiter,
  opportunityId: opportunity.opportunity.opportunityId,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      LinkCandidateRecruit,
      getSkillsCount,
      getRecruiter,
      // getCountries
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(RecruiterTable);










