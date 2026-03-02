import * as types from "./DashboardActionTypes";
import dayjs from "dayjs";

const initialState = {
    fetchingSkillsCloud: false,
    fetchingSkillsCloudError:false,
    skillsCloud:[],

    fetchingdashboardTable:false,
    fetchingdashboardTableError:false,
    tableDashboard:[],

    fetchingRecruiterDashboardList: false,
    fetchingRecruiterDashboardListError: false,
    listRecruiterDashboard:[],

    fetchingdashBoardCommissionTable: false,
    fetchingdashBoardCommissionTableError: false,
    tableDashBoardCommission:[],

    fetchingdashboardTable2:false,
    fetchingdashboardTable2Error:false,
    tableDashboard2:[],

    fetchingdashBoardCustomerChart: false,
    fetchingdashBoardCustomerChartError: false,
    dashBoardCustomerChart:[],

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
    {
      id: 1,
      type: "Today",
      value: "Today",
      starter: true,
      isSelected: true,
      startDate: dayjs()
        // .subtract(1, "days")
        .toISOString(),
      endDate: dayjs().toISOString(),
    },
    {
      id: 2,
      type: "Yesterday",
      value: "Yesterday",
      starter: false,
      isSelected: false,
      endDate: dayjs()
        .subtract(1, "days")

        .toISOString(),
      startDate: dayjs().toISOString(),
    },
    {
      id: 3,
      type: "Last7days",
      value: "Last 7 days",
      starter: false,
      isSelected: false,
      endDate: dayjs()
      .subtract(7, "days")

      .toISOString(),
    startDate: dayjs().toISOString(),
      // startDate: dayjs()
      //   .subtract(7, "days")

      //   .toISOString(),
      // endDate: dayjs().toISOString(),
    },

    {
      id: 4,
      type: "Last30days",
      value: "Last 30 days",
      starter: false,
      isSelected: false,
      endDate: dayjs()
      .subtract(30, "days")

      .toISOString(),
    startDate: dayjs().toISOString(),
      // startDate: dayjs()
      //   .subtract(30, "days")

      //   .toISOString(),
      // endDate: dayjs().toISOString(),
    },
    {
      id: 5,
      type: "Thismonth",
      value: "This month",
      starter: false,
      isSelected: false,
      endDate: dayjs()
      .startOf("week").toISOString(),
    startDate: dayjs().toISOString(),
      
    },
    {
      id: 6,
      type: "Lastmonth",
      value: "Last month",
      starter: false,
      isSelected: false,
      startDate: dayjs().startOf("month").toISOString(),
      endDate: dayjs().toISOString(),
    },
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
    "dashboard",
  ],
  selectedReportType: "dashboard",
  selectedSubReportType: "dashboard",

  fetchingDatewiseReport: false,
  fetchingDatewiseReportError: false,
  dateDashboardReport: [],
};


export const dashboardReducer = (state = initialState, action) => {
 
      switch (action.type) {
        case types.SET_DASHBOARD_VIEW_TYPE:
          return { ...state, viewType: action.payload };

        case types.GET_SKILLS_CLOUD_REQUEST:
            return { ...state, fetchingSkillsCloud: true };
          case types.GET_SKILLS_CLOUD_SUCCESS:
            return {
              ...state,
              fetchingSkillsCloud: false,
              skillsCloud: action.payload,
            };
          case types.GET_SKILLS_CLOUD_FAILURE:
            return {
              ...state,
              fetchingSkillsCloud: false,
              fetchingSkillsCloudError: true,
            };
            case types.CHANGE_SELECTED_TIME_INTERVAL_REPORT:
              return {
                ...state,
                dateRangeList: newDateRange(state.dateRangeList, action.payload),
                isCustomSelected: false,
                startDate: action.payload.startDate,
                endDate: action.payload.endDate,
                type: action.payload.type
              };
        
            case types.SET_TIME_INTERVAL_REPORT:
              return {
                ...state,
                isCustomSelected: true,
                startDate: action.payload.startDate,
                endDate: action.payload.endDate,
              };
        
            case types.GET_ORDER_LIST_BY_ORDER_ID_REQUEST:
              return { ...state, fetchingOrderListByOrderId: true };
            case types.GET_ORDER_LIST_BY_ORDER_ID_SUCCESS:
              return {
                ...state,
                fetchingOrderListByOrderId: false,
                orderListByOrderId: action.payload,
              };
            case types.GET_ORDER_LIST_BY_ORDER_ID_FAILURE:
              return {
                ...state,
                fetchingOrderListByOrderId: false,
                fetchingOrderListByOrderIdError: true,
              };
        
            case types.SET_SELECTED_REPORT_TYPE:
              return {
                ...state,
                selectedReportType: action.payload,
                // selectedSubReportType: "order",
              };
        
            case types.GET_DATE_WISE_REPORT_REQUEST:
              return { ...state, fetchingDatewiseReport: true };
            case types.GET_DATE_WISE_REPORT_SUCCESS:
              return {
                ...state,
                fetchingDatewiseReport: false,
                fetchingDatewiseReportError: false,
                showDatelist: action.payload,
              };
            case types.GET_DATE_WISE_REPORT_FAILURE:
              return {
                ...state,
                fetchingDatewiseReport: false,
                fetchingDatewiseReportError: true,
                selectedReportType: "dashboard"
              };

              case types.GET_DASHBOARD_TABLE_REQUEST:
                return { ...state, fetchingdashboardTable: true };
              case types.GET_DASHBOARD_TABLE_SUCCESS:
                return {
                  ...state,
                  fetchingdashboardTable: false,
                  tableDashboard: action.payload,
                };
                case types.GET_DASHBOARD_TABLE_FAILURE:
                  return {
                    ...state,
                    fetchingdashboardTable: false,
                    fetchingdashboardTableError: true,
                  };

                  case types.GET_RECRUITER_DASHBOARD_LIST_REQUEST:
                    return { ...state, fetchingRecruiterDashboardList: true };
                  case types.GET_RECRUITER_DASHBOARD_LIST_SUCCESS:
                    return {
                      ...state,
                      fetchingRecruiterDashboardList: false,
                      listRecruiterDashboard: action.payload,
                    };
                    case types.GET_RECRUITER_DASHBOARD_LIST_FAILURE:
                      return {
                        ...state,
                        fetchingRecruiterDashboardList: false,
                        fetchingRecruiterDashboardListError: true,
                      };

                  case types.GET_DASHBOARD_TABLE_PROGRESS_REQUEST:
                return { ...state, fetchingdashboardTable2: true };
              case types.GET_DASHBOARD_TABLE_PROGRESS_SUCCESS:
                return {
                  ...state,
                  fetchingdashboardTable2: false,
                  tableDashboard2: action.payload,
                };
                case types.GET_DASHBOARD_TABLE_PROGRESS_FAILURE:
                  return {
                    ...state,
                    fetchingdashboardTable2: false,
                    fetchingdashboardTable2Error: true,
                  };

                  case types.GET_DASHBOARD_COMMISSION_TABLE_REQUEST:
                    return { ...state, fetchingdashBoardCommissionTable: true };
                  case types.GET_DASHBOARD_COMMISSION_TABLE_SUCCESS:
                    return {
                      ...state,
                      fetchingdashBoardCommissionTable: false,
                      tableDashBoardCommission: action.payload,
                    };
                    case types.GET_DASHBOARD_COMMISSION_TABLE_FAILURE:
                      return {
                        ...state,
                        fetchingdashBoardCommissionTable: false,
                        fetchingdashBoardCommissionTableError: true,
                      };

                      case types.GET_DASHBOARD_CUSTOMER_CHART_REQUEST:
                        return { ...state, fetchingdashBoardCustomerChart: true };
                      case types.GET_DASHBOARD_CUSTOMER_CHART_SUCCESS:
                        return {
                          ...state,
                          fetchingdashBoardCustomerChart: false,
                          dashBoardCustomerChart: action.payload,
                        };
                        case types.GET_DASHBOARD_CUSTOMER_CHART_FAILURE:
                          return {
                            ...state,
                            fetchingdashBoardCustomerChart: false,
                            fetchingdashBoardCustomerChartError: true,
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