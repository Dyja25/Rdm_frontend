import * as types from "./SettingsActionTypes";

const initialState = {
  addProcessModal: false,
  addEditProcessModal: false,
  addRulesModal: false,
  addProcessTaskModal: false,

  addSequenceModal: false,

  addEmailModal: false,
  addWebsiteModal: false,
  addUpdateEmailModal: false,

  addingSequence: false,
  addingSequenceError: false,

  fetchingSequence: false,
  fetchingSequenceError: false,
  sequence: [],

  linkingProcessPublish: false,
  linkingProcessPublishError: false,
  processPublish: [],

  linkingStagesPublish: false,
  linkingStagesPublishError: false,
  stagesPublish: [],

  addingApproval: false,
  addingApprovalError: false,

  addingProcess: false,
  addingProcessError: false,

  addingProcessTask: false,
  addingProcessTaskError: false,

  fetchingProcess: false,
  fetchingProcessError: false,
  Process: [],

  updatingTask: false,
  updatingTaskError: false,
  deleteTask: false,
  deleteTaskError: false,

  updatingTaskResuffel: false,
  updatingTaskResuffelError: false,

  addTaskModal: false,
  setEditingTask: {},

  updatingProcessTask: false,
  updatingProcessTaskError: false,

  fetchingDefaultProcess: false,
  fetchingDefaultProcessError: false,
  defaultProcess: [],

  removingStages: false,
  removingStagesError: false,
  updatingStages: false,
  updatingStagesError: false,
  fetchingProcessStages: false,
  fetchingProcessStagesError: false,
  ProcessStages: [],

  updateProcessName: false,
  updateProcessNameError: false,
  fetchingProcessTask: false,
  fetchingProcessTaskError: false,
  processTask: [],

  addingProcessStages: false,
  addingProcessStagesError: false,

  fetchingAllProcessStages: false,
  fetchingAllProcessStagesError: false,
  allProcessStages: [],

  fetchingOppoStages: false,
  fetchingOppoStagesError: false,
  oppoStages: [],

  fetchingDepartments: false,
  fetchingDepartmentsError: false,
  departments: [],

  fetchingLevels: false,
  fetchingLevelsError: false,
  levels: [],

  //recruiter
  fetchingProcessForRecruit: false,
  fetchingProcessForRecruitError: false,
  recruitProcess: [],

  addingProcessForRecruit: false,
  addingProcessForRecruitError: false,

  fetchingProcessStagesForRecruit: false,
  fetchingProcessStagesForRecruitError: false,
  recruitProcessStages: [],

  updateProcessNameForRecruit: false,
  updateProcessNameForRecruitError: false,

  fetchingAllProcessStagesForRecruit: false,
  fetchingAllProcessStagesForRecruitError: false,
  allProcessStagesForRecruit: [],

  addingLeaves: false,
  addingLeavesError: false,

  fetchingThirdPartyMonetize: false,
  fetchingThirdPartyMonetizeError: false,
  thirdPartyMonetize: [],

  fetchingComplianceGdpr: false,
  fetchingComplianceGdprError: false,
  gdprCompliance: [],

  fetchingLeaveDetails: false,
  fetchingOrganizationLeadsError: false,
  leaveData: [],

  fetchingSignatureInd: false,
  fetchingSignatureIndError: false,
  signatureInd: {},

  setEditingEmail: {},

  enabalingRecruitProAdvance: false,
  enabalingRecruitProAdvanceError: false,

  fetchingMileageDetails: false,
  // fetchingOrganizationLeadsError: false,
  mileageData: [],

  updatingMileage: false,
  updatingMileageError: false,

  addRecruitmentApprovalModal: false,

  fetchingApprovalData: false,
  fetchingApprovalDataError: false,
  aaprovalData: [],

  addingPartner: false,
  addingPartnerError: false,

  addingMonster: false,
  addingMonsterError: false,

  fetchingMonster: false,
   fetchingMonsterError: false,
   monster:[],

  fetchingPartner: false,
  fetchingPartnerError: false,
  partner: [],

  addingCommission: false,
  addingCommissionError: false,

  fetchingCommission: false,
  fetchingCommissionError: false,
  commissionData: [],

  fetchingCommissionTable: false,
  fetchingCommissionTableError: false,
  tableCommission: [],

  updatingCommission: false,
  updatingCommissionError: false,

  setEditingCommission: {},
  updateCommissionModal: false,

  addingRecruiter: false,
  addingRecruiterError: false,

  fetchingRecruiter: false,
  fetchingRecruiterError: false,
  recruiterData: [],

  fetchingRecruiterTable: false,
  fetchingRecruiterTableError: false,
  tableRecruiter: [],

  addingWebsite: false,
  addingWebsiteError: false,

  fetchingWebsite: false,
  fetchingWebsiteError: false,
  website: [],

  addingScheduler: false,
  addingSchedulerError: false,

  fetchingScheduler: false,
  fetchingSchedulerError: false,
  scheduler: [],

  addingThirdPartyAccess: false,
  addingThirdPartyAccessError: false,

  addingThirdPartyVendorAccess: false,
  addingThirdPartyVendorAccessError: false,

  fetchingThirdPartyAccess: false,
  fetchingThirdPartyAccessError: false,
  thirdPartyAccess: [],

  addingUpWorkAccess: false,
  addingUpWorkAccessError: false,

  fetchingUpWorkAccess: false,
  fetchingUpWorkAccessError: false,
  upWorkAccess: [],

  fetchingThirdPartyVendorAccess: false,
  fetchingThirdPartyVendorAccessError: false,
  thirdPartyVendorAccess: [],

  fetchingDepartmentList: false,
  fetchingDepartmentListError: false,
  departmentList: [],

  fetchingDepartmentAccess: false,
  fetchingDepartmentAccessError: false,
  departmentAcces: {},
  // vendor: ['Read', 'Create', 'Update', 'Delete'],
  // customer: ['Read', 'Create', 'Update', 'Delete'],
  // opportunity: ['Read', 'Create', 'Update', 'Delete'],
  // talent: ['Read', 'Create', 'Update', 'Delete'],

  addingDepartmentAccess: false,
  addingDepartmentAccessError: false,

  addingCommunicationAccess: false,
  addingCommunicationAccessError: false,

  addingPermissionAccess: false,
  addingPermissionAccessError: false,

  fetchingCommunicationAccess: false,
  fetchingCommunicationAccessError: false,
  communicationAccess: [],

  fetchingPermissionAccess: false,
  fetchingPermissionAccessError: false,
  permissionAccess: [],

  addingSourcingAccess: false,
  addingSourcingAccessError: false,

  fetchingSourcingAccess: false,
  fetchingSourcingAccessError: false,
  sourcingAccess: [],
};
export const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.HANDLE_TASK_EDIT_PROCESS_MODAL:
      return { ...state, addEditProcessModal: action.payload };

    case types.HANDLE_TASK_MODAL:
      return { ...state, addTaskModal: action.payload };

    case types.HANDLE_PROCESS_MODAL:
      return { ...state, addProcessModal: action.payload };

    case types.HANDLE_RULES_MODAL:
      return { ...state, addRulesModal: action.payload };

    case types.HANDLE_PROCESS_TASK_MODAL:
      return { ...state, addProcessTaskModal: action.payload };

    case types.ADD_PROCESS_REQUEST:
      return { ...state, addingProcess: true, addingProcessError: false };
    case types.ADD_PROCESS_SUCCESS:
      return {
        ...state,
        addingProcess: false,
        addingProcessError: false,
        addProcessModal: false,
      };
    case types.ADD_PROCESS_FAILURE:
      return {
        ...state,
        addingProcess: false,
        addingProcessError: true,
        addProcessModal: false,
      };

    case types.GET_PROCESS_REQUEST:
      return { ...state, fetchingProcess: true, fetchingProcessError: false };
    case types.GET_PROCESS_SUCCESS:
      return {
        ...state,
        fetchingProcess: false,
        fetchingProcessError: false,
        Process: action.payload,
      };
    case types.GET_PROCESS_FAILURE:
      return { ...state, fetchingProcess: false, fetchingProcessError: true };

    case types.GET_ALL_PROCESS_STAGES_REQUEST:
      return {
        ...state,
        fetchingAllProcessStages: true,
        fetchingAllProcessStagesError: false,
      };
    case types.GET_ALL_PROCESS_STAGES_SUCCESS:
      return {
        ...state,
        fetchingAllProcessStages: false,
        fetchingAllProcessStagesError: false,
        allProcessStages: action.payload,
      };
    case types.GET_ALL_PROCESS_STAGES_FAILURE:
      return {
        ...state,
        fetchingAllProcessStages: false,
        fetchingAllProcessStagesError: true,
      };

    case types.GET_OPPO_STAGES_REQUEST:
      return {
        ...state,
        fetchingOppoStages: true,
        fetchingOppoStagesError: false,
      };
    case types.GET_OPPO_STAGES_SUCCESS:
      return {
        ...state,
        fetchingOppoStages: false,
        fetchingOppoStagesError: false,
        oppoStages: action.payload,
      };
    case types.GET_OPPO_STAGES_FAILURE:
      return {
        ...state,
        fetchingOppoStages: false,
        fetchingOppoStagesError: true,
      };

    case types.GET_DEFAULT_PROCESS_REQUEST:
      return {
        ...state,
        fetchingDefaultProcess: true,
        fetchingDefaultProcessError: false,
      };
    case types.GET_DEFAULT_PROCESS_SUCCESS:
      return {
        ...state,
        fetchingDefaultProcess: false,
        fetchingDefaultProcessError: false,
        defaultProcess: action.payload,
      };
    case types.GET_DEFAULT_PROCESS_FAILURE:
      return {
        ...state,
        fetchingDefaultProcess: false,
        fetchingDefaultProcessError: true,
      };

    case types.GET_PROCESS_STAGES_REQUEST:
      return {
        ...state,
        fetchingProcessStages: true,
        fetchingProcessStagesError: false,
      };
    case types.GET_PROCESS_STAGES_SUCCESS:
      return {
        ...state,
        fetchingProcessStages: false,
        fetchingProcessStagesError: false,
        ProcessStages: action.payload,
      };
    case types.GET_PROCESS_STAGES_FAILURE:
      return {
        ...state,
        fetchingProcessStages: false,
        fetchingProcessStagesError: true,
      };
    case types.REMOVE_STAGE_REQUEST:
      return { ...state, removingStages: true };
    case types.REMOVE_STAGE_SUCCESS:
      return {
        ...state,
        removingStages: false,
        ProcessStages: state.ProcessStages.filter(
          (stage) => stage.stageId !== action.payload
        ),
      };
    case types.REMOVE_STAGE_FAILURE:
      return { ...state, removingStages: false, removingStagesError: true };

    case types.UPDATE_STAGE_REQUEST:
      return { ...state, updatingStages: true };
    case types.UPDATE_STAGE_SUCCESS:
      // return { ...state, updatingStages: false, states: [...state.states, action.payload] };
      return {
        ...state,
        updatingStages: false,
        ProcessStages: state.ProcessStages.map((state) =>
          state.stageId === action.payload.stageId ? action.payload : state
        ),
      };
    case types.UPDATE_STAGE_FAILURE:
      return { ...state, updatingStages: false, updatingStagesError: true };

    case types.UPDATE_PROCESS_NAME_REQUEST:
      return { ...state, updateProcessName: true };
    case types.UPDATE_PROCESS_NAME_SUCCESS:
      // return { ...state, updatingStages: false, states: [...state.states, action.payload] };
      return {
        ...state,
        updateProcessName: false,
        Process: state.Process.map((state) =>
          state.processId === action.payload.processId ? action.payload : state
        ),
      };
    case types.UPDATE_PROCESS_NAME_FAILURE:
      return {
        ...state,
        updateProcessName: false,
        updateProcessNameError: true,
      };

    case types.ADD_PROCESS_STAGE_REQUEST:
      return { ...state, addingProcessStages: true };
    case types.ADD_PROCESS_STAGE_SUCCESS:
      return {
        ...state,
        addingProcessStages: false,
        ProcessStages: [...state.ProcessStages, action.payload],
      };
    case types.ADD_PROCESS_STAGE_FAILURE:
      return {
        ...state,
        addingProcessStages: false,
        addingProcessStagesError: true,
      };

    case types.ADD_PROCESS_TASK_REQUEST:
      return {
        ...state,
        addingProcessTask: true,
        addingProcessTaskError: false,
      };
    case types.ADD_PROCESS_TASK_SUCCESS:
      return {
        ...state,
        addingProcessTask: false,
        addingProcessTaskError: false,
        addProcessTaskModal: false,
      };
    case types.ADD_PROCESS_TASK_FAILURE:
      return {
        ...state,
        addingProcessTask: false,
        addingProcessTaskError: true,
        addProcessTaskModal: false,
      };

    case types.GET_PROCESS_TASK_REQUEST:
      return {
        ...state,
        fetchingProcessTask: true,
        fetchingProcessTaskError: false,
      };
    case types.GET_PROCESS_TASK_SUCCESS:
      return {
        ...state,
        fetchingProcessTask: false,
        fetchingProcessTaskError: false,
        processTask: action.payload,
      };
    case types.GET_PROCESS_TASK_FAILURE:
      return {
        ...state,
        fetchingProcessTask: false,
        fetchingProcessTaskError: true,
      };

    /**
     * get the list of all departments
     */
    case types.GET_DEPARTMENTS_REQUEST:
      return { ...state, fetchingDepartments: true };
    case types.GET_DEPARTMENTS_SUCCESS:
      return {
        ...state,
        fetchingDepartments: false,
        departments: action.payload,
      };
    case types.GET_DEPARTMENTS_FAILURE:
      return {
        ...state,
        fetchingDepartments: false,
        fetchingDepartmentsError: true,
      };

    case types.GET_LEVELS_REQUEST:
      return { ...state, fetchingLevels: true };
    case types.GET_LEVELS_SUCCESS:
      return { ...state, fetchingLevels: false, levels: action.payload };
    case types.GET_LEVELS_FAILURE:
      return {
        ...state,
        fetchingLevels: false,
        fetchingLevelsError: true,
      };
    case types.UPDATE_TASK_BY_ID_REQUEST:
      return { ...state, updatingTask: true };
    case types.UPDATE_TASK_BY_ID_SUCCESS:
      return { ...state, updatingTask: false };
    case types.UPDATE_TASK_BY_ID_FAILURE:
      return { ...state, updatingTask: false, updatingTaskError: false };

    case types.UPDATE_TASK_RESUFFEL_BY_ID_REQUEST:
      return { ...state, updatingTaskResuffel: true };
    case types.UPDATE_TASK_RESUFFEL_BY_ID_SUCCESS:
      return { ...state, processTask: action.payload };
    case types.UPDATE_TASK_RESUFFEL_BY_ID_FAILURE:
      return {
        ...state,
        updatingTaskResuffel: false,
        updatingTaskResuffelError: false,
      };

    case types.DELETE_TASK_REQUEST:
      return { ...state, deleteTask: true };
    case types.DELETE_TASK_SUCCESS:
      return {
        ...state,
        deleteTask: false,
        processTask: state.processTask.filter(
          (item) => item.taskId !== action.payload
        ),
      };
    case types.DELETE_TASK_FAILURE:
      return { ...state, deleteTask: false, deleteTaskError: false };

    case types.UPDATE_PROCESS_TASK_REQUEST:
      return { ...state, updatingProcessTask: true };
    case types.UPDATE_PROCESS_TASK_SUCCESS:
      //debugger
      return {
        ...state,
        updatingProcessTask: false,
        addEditProcessModal: false,
      };
    case types.UPDATE_PROCESS_TASK_FAILURE:
      return {
        ...state,
        updatingProcessTask: false,
        updatingProcessTaskError: false,
        addEditProcessModal: false,
      };

    case types.SET_TASK_EDIT:
      return { ...state, setEditingTask: action.payload };

    //recruitment

    case types.GET_PROCESS_FOR_RECRUIT_REQUEST:
      return {
        ...state,
        fetchingProcessForRecruit: true,
        fetchingProcessForRecruitError: false,
      };
    case types.GET_PROCESS_FOR_RECRUIT_SUCCESS:
      return {
        ...state,
        fetchingProcessForRecruit: false,
        fetchingProcessForRecruitError: false,
        recruitProcess: action.payload,
      };
    case types.GET_PROCESS_FOR_RECRUIT_FAILURE:
      return {
        ...state,
        fetchingProcessForRecruit: false,
        fetchingProcessForRecruitError: true,
      };

    case types.ADD_PROCESS_FOR_RECRUIT_REQUEST:
      return {
        ...state,
        addingProcessForRecruit: true,
        addingProcessForRecruitError: false,
      };
    case types.ADD_PROCESS_FOR_RECRUIT_SUCCESS:
      return {
        ...state,
        addingProcessForRecruit: false,
        addingProcessForRecruitError: false,
        addProcessModal: false,
      };
    case types.ADD_PROCESS_FOR_RECRUIT_FAILURE:
      return {
        ...state,
        addingProcessForRecruit: false,
        addingProcessForRecruitError: true,
        addProcessModal: false,
      };

    case types.GET_PROCESS_STAGES_FOR_RECRUIT_REQUEST:
      return {
        ...state,
        fetchingProcessStagesForRecruit: true,
        fetchingProcessStagesForRecruitError: false,
      };
    case types.GET_PROCESS_STAGES_FOR_RECRUIT_SUCCESS:
      return {
        ...state,
        fetchingProcessStagesForRecruit: false,
        fetchingProcessStagesForRecruitError: false,
        recruitProcessStages: action.payload,
      };
    case types.GET_PROCESS_STAGES_FOR_RECRUIT_FAILURE:
      return {
        ...state,
        fetchingProcessStagesForRecruit: false,
        fetchingProcessStagesForRecruitError: true,
      };

    case types.ADD_PROCESS_STAGE_FOR_RECRUIT_REQUEST:
      return { ...state, addingProcessStagesForRecruit: true };
    case types.ADD_PROCESS_STAGE_FOR_RECRUIT_SUCCESS:
      return {
        ...state,
        addingProcessStagesForRecruit: false,
        recruitProcessStages: [...state.recruitProcessStages, action.payload],
      };
    case types.ADD_PROCESS_STAGE_FOR_RECRUIT_FAILURE:
      return {
        ...state,
        addingProcessStagesForRecruit: false,
        addingProcessStagesForRecruitError: true,
      };

    case types.UPDATE_PROCESS_NAME_FOR_RECRUIT_REQUEST:
      return { ...state, updateProcessNameForRecruit: true };
    case types.UPDATE_PROCESS_NAME_FOR_RECRUIT_SUCCESS:
      // return { ...state, updatingStages: false, states: [...state.states, action.payload] };
      return {
        ...state,
        updateProcessNameForRecruit: false,
        recruitProcess: state.recruitProcess.map((state) =>
          state.recruitmentProcessId === action.payload.recruitmentProcessId
            ? action.payload
            : state
        ),
      };
    case types.UPDATE_PROCESS_NAME_FOR_RECRUIT_FAILURE:
      return {
        ...state,
        updateProcessNameForRecruit: false,
        updateProcessNameForRecruitError: true,
      };

    case types.UPDATE_STAGE_FOR_RECRUIT_REQUEST:
      return { ...state, updatingStagesForRecruit: true };
    case types.UPDATE_STAGE_FOR_RECRUIT_SUCCESS:
      // return { ...state, updatingStages: false, states: [...state.states, action.payload] };
      return {
        ...state,
        updatingStagesForRecruit: false,
        recruitProcessStages: state.recruitProcessStages.map((state) =>
          state.stageId === action.payload.stageId ? action.payload : state
        ),
      };
    case types.UPDATE_STAGE_FOR_RECRUIT_FAILURE:
      return {
        ...state,
        updatingStagesForRecruit: false,
        updatingStagesForRecruitError: true,
      };

    case types.GET_ALL_PROCESS_STAGES_FOR_RECRUIT_REQUEST:
      return {
        ...state,
        fetchingAllProcessStagesForRecruit: true,
        fetchingAllProcessStagesForRecruitError: false,
      };
    case types.GET_ALL_PROCESS_STAGES_FOR_RECRUIT_SUCCESS:
      return {
        ...state,
        fetchingAllProcessStagesForRecruit: false,
        fetchingAllProcessStagesForRecruitError: false,
        allProcessStagesForRecruit: action.payload,
      };
    case types.GET_ALL_PROCESS_STAGES_FOR_RECRUIT_FAILURE:
      return {
        ...state,
        fetchingAllProcessStagesForRecruit: false,
        fetchingAllProcessStagesForRecruitError: true,
      };
    //ADDING LEAVES
    case types.ADD_LEAVES_REQUEST:
      return {
        ...state,
        addingLeaves: true,
        addingLeavesError: false,
      };
    case types.ADD_LEAVES_SUCCESS:
      return {
        ...state,
        addingLeaves: false,
        addingLeavesError: false,
      };
    case types.ADD_LEAVES_FAILURE:
      return {
        ...state,
        addingLeaves: false,
        addingLeavesError: true,
      };
    //GET LEAVES DETAILS
    case types.GET_LEAVES_DETAIL_REQUEST:
      return {
        ...state,
        fetchingLeaveDetails: true,
        fetchingLeaveDetailsError: false,
      };
    case types.GET_LEAVES_DETAIL_SUCCESS:
      return {
        ...state,
        fetchingLeaveDetails: false,
        fetchingLeaveDetailsError: false,
        leaveData: action.payload,
      };
    case types.GET_LEAVES_DETAIL_FAILURE:
      return {
        ...state,
        fetchingLeaveDetails: false,
        fetchingLeaveDetailsError: true,
      };

    case types.GET_SIGNATURE_REQUEST:
      return {
        ...state,
        fetchingSignatureInd: true,
        fetchingSignatureIndError: false,
      };
    case types.GET_SIGNATURE_SUCCESS:
      return {
        ...state,
        fetchingSignatureInd: false,
        fetchingSignatureIndError: false,
        signatureInd: action.payload,
      };
    case types.GET_SIGNATURE_FAILURE:
      return {
        ...state,
        fetchingSignatureInd: false,
        fetchingSignatureIndError: true,
      };
    case types.HANDLE_EMAIL_MODAL:
      return { ...state, addEmailModal: action.payload };
    case types.HANDLE_WEBSITE_MODAL:
      return { ...state, addWebsiteModal: action.payload };
    case types.HANDLE_UPDATE_EMAIL_MODAL:
      return { ...state, addUpdateEmailModal: action.payload };

    case types.SET_EMAIL_EDIT:
      return { ...state, setEditingEmail: action.payload };

    case types.DATA_CLEAR:
      return { ...state, recruitProcessStages: [] };

    case types.ENABLE_RECRUITMENT_ADVANCE_REQUEST:
      return { ...state, enabalingRecruitProAdvance: true };
    case types.ENABLE_RECRUITMENT_ADVANCE_SUCCESS:
      return {
        ...state,
        enabalingRecruitProAdvance: false,
      };
    case types.ENABLE_RECRUITMENT_ADVANCE_FAILURE:
      return {
        ...state,

        enabalingRecruitProAdvanceError: true,
      };

    //GET MILEAGE DETAILS
    case types.GET_MILEAGE_DETAIL_REQUEST:
      return {
        ...state,
        fetchingMileageDetails: true,
        fetchingMileageDetailsError: false,
      };
    case types.GET_MILEAGE_DETAIL_SUCCESS:
      return {
        ...state,
        fetchingMileageDetails: false,
        fetchingMileageDetailsError: false,
        mileageData: action.payload,
      };
    case types.GET_MILEAGE_DETAIL_FAILURE:
      return {
        ...state,
        fetchingMileageDetails: false,
        fetchingMileageDetailsError: true,
      };

    //update LEAVES
    case types.UPDATE_MILEAGE_REQUEST:
      return {
        ...state,
        updatingMileage: true,
        updatingMileageError: false,
      };
    case types.UPDATE_MILEAGE_SUCCESS:
      return {
        ...state,
        updatingMileage: false,
        updatingMileageError: false,
      };
    case types.UPDATE_MILEAGE_FAILURE:
      return {
        ...state,
        updatingMileage: false,
        updatingMileageError: true,
      };

    case types.HANDLE_APPROVAL_MODAL:
      return { ...state, addRecruitmentApprovalModal: action.payload };

    case types.ADD_APPROVAL_REQUEST:
      return {
        ...state,
        addingApproval: true,
      };
    case types.ADD_APPROVAL_SUCCESS:
      return {
        ...state,
        addingApproval: false,
      };
    case types.ADD_APPROVAL_FAILURE:
      return {
        ...state,
        addingApproval: false,
        addingApprovalError: true,
      };

    case types.GET_APPROVAL_DATA_REQUEST:
      return { ...state, fetchingApprovalData: true };
    case types.GET_APPROVAL_DATA_SUCCESS:
      return {
        ...state,
        fetchingApprovalData: false,
        paymentData: action.payload,
      };
    case types.GET_APPROVAL_DATA_FAILURE:
      return {
        ...state,
        fetchingApprovalData: false,
        fetchingApprovalDataError: true,
      };

    case types.LINK_PROCESS_PUBLISH_REQUEST:
      return {
        ...state,
        linkingProcessPublish: true,
      };
    case types.LINK_PROCESS_PUBLISH_SUCCESS:
      return {
        ...state,
        linkingProcessPublish: false,
        processPublish: state.processPublish.map((item) => {
          if (
            item.recruitmentProcessId === action.payload.recruitmentProcessId
          ) {
            return action.payload;
          } else {
            return item;
          }
        }),
      };
    case types.LINK_PROCESS_PUBLISH_FAILURE:
      return {
        ...state,
        linkingProcessPublish: false,
        linkingProcessPublishError: true,
      };

    case types.LINK_STAGES_PUBLISH_REQUEST:
      return {
        ...state,
        linkingStagesPublish: true,
      };
    case types.LINK_STAGES_PUBLISH_SUCCESS:
      return {
        ...state,
        linkingStagesPublish: false,
        stagesPublish: state.stagesPublish.map((item) => {
          if (item.stageId === action.payload.stageId) {
            return action.payload;
          } else {
            return item;
          }
        }),
      };
    case types.LINK_STAGES_PUBLISH_FAILURE:
      return {
        ...state,
        linkingStagesPublish: false,
        linkingStagesPublishError: true,
      };

    // COMMISSION
    case types.ADD_COMMISSION_REQUEST:
      return {
        ...state,
        addingCommission: true,
      };
    case types.ADD_COMMISSION_SUCCESS:
      return {
        ...state,
        addingCommission: false,
      };
    case types.ADD_COMMISSION_FAILURE:
      return {
        ...state,
        addingCommission: false,
        addingCommissionError: true,
      };

    case types.GET_COMMISSION_REQUEST:
      return { ...state, fetchingCommission: true };
    case types.GET_COMMISSION_SUCCESS:
      return {
        ...state,
        fetchingCommission: false,
        commissionData: action.payload,
      };
    case types.GET_COMMISSION_FAILURE:
      return {
        ...state,
        fetchingCommission: false,
        fetchingCommissionError: true,
      };
    //get commission table
    case types.GET_COMMISSION_TABLE_REQUEST:
      return { ...state, fetchingCommissionTable: true };
    case types.GET_COMMISSION_TABLE_SUCCESS:
      return {
        ...state,
        fetchingCommissionTable: false,
        tableCommission: action.payload,
      };
    case types.GET_COMMISSION_TABLE_FAILURE:
      return {
        ...state,
        fetchingCommissionTable: false,
        fetchingCommissionTableError: true,
      };

    case types.UPDATE_COMMISSION_REQUEST:
      return { ...state, updatingCommission: true };
    case types.UPDATE_COMMISSION_SUCCESS:
      // return { ...state, updatingStages: false, states: [...state.states, action.payload] };
      return {
        ...state,
        updatingCommission: false,
        commissionData: state.commissionData.map((state) =>
          state.processId === action.payload.processId ? action.payload : state
        ),
      };
    case types.UPDATE_COMMISSION_FAILURE:
      return {
        ...state,
        updatingCommission: false,
        updatingCommissionError: true,
      };

    case types.SET_EDIT_COMMISSION:
      return { ...state, setEditingCommission: action.payload };

    case types.HANDLE_COMMISSION_MODAL:
      return { ...state, commissionUpdateModal: action.payload };

    // RECRUITER
    case types.ADD_RECRUITER_REQUEST:
      return {
        ...state,
        addingRecruiter: true,
      };
    case types.ADD_RECRUITER_SUCCESS:
      return {
        ...state,
        addingRecruiter: false,
      };
    case types.ADD_RECRUITER_FAILURE:
      return {
        ...state,
        addingRecruiter: false,
        addingRecruiterError: true,
      };

    case types.GET_RECRUITER_REQUEST:
      return { ...state, fetchingRecruiter: true };
    case types.GET_RECRUITER_SUCCESS:
      return {
        ...state,
        fetchingRecruiter: false,
        recruiterData: action.payload,
      };
    case types.GET_RECRUITER_FAILURE:
      return {
        ...state,
        fetchingRecruiter: false,
        fetchingRecruiterError: true,
      };

    //get RECRUITER table
    case types.GET_RECRUITER_TABLE_REQUEST:
      return { ...state, fetchingRecruiterTable: true };
    case types.GET_RECRUITER_TABLE_SUCCESS:
      return {
        ...state,
        fetchingRecruiterTable: false,
        tableRecruiter: action.payload,
      };
    case types.GET_RECRUITER_TABLE_FAILURE:
      return {
        ...state,
        fetchingRecruiterTable: false,
        fetchingRecruiterTableError: true,
      };
    //ADD WEBSITE DETAILS

    case types.ADD_WEBSITE_REQUEST:
      return { ...state, addingWebsite: true };
    case types.ADD_WEBSITE_SUCCESS:
      return {
        ...state,
        addingWebsite: false,
      };
    case types.ADD_WEBSITE_FAILURE:
      return {
        ...state,
        addingWebsite: false,
        addingWebsiteError: true,
      };
    //GET WEBSITE DETAILS
    case types.GET_WEBSITE_REQUEST:
      return { ...state, fetchingWebsite: true };
    case types.GET_WEBSITE_SUCCESS:
      return {
        ...state,
        fetchingWebsite: false,
        website: action.payload,
      };
    case types.GET_WEBSITE_FAILURE:
      return {
        ...state,
        fetchingWebsite: false,
        fetchingWebsiteError: true,
      };

    //GET SCHEDULER
    case types.GET_SCHEDULER_BY_ORG_ID_REQUEST:
      return { ...state, fetchingScheduler: true };
    case types.GET_SCHEDULER_BY_ORG_ID_SUCCESS:
      return {
        ...state,
        fetchingScheduler: false,
        scheduler: action.payload,
      };
    case types.GET_SCHEDULER_BY_ORG_ID_FAILURE:
      return {
        ...state,
        fetchingScheduler: false,
        fetchingSchedulerError: true,
      };

    //ADD SCHEDULER
    case types.ADD_SCHEDULER_BY_ORG_ID_REQUEST:
      return { ...state, addingScheduler: true };
    case types.ADD_SCHEDULER_BY_ORG_ID_SUCCESS:
      return {
        ...state,
        addingScheduler: false,
      };
    case types.ADD_SCHEDULER_BY_ORG_ID_FAILURE:
      return {
        ...state,
        addingScheduler: false,
        addingSchedulerError: false,
      };
    //GET SCHEDULER CUSTOMER
    case types.GET_SCHEDULER_CUSTOMER_REQUEST:
      return { ...state, fetchingCustomer: true };
    case types.GET_SCHEDULER_CUSTOMER_SUCCESS:
      return {
        ...state,
        fetchingCustomer: false,
        customer: action.payload,
      };
    case types.GET_SCHEDULER_CUSTOMER_FAILURE:
      return {
        ...state,
        fetchingCustomer: false,
        fetchingCustomerError: true,
      };

    //ADD SCHEDULER CUSTOMER
    case types.ADD_SCHEDULER_CUSTOMER_REQUEST:
      return { ...state, addingCustomer: true };
    case types.ADD_SCHEDULER_CUSTOMER_SUCCESS:
      return {
        ...state,
        addingCustomer: false,
      };
    case types.ADD_SCHEDULER_CUSTOMER_FAILURE:
      return {
        ...state,
        addingCustomer: false,
        addingCustomerError: false,
      };
    //GET SCHEDULER VENDOR
    case types.GET_SCHEDULER_VENDOR_REQUEST:
      return { ...state, fetchingVendor: true };
    case types.GET_SCHEDULER_VENDOR_SUCCESS:
      return {
        ...state,
        fetchingVendor: false,
        vendor: action.payload,
      };
    case types.GET_SCHEDULER_VENDOR_FAILURE:
      return {
        ...state,
        fetchingVendor: false,
        fetchingVendorError: true,
      };

    //ADD SCHEDULER VENDOR
    case types.ADD_SCHEDULER_BY_ORG_ID_REQUEST:
      return { ...state, addingVendor: true };
    case types.ADD_SCHEDULER_BY_ORG_ID_SUCCESS:
      return {
        ...state,
        addingVendor: false,
      };
    case types.ADD_SCHEDULER_BY_ORG_ID_FAILURE:
      return {
        ...state,
        addingVendor: false,
        addingVendorError: false,
      };

    case types.ADDING_THIRD_PARTY_ACCESS_REQUEST:
      return { ...state, addingThirdPartyAccess: true };
    case types.ADDING_THIRD_PARTY_ACCESS_SUCCESS:
      return {
        ...state,
        addingThirdPartyAccess: false,
        // userList: state.userList.map((item) => {
        //   if (item.userId === action.payload.userId)
        //     return { ...item, candidateInd: action.payload.candidateInd, plannerInd: action.payload.plannerInd };
        //   else {
        //     return item;
        //   }
        // }),
      };
    case types.ADDING_THIRD_PARTY_ACCESS_FAILURE:
      return {
        ...state,
        addingThirdPartyAccess: false,
        addingThirdPartyAccessError: true,
      };

    case types.GET_THIRD_PARTY_ACCESS_REQUEST:
      return { ...state, fetchingThirdPartyAccess: true };
    case types.GET_THIRD_PARTY_ACCESS_SUCCESS:
      return {
        ...state,
        fetchingThirdPartyAccess: false,
        thirdPartyAccess: action.payload,
      };
    case types.GET_THIRD_PARTY_ACCESS_FAILURE:
      return {
        ...state,
        fetchingThirdPartyAccess: false,
        fetchingThirdPartyAccessError: false,
      };

    case types.ADDING_THIRD_PARTY_VENDOR_ACCESS_REQUEST:
      return { ...state, addingThirdPartyVendorAccess: true };
    case types.ADDING_THIRD_PARTY_VENDOR_ACCESS_SUCCESS:
      return {
        ...state,
        addingThirdPartyVendorAccess: false,
      };
    case types.ADDING_THIRD_PARTY_VENDOR_ACCESS_FAILURE:
      return {
        ...state,
        addingThirdPartyVendorAccess: false,
        addingThirdPartyVendorAccessError: true,
      };

    case types.GET_THIRD_PARTY_VENDOR_ACCESS_REQUEST:
      return { ...state, fetchingThirdPartyVendorAccess: true };
    case types.GET_THIRD_PARTY_VENDOR_ACCESS_SUCCESS:
      return {
        ...state,
        fetchingThirdPartyVendorAccess: false,
        thirdPartyVendorAccess: action.payload,
      };
    case types.GET_THIRD_PARTY_VENDOR_ACCESS_FAILURE:
      return {
        ...state,
        fetchingThirdPartyVendorAccess: false,
        fetchingThirdPartyVendorAccessError: false,
      };

    //post

    case types.ADDING_DEPARTMENT_ACCESS_REQUEST:
      return { ...state, addingDepartmentAccess: true };
    case types.ADDING_DEPARTMENT_ACCESS_SUCCESS:
      return {
        ...state,
        addingDepartmentAccess: false,
        // userList: state.userList.map((item) => {
        //   if (item.userId === action.payload.userId)
        //     return { ...item, candidateInd: action.payload.candidateInd, plannerInd: action.payload.plannerInd };
        //   else {
        //     return item;
        //   }
        // }),
      };
    case types.ADDING_DEPARTMENT_ACCESS_FAILURE:
      return {
        ...state,
        addingDepartmentAccess: false,
        addingDepartmentAccessError: true,
      };

    //get
    case types.GET_DEPARTMENT_ACCESS_REQUEST:
      return { ...state, fetchingDepartmentAccess: true };
    case types.GET_DEPARTMENT_ACCESS_SUCCESS:
      return {
        ...state,
        fetchingDepartmentAccess: false,
        departmentAcces: action.payload,
      };
    case types.GET_DEPARTMENT_ACCESS_FAILURE:
      return {
        ...state,
        fetchingDepartmentAccess: false,
        fetchingDepartmentAccessError: true,
      };

    //get
    case types.GET_DEPARTMENT_LIST_REQUEST:
      return { ...state, fetchingDepartmentList: true };
    case types.GET_DEPARTMENT_LIST_SUCCESS:
      return {
        ...state,
        fetchingDepartmentList: false,
        departmentList: action.payload,
      };
    case types.GET_DEPARTMENT_LIST_FAILURE:
      return {
        ...state,
        fetchingDepartmentList: false,
        fetchingDepartmentListError: true,
      };

    case types.GET_THIRD_PARTY_MONETIZE_REQUEST:
      return { ...state, fetchingThirdPartyMonetize: true };
    case types.GET_THIRD_PARTY_MONETIZE_SUCCESS:
      return {
        ...state,
        fetchingThirdPartyMonetize: false,
        thirdPartyMonetize: action.payload,
      };
    case types.GET_THIRD_PARTY_MONETIZE_FAILURE:
      return {
        ...state,
        fetchingThirdPartyMonetize: false,
        fetchingThirdPartyMonetizeError: false,
      };

    case types.ADDING_COMPLIANCE_GDPR_REQUEST:
      return { ...state, addingComplianceGdpr: true };
    case types.ADDING_COMPLIANCE_GDPR_SUCCESS:
      return {
        ...state,
        addingComplianceGdpr: false,
        // userList: state.userList.map((item) => {
        //   if (item.userId === action.payload.userId)
        //     return { ...item, candidateInd: action.payload.candidateInd, plannerInd: action.payload.plannerInd };
        //   else {
        //     return item;
        //   }
        // }),
      };
    case types.ADDING_COMPLIANCE_GDPR_FAILURE:
      return {
        ...state,
        addingComplianceGdpr: false,
        addingComplianceGdprError: true,
      };

    case types.GET_COMPLIANCE_GDPR_REQUEST:
      return { ...state, fetchingComplianceGdpr: true };
    case types.GET_COMPLIANCE_GDPR_SUCCESS:
      return {
        ...state,
        fetchingComplianceGdpr: false,
        gdprCompliance: action.payload,
      };
    case types.GET_COMPLIANCE_GDPR_FAILURE:
      return {
        ...state,
        fetchingComplianceGdpr: false,
        fetchingComplianceGdprError: false,
      };

    case types.ADDING_UP_WORK_ACCESS_REQUEST:
      return { ...state, addingUpWorkAccess: true };
    case types.ADDING_UP_WORK_ACCESS_SUCCESS:
      return {
        ...state,
        addingUpWorkAccess: false,
      };
    case types.ADDING_UP_WORK_ACCESS_FAILURE:
      return {
        ...state,
        addingUpWorkAccess: false,
        addingUpWorkAccessError: true,
      };

    case types.GET_UP_WORK_ACCESS_REQUEST:
      return { ...state, fetchingUpWorkAccess: true };
    case types.GET_UP_WORK_ACCESS_SUCCESS:
      return {
        ...state,
        fetchingUpWorkAccess: false,
        upWorkAccess: action.payload,
      };
    case types.GET_UP_WORK_ACCESS_FAILURE:
      return {
        ...state,
        fetchingUpWorkAccess: false,
        fetchingUpWorkAccessError: false,
      };

    case types.ADDING_COMMUNICATION_ACCESS_REQUEST:
      return { ...state, addingCommunicationAccess: true };
    case types.ADDING_COMMUNICATION_ACCESS_SUCCESS:
      return {
        ...state,
        addingCommunicationAccess: false,
      };
    case types.ADDING_COMMUNICATION_ACCESS_FAILURE:
      return {
        ...state,
        addingCommunicationAccess: false,
        addingCommunicationAccessError: true,
      };

    case types.GET_COMMUNICATION_ACCESS_REQUEST:
      return { ...state, fetchingCommunicationAccess: true };
    case types.GET_COMMUNICATION_ACCESS_SUCCESS:
      return {
        ...state,
        fetchingCommunicationAccess: false,
        communicationAccess: action.payload,
      };
    case types.GET_COMMUNICATION_ACCESS_FAILURE:
      return {
        ...state,
        fetchingCommunicationAccess: false,
        fetchingCommunicationAccessError: false,
      };

    case types.ADDING_SOURCING_ACCESS_REQUEST:
      return { ...state, addingSourcingAccess: true };
    case types.ADDING_SOURCING_ACCESS_SUCCESS:
      return {
        ...state,
        addingSourcingAccess: false,
      };
    case types.ADDING_SOURCING_ACCESS_FAILURE:
      return {
        ...state,
        addingSourcingAccess: false,
        addingSourcingAccessError: true,
      };

    case types.GET_SOURCING_ACCESS_REQUEST:
      return { ...state, fetchingSourcingAccess: true };
    case types.GET_SOURCING_ACCESS_SUCCESS:
      return {
        ...state,
        fetchingSourcingAccess: false,
        sourcingAccess: action.payload,
      };
    case types.GET_SOURCING_ACCESS_FAILURE:
      return {
        ...state,
        fetchingSourcingAccess: false,
        fetchingSourcingAccessError: false,
      };
    case types.HANDLE_SEQUENCE_MODAL:
      return { ...state, addSequenceModal: action.payload };

    case types.ADDING_PERMISSION_ACCESS_REQUEST:
      return { ...state, addingPermissionAccess: true };
    case types.ADDING_PERMISSION_ACCESS_SUCCESS:
      return {
        ...state,
        addingPermissionAccess: false,
      };
    case types.ADDING_PERMISSION_ACCESS_FAILURE:
      return {
        ...state,
        addingPermissionAccess: false,
        addingPermissionAccessError: true,
      };

    case types.GET_PERMISSION_ACCESS_REQUEST:
      return { ...state, fetchingPermissionAccess: true };
    case types.GET_PERMISSION_ACCESS_SUCCESS:
      return {
        ...state,
        fetchingPermissionAccess: false,
        permissionAccess: action.payload,
      };
    case types.GET_PERMISSION_ACCESS_FAILURE:
      return {
        ...state,
        fetchingPermissionAccess: false,
        fetchingPermissionAccessError: false,
      };

    case types.ADD_PARTNER_REQUEST:
      return { ...state, addingPartner: true };
    case types.ADD_PARTNER_SUCCESS:
      return {
        ...state,
        addingPartner: false,
      };
    case types.ADD_PARTNER_FAILURE:
      return {
        ...state,
        addingPartner: false,
        addingPartnerError: true,
      };

    case types.GET_PARTNER_REQUEST:
      return { ...state, fetchingPartner: true };
    case types.GET_PARTNER_SUCCESS:
      return {
        ...state,
        fetchingPartner: false,
        partner: action.payload,
      };
    case types.GET_PARTNER_FAILURE:
      return {
        ...state,
        fetchingPartner: false,
        fetchingPartnerError: true,
      };

    case types.ADD_SEQUENCE_REQUEST:
      return { ...state, addingSequence: true };
    case types.ADD_SEQUENCE_SUCCESS:
      return { ...state, addingSequence: false, addSequenceModal: false };
    case types.ADD_SEQUENCE_FAILURE:
      return {
        ...state,
        addingSequence: false,
        addSequenceModal: false,
        addingSequenceError: true,
      };

    case types.GET_SEQUENCE_REQUEST:
      return { ...state, fetchingSequence: true };
    case types.GET_SEQUENCE_SUCCESS:
      return {
        ...state,
        fetchingSequence: false,
        sequence: action.payload,
      };
    case types.GET_SEQUENCE_FAILURE:
      return {
        ...state,
        fetchingSequence: false,
        fetchingSequenceError: true,
      };

      case types.ADD_MONSTER_REQUEST:
      return { ...state, addingMonster: true };
    case types.ADD_MONSTER_SUCCESS:
      return {
        ...state,
        addingMonster: false,
      };
    case types.ADD_MONSTER_FAILURE:
      return {
        ...state,
        addingMonster: false,
        addingMonsterError: true,
      };

      case types.GET_MONSTER_REQUEST:
        return { ...state, fetchingMonster: true };
      case types.GET_MONSTER_SUCCESS:
        return {
          ...state,
          fetchingMonster: false,
          monster: action.payload,
        };
      case types.GET_MONSTER_FAILURE:
        return {
          ...state,
          fetchingMonster: false,
          fetchingMonsterError: true,
        };

    default:
      return state;
  }
};
