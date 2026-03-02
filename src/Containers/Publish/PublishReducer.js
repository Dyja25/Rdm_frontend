import * as types from "./PublishActionTypes";
import dayjs from "dayjs";

const initialState = {
    fetchingSkillsCloud: false,
    fetchingSkillsCloudError:false,
    skillsCloud:[],

    fetchingdashboardTable:false,
    fetchingdashboardTableError:false,
    tableDashboard:[],

    linkingPublishStatus:false,
    linkingPublishStatusError:false,

    fetchingpublishTable:false,
    fetchingpublishTableError:false,
    tablePublish:[],

    // fetchingdashboardTable2:false,
    // fetchingdashboardTable2Error:false,
    // table2Dashboard:[],

    viewType: "dashboard",

  isCustomSelected: false,
  startDate: dayjs().toISOString(),
  endDate: dayjs().toISOString(),

  dateRangeList: [

    // {
    //   id: 8,
    //   type: "All",
    //   value: "All",
    //   starter: true,
    //   isSelected: true,
    //   startDate: dayjs()
    //     .toISOString(),
    //   endDate: dayjs().toISOString(),
    // },
    // {
    //   id: 1,
    //   type: "Today",
    //   value: "Today",
    //   starter: true,
    //   isSelected: true,
    //   startDate: dayjs()
    //     // .subtract(1, "days")
    //     .toISOString(),
    //   endDate: dayjs().toISOString(),
    // },
    // {
    //   id: 2,
    //   type: "Yesterday",
    //   value: "Yesterday",
    //   starter: false,
    //   isSelected: false,
    //   startDate: dayjs()
    //     .subtract(1, "days")

    //     .toISOString(),
    //   endDate: dayjs().toISOString(),
    // },
    // {
    //   id: 3,
    //   type: "Last7days",
    //   value: "Last 7 days",
    //   starter: false,
    //   isSelected: false,
    //   startDate: dayjs()
    //     .subtract(7, "days")

    //     .toISOString(),
    //   endDate: dayjs().toISOString(),
    // },

    // {
    //   id: 4,
    //   type: "Last30days",
    //   value: "Last 30 days",
    //   starter: false,
    //   isSelected: false,
    //   startDate: dayjs()
    //     .subtract(30, "days")

    //     .toISOString(),
    //   endDate: dayjs().toISOString(),
    // },
    // {
    //   id: 5,
    //   type: "Thismonth",
    //   value: "This month",
    //   starter: false,
    //   isSelected: false,
    //   startDate: dayjs().startOf("week").toISOString(),
    //   endDate: dayjs().toISOString(),
    // },
    // {
    //   id: 6,
    //   type: "Lastmonth",
    //   value: "Last month",
    //   starter: false,
    //   isSelected: false,
    //   startDate: dayjs().startOf("month").toISOString(),
    //   endDate: dayjs().toISOString(),
    // },
    // {
    //   id: 8,
    //   type: "DateRange",
    //   value: "Date Range",
    //   starter: false,
    //   isSelected: false,
    //   startDate: dayjs().startOf("year").toISOString,
    //   endDate: dayjs().endOf("year").toISOString(),
    // },
  ],
  type: 'All',

  fetchingOrderListByOrderId: false,
  fetchingOrderListByOrderIdError: false,
  showDatelist: [],
  
  reportType: [
    "publish",
  ],
  selectedReportType: "publish",
  selectedSubReportType: "publish",

  fetchingDatewiseReport: false,
  fetchingDatewiseReportError: false,
  dateDashboardReport: [],
};


export const publishReducer = (state = initialState, action) => {
 
      switch (action.type) {
        case types.SET_PUBLISH_VIEW_TYPE:
          return { ...state, viewType: action.payload };

        // case types.GET_SKILLS_CLOUD_REQUEST:
        //     return { ...state, fetchingSkillsCloud: true };
        //   case types.GET_SKILLS_CLOUD_SUCCESS:
        //     return {
        //       ...state,
        //       fetchingSkillsCloud: false,
        //       skillsCloud: action.payload,
        //     };
        //   case types.GET_SKILLS_CLOUD_FAILURE:
        //     return {
        //       ...state,
        //       fetchingSkillsCloud: false,
        //       fetchingSkillsCloudError: true,
        //     };
            // case types.CHANGE_SELECTED_TIME_INTERVAL_REPORT:
            //   return {
            //     ...state,
            //     dateRangeList: newDateRange(state.dateRangeList, action.payload),
            //     isCustomSelected: false,
            //     startDate: action.payload.startDate,
            //     endDate: action.payload.endDate,
            //     type: action.payload.type
            //   };
        
            // case types.SET_TIME_INTERVAL_REPORT:
            //   return {
            //     ...state,
            //     isCustomSelected: true,
            //     startDate: action.payload.startDate,
            //     endDate: action.payload.endDate,
            //   };
        
            // case types.GET_ORDER_LIST_BY_ORDER_ID_REQUEST:
            //   return { ...state, fetchingOrderListByOrderId: true };
            // case types.GET_ORDER_LIST_BY_ORDER_ID_SUCCESS:
            //   return {
            //     ...state,
            //     fetchingOrderListByOrderId: false,
            //     orderListByOrderId: action.payload,
            //   };
            // case types.GET_ORDER_LIST_BY_ORDER_ID_FAILURE:
            //   return {
            //     ...state,
            //     fetchingOrderListByOrderId: false,
            //     fetchingOrderListByOrderIdError: true,
            //   };
        
            // case types.SET_SELECTED_REPORT_TYPE:
            //   return {
            //     ...state,
            //     selectedReportType: action.payload,
            //     // selectedSubReportType: "order",
            //   };
        
            // case types.GET_DATE_WISE_REPORT_REQUEST:
            //   return { ...state, fetchingDatewiseReport: true };
            // case types.GET_DATE_WISE_REPORT_SUCCESS:
            //   return {
            //     ...state,
            //     fetchingDatewiseReport: false,
            //     fetchingDatewiseReportError: false,
            //     showDatelist: action.payload,
            //   };
            // case types.GET_DATE_WISE_REPORT_FAILURE:
            //   return {
            //     ...state,
            //     fetchingDatewiseReport: false,
            //     fetchingDatewiseReportError: true,
            //   };

              case types.GET_PUBLISH_TABLE_REQUEST:
                return { ...state, fetchingpublishTable: true };
              case types.GET_PUBLISH_TABLE_SUCCESS:
                return {
                  ...state,
                  fetchingpublishTable: false,
                  tablePublish: action.payload,
                };
                case types.GET_PUBLISH_TABLE_FAILURE:
                  return {
                    ...state,
                    fetchingpublishTable: false,
                    fetchingpublishTableError: true,
                  };
           

            case types.LINK_PUBLISH_STATUS_REQUEST:
              return { ...state, linkingPublishStatus: true };
            case types.LINK_PUBLISH_STATUS_SUCCESS:
              return {
                ...state,
                linkingPublishStatus: false,

                tablePublish: state.tablePublish.filter(
                  (item) => item.pingInd === action.payload
                ),
                // cancelOrder: action.payload,
                // candidateByUserId: action.payload,
                // addTeamTransferModal: false,
              };
            case types.LINK_PUBLISH_STATUS_FAILURE:
              return {
                ...state,
                linkingPublishStatus: false,
                linkingPublishStatusError: true,
              };

    default:
        return state;
    }
};

const newDateRange = (dateRange, newDate) =>
  dateRange.map((range) => {
    console.log(newDate);
    if (range.id === newDate.id) {
      return { ...range, isSelected: true };
    } else {
      return { ...range, isSelected: false };
    }
  });