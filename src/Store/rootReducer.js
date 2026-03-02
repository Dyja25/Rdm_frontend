import { combineReducers } from "redux";
import { LOGOUT } from "../Containers/Auth/AuthTypes";
/**
 *  All of application reducers import goes here...
 */
import { authReducer } from "../Containers/Auth/AuthReducer";
import { expensesReducer } from "../Containers/Settings/Expense/ExpensesReducer";
import { dashboardReducer } from "../Containers/Dashboard/DashboardReducer";
import {educationsReducer} from "../Containers/Settings/Educations/EducationReducer";
import { plannerReducer } from "../Containers/Planner/PlannerReducer";
import {sectorsReducer} from "../Containers/Settings/Sectors/SectorsReducer";
import { rolesReducer } from "../Containers/Settings/Category/Role/RoleReducer";
import { ruleReducer } from "../Containers/Rules/RulesReducer";
import {designationsReducer} from "../Containers/Settings/Designation/DesignationReducer";
import { notificationReducer } from "../Containers/Notification/NotificationReducer";
import { documentsReducer } from "../Containers/Settings/Documents/DocumentsReducer";
import { profileReducer } from "../Containers/Profile/ProfileReducer";
import { expenseReducer } from "../Containers/Expense/ExpenseReducer";
import {departmentsReducer} from "../Containers/Settings/Department/DepartmentReducer";
import { EmployeeReducer } from "../Containers/Employees/EmployeeReducer";
import { EventReducer } from "../Containers/Event/EventReducer";
import { TaskReducer } from "../Containers/Task/TaskReducer";
import { callReducer } from "../Containers/Call/CallReducer";
import { LeavesReducer } from "../Containers/Leave/LeavesReducer";
import { holidayReducer } from "../Containers/Holiday/HolidayReducer";
import { mileageReducer } from "../Containers/Mileage/MileageReducer";
import { reportReducer } from "../Containers/Reports/ReportReducer";
import { countryReducer } from "../Containers/Settings/Category/Country/CountryReducer";
import { contactReducer } from "../Containers/Contact/ContactReducer";
import { customerReducer } from "../Containers/Customer/CustomerReducer";
import { OpportunityReducer } from "../Containers/Opportunity/OpportunityReducer";
import { candidateReducer } from "../Containers/Candidate/CandidateReducer";
import { languageReducer } from "../Language/LanguageReducer";
import { partnerReducer } from "../Containers/Partner/PartnerReducer";
import {eventsReducer} from "../Containers/Settings/Event/EventReducer";
import {PermissionsReducer} from "../Containers/Permissions/PermissionsReducer";
import {tasksReducer} from "../Containers/Settings/Task/TaskReducer";
import { requirementReducer } from "../Containers/Requirement/RequirementReducer";
import {publishReducer} from "../Containers/Publish/PublishReducer";
import {librarysReducer} from "../Containers/Settings/Library/LibraryReducer";
import {idProofsReducer} from "../Containers/Settings/Id Proof/IdProofReducer";
import { settingsReducer } from "../Containers/Settings/SettingsReducer";
import { certificationReducer } from "../Containers/Settings/Recruitement/Child/Certifications/CertificationReducer";
import {functionsReducer} from "../Containers/Settings/Function/FunctionsReducer";
import { emailReducer } from "../Containers/Organization/Child/Email/EmailReducer";
import { websitesReducer } from "../Containers/Organization/Child/Website/WebsiteReducer";


const appReducer = combineReducers({
  dashboard: dashboardReducer,
  profile: profileReducer,
    librarys:librarysReducer,
  partner: partnerReducer,
  auth: authReducer,
  call: callReducer,
  planner: plannerReducer,
  role:rolesReducer,
  task: TaskReducer,
  tasks: tasksReducer,
  leave: LeavesReducer,
  holiday: holidayReducer,
  report: reportReducer,
  notification: notificationReducer,
  designations:designationsReducer,
  rule: ruleReducer,
  employee: EmployeeReducer,
  event: EventReducer,
  expense: expenseReducer,
  sector:sectorsReducer,
    events:eventsReducer,
  mileage: mileageReducer,
departments:departmentsReducer,
  contact: contactReducer,
  customer: customerReducer,
  opportunity: OpportunityReducer,
  candidate: candidateReducer,
  language: languageReducer,
 countrys:countryReducer,
  permissions:PermissionsReducer,
  document: documentsReducer, 
  requirement:requirementReducer,
  publish:publishReducer,
    education:educationsReducer,
      expenses: expensesReducer,
        idProof:idProofsReducer,
          settings: settingsReducer,
            certifications:certificationReducer,
              functions:functionsReducer,
                email: emailReducer,
                  websites: websitesReducer,

});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    sessionStorage.clear();
    state = undefined;
  }
  return appReducer(state, action);
};
export default rootReducer;
