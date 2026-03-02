import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Menu, Popover,Badge } from "antd";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';
import StorageIcon from '@mui/icons-material/Storage';
const SubMenu = Menu.SubMenu;

class NavMenu extends React.Component {
  state = {
    collapsed: false,
  };
 
  render() {
    //console.log("Oppo", this.props.opportunityRecord)
    const { user } = this.props;
    let path = window.location.href.split("/")[3];
    console.log("path", path);
    return (
      <div style={{ marginLeft: "-1.1875em" }}>
        <Menu
          defaultSelectedKeys={["/" + path]}
          defaultOpenKeys={[]}
          mode="inline"
            // theme={this.props.theme}
            theme="dark"
          inlineCollapsed={this.props.collapsed}
        >
           {/* {user.userType !== "USER" && user.department !== "VENDOR" && ( */}
          <Menu.Item key="/dashboard">
            <Link to="/dashboard">
              {/* <Icon type="dashboard" style={{ color: "white" }} /> */}
              <i class="fas fa-chart-line"></i>&nbsp;&nbsp;&nbsp;
              <span style={{ color: "white", paddingleft: "0em" }}>
                <FormattedMessage
                  id="app.recruitproboard"
                  defaultMessage="RecruitProBoard"
                />
                {/* Dashboard */}
              </span>
            </Link>
          </Menu.Item>
           {/* )} */}
             {/* <Menu.Item key="/dashboard">
            <Link to="/dashboard">
             
              <i class="fas fa-chart-line"></i>&nbsp;&nbsp;&nbsp;
              <span style={{ color: "white", paddingleft: "0em" }}>
                <FormattedMessage
                  id="app.recruitproboard"
                  defaultMessage="RecruitProBoard"
                />
               
              </span>
            </Link>
          </Menu.Item> */}
            {/* {user.userType !== "USER" && user.department !== "VENDOR" && ( */}
          <Menu.Item key="/planner">
            <Link to="/planner">
              {/* <Icon type="calendar" style={{ color: "white" }} /> */}
              <i class="far fa-calendar-alt"></i>&nbsp;&nbsp;&nbsp;&nbsp;
              <span style={{ color: "white" }}>
                <FormattedMessage
                  id="app.planner"
                  defaultMessage="Planner"
                />
                {/* Planner */}
              </span>
            </Link>
          </Menu.Item>
            {/* )} */}
             {/* <Menu.Item key="/planner">
            <Link to="/planner">
             
              <i class="far fa-calendar-alt"></i>&nbsp;&nbsp;&nbsp;&nbsp;
              <span style={{ color: "white" }}>
                <FormattedMessage
                  id="app.planner"
                  defaultMessage="Planner"
                />
             
              </span>
            </Link>
          </Menu.Item> */}
{user.userType !== "USER" && user.department !== "VENDOR" &&user.department !="Customer"&& (
          <SubMenu
            key="sub1"
            style={{ marginBottom: "-0.75em", }}
            title={
              <span>
                {/* <Icon type="mail" style={{ color: "white" }} /> */}
                <i class="fab fa-connectdevelop"></i>&nbsp;&nbsp;&nbsp;
                <span style={{ color: "white" }}>

                  <FormattedMessage
                    id="app.activity"
                    defaultMessage="Activity"
                  />
                  {/* Activity */}

                </span>
              </span>
            }
          >
            <Menu.Item key="/call">
              <Link to="/call">
                {/* <Icon style={{ color: "white" }} type="phone" /> */}
                <i class="fas fa-phone-square"></i>&nbsp;&nbsp;
                <span style={{ color: "white" }}>
                  <FormattedMessage
                    id="app.calls"
                    defaultMessage="Calls"
                  />
                  {/* Calls */}
                </span>
              </Link>
            </Menu.Item>
            <Menu.Item key="task">
              <Link to="/Task">
                {/* <Icon type="file-done" /> */}
                <i class="fas fa-tasks"></i>&nbsp;&nbsp;
                <span style={{ color: "white" }}>
                  <FormattedMessage
                  id="app.tasks"
                  defaultMessage="Tasks"
                />
                  {/* Task */}
                </span>
              </Link>
            </Menu.Item>
            <Menu.Item key="event">
              <Link to="/Event">
                {/* <Icon type="schedule" /> */}
                <i class="far fa-calendar-check"></i>&nbsp;&nbsp;
                <span style={{ color: "white" }}>
                  <FormattedMessage
                  id="app.events"
                  defaultMessage="Events"
                />
                  {/* Event */}
                </span>
              </Link>
            </Menu.Item>
            {/* <Menu.Item key="/mileage">
              <Link to="/mileage">
                <Icon type="dashboard" style={{ color: "white" }} />
                <span style={{ color: "white" }}>Leaves</span>
              </Link>
            </Menu.Item> */}
          </SubMenu>
)}
         {/* {user.userType !== "USER" && user.department !== "Customer" &&user.department == "VENDOR" && ( */}
         {user.talentAccessInd ===true && ( 
          <Menu.Item key="/candidate">
            <Link to="/candidate">
              {/* <Icon style={{ color: "white" }} type="user" /> */}
              <i class="fas fa-portrait"></i>&nbsp;&nbsp;&nbsp;&nbsp;
              <span style={{ color: "white" }}>
                <FormattedMessage
                  id="app.talent"
                  defaultMessage="Talent"
                />
                {/* Talent */}
              </span>
            </Link>
          </Menu.Item>
     )} 
    
   
  
    
  


          {/* {user.userType !== "USER" && user.department !== "VENDOR" && user.department !== "Recruiter" &&user.department !== "Customer"&&
          ( */}


 {user.opportunityAccessInd ===true && ( 
          <Menu.Item key="/opportunity">
            <Link to="/opportunity">
              {/* <Icon style={{ color: "white" }} type="bulb" /> */}
              <i class="far fa-lightbulb"></i>&nbsp;&nbsp;&nbsp;&nbsp;
              <span style={{ color: "white" }}>
                <FormattedMessage
                id="app.opportunity"
                defaultMessage="Opportunity"
              />
              &nbsp;&nbsp;&nbsp;&nbsp;
                <Badge
                //  count={this.props.opportunityRecord.opportunityList}
                  overflowCount={999}></Badge>
              </span>
            </Link>
          </Menu.Item>
           )} 

          {/* {user.userType !== "USER" && user.department !== "Recruiter" &&user.department !== "Customer"&&
            user.department !== "VENDOR" && (  */}
            {/* {user.talentCreateInd ===true && ( */}
          <Menu.Item key="/contact">
            <Link to="/contact">
              {/* <Icon style={{ color: "white" }} type="user" /> */}
              <i class="far fa-address-card"></i>&nbsp;&nbsp;&nbsp;
              <span style={{ color: "white", }}>
                <FormattedMessage
                  id="app.contact"
                  defaultMessage="Contact"
                />
                {/* Contact */}
              </span>
            </Link>
          </Menu.Item>
           {/* )}  */}
         {/* {user.userType !== "USER" && this.props.department !== "Recruiter" &&user.department !== "VENDOR" &&user.department === "Customer" &&this.props.role !== "ADMIN" &&this.props.role !== "USER" &&(   */}
          <Menu.Item key="/requirement">
            <Link to="/requirement">
              {/* <Icon style={{ color: "white" }} type="user" /> */}
              <i class="far fa-address-card"></i>&nbsp;&nbsp;&nbsp;
              <span style={{ color: "white", }}>
                <FormattedMessage
                  id="app.requirement"
                  defaultMessage="Requirement"
                />
                &nbsp;&nbsp;&nbsp;&nbsp;
              <Badge
                 // count={this.props.requirementRecord.recruitmentList}
                  overflowCount={999}></Badge>
              </span>
            </Link>
          </Menu.Item>
    {/* )}  */}
  
    
     
{user.userType === "USER" &&user.department ==="Customer"&& (
<Menu.Item key="/demand">
            <Link to="/demand">
              
              <i class="far fa-address-card"></i>&nbsp;&nbsp;&nbsp;
              <span style={{ color: "white", }}>
                <FormattedMessage
                  id="app.demand"
                  defaultMessage="Demand"
                />
                &nbsp;&nbsp;&nbsp;&nbsp;
             
              </span>
            </Link>
          </Menu.Item> 
  )}

 

         {/* {user.userType !== "USER" && user.department !== "Recruiter" &&user.department !== "Customer"&&
            user.department !== "VENDOR" && (  */}
            
            {user.customerAccessInd ===true && (
          <Menu.Item key="/customer">
            <Link to="/customer">
              {/* <Icon style={{ color: "white" }} type="bank" /> */}
              <i class="far fa-building"></i>&nbsp;&nbsp;&nbsp;&nbsp;
              <span style={{ color: "white" }}>
                <FormattedMessage
                id="app.customer"
                defaultMessage="Customer"
              />
                {/* Customer */}
              </span>
            </Link>
          </Menu.Item>
              )}    

{/* {user.userType !== "USER" && user.department !== "VENDOR" && user.department !== "Customer" && user.department !== "Recruiter" &&( */}
 {user.vendorAccessInd ===true && ( 
          <Menu.Item key="/partner">
            <Link to="/partner">
              {/* <Icon style={{ color: "white" }} type="bank" /> */}
              <i class="far fa-handshake"></i>&nbsp;&nbsp;&nbsp;
              <span style={{ color: "white" }}><FormattedMessage
                id="app.vendor"
                defaultMessage="Vendor"
              />
                {/* VENDOR */}
              </span>
            </Link>
          </Menu.Item>
         )} 
   

 {user.userType !== "USER" && user.department !== "VENDOR" && ( 
          <SubMenu
            key="sub2"
          style={{ marginBottom: "-1.25em" }}
         title={
              <span>
              
                 <i class="fab fa-servicestack"></i>&nbsp;&nbsp;&nbsp;&nbsp;
               <span style={{ color: "white" }}>

                  <FormattedMessage
                 id="app.selfService"
                    defaultMessage="Self Service"
                  />
                </span>
              </span>
            }
          >
          
            {user.userType !== "USER" && user.department !== "VENDOR" && ( 
           <Menu.Item key="/mileage"> 
          <Link to="/mileage"> 
              
              <i class="fas fa-tachometer-alt"></i>&nbsp;&nbsp;
               <span style={{ color: "white" }}><FormattedMessage 
              id="app.mileage"
                defaultMessage="Mileage"
              />
            </span>
            </Link>
          </Menu.Item>
             )}

           <Menu.Item key="/expense">
           <Link to="/expense">
            {/* <Icon type="database" style={{ color: "white" }} /> */}
<i class="fas fa-file-invoice-dollar"></i>&nbsp;&nbsp;
             <span style={{ color: "white" }}><FormattedMessage 
               id="app.expense"
              defaultMessage="Expense"
          />
              </span>
            </Link> 
           </Menu.Item>

           <Menu.Item key="/holiday"> 
            <Link to="/holiday"> 
           
             <i class="fas fa-holly-berry"></i>&nbsp;&nbsp;&nbsp;
            <span style={{ color: "white" }}><FormattedMessage 
              id="app.holiday"
                defaultMessage="Holiday"
              />
       
              </span>
             </Link> 
         </Menu.Item>

          <Menu.Item key="/report">
          <Link to="/leave">
              <i class="fas fa-luggage-cart"></i>&nbsp;&nbsp;
            <span style={{ color: "white" }}><FormattedMessage
               id="app.leaves"
               defaultMessage="Leaves"
              />
              </span>
             </Link> 
            </Menu.Item>

           </SubMenu> 
     )} 
    {/* {user.userType !== "USER" && user.department !== "VENDOR" && ( */}
          <Menu.Item key="/reports">
            <Link to="/reports">
              <i class="far fa-file-pdf"></i>&nbsp;&nbsp;&nbsp;&nbsp;
              <span style={{ color: "white" }}><FormattedMessage
                id="app.reports"
                defaultMessage="Reports"
              />
                {/* Reports */}
              </span>
            </Link>
          </Menu.Item>
    {/* // )} */}
    
          
          { user.department === "Management" && (
            <Menu.Item key="/employees">
              <Link to="/Employees">
                {/* <Icon type="team" style={{ color: "white" }} /> */}
                <PersonIcon style={{ marginLeft: "-8px" }} />&nbsp;&nbsp;
                <span style={{ color: "white" }}>
                  <FormattedMessage
                    id="app.staff"
                    defaultMessage="Staff"
                  />
                  {/* Employees */}
                </span>
              </Link>
            </Menu.Item>
          )}
          {user.userType !== "USER" && user.department !== "Recruiter" &&user.department !== "Customer"&&
            user.department !== "VENDOR" && ( 
          <Menu.Item key="/publish">
            <Link to="/publish">
              {/* <Icon style={{ color: "white" }} type="bank" /> */}
              <i class="far fa-building"></i>&nbsp;&nbsp;&nbsp;&nbsp;
              <span style={{ color: "white" }}>
                <FormattedMessage
                id="app.publish"
                defaultMessage="Publish"
              />
                {/* Customer */}
              </span>
            </Link>
          </Menu.Item>
              )}    
        </Menu>
      </div>
    );
  }
}

const mapStateToProps = ({ auth,opportunity,requirement}) => ({
  role: auth.userDetails.role,
  department: auth.userDetails.department,
  user: auth.userDetails,
  // opportunityRecord:opportunity.opportunityRecord,
  //requirementRecord:requirement.requirementRecord,
});
const mapDispatchToProps = (dispatch) => bindActionCreators({
  // getOpportunityRecord
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NavMenu);
