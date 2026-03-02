import * as types from "./ReportActionType";
import dayjs from "dayjs";

const initialState = {
    fetchingOrganisationReport: false,
    fetchingOrganisationReportError: false,
    organisationReportData: [],

    fetchingMyViewReport: false,
    fetchingMyViewReportError: false,
    myViewReportData: [],

    fetchingSalesReports: false,
    fetchingSalesReportsError: false,
    reportsSales:[],

     reportViewType: "ME",
    dateRangeList: [
        // {
        //   id: 1,
        //   type: "year",
        //   value: "FY",
        //   starter: true,
        //   isSelected: true,
        //   startDate: dayjs()
        //     .startOf("year")
        //     .toISOString(),
        //   endDate: dayjs()
        //     .endOf("year")
        //     .toISOString(),
        // },
        {
            id: 1,
            type: "Today",
            value: "Today",
            starter: false,
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
            startDate: dayjs()
                .subtract(1, "days")

                .toISOString(),
            endDate: dayjs().toISOString(),
        },
        {
            id: 3,
            type: "Last7days",
            value: "Last 7 days",
            starter: false,
            isSelected: false,
            startDate: dayjs()
                .subtract(7, "days")

                .toISOString(),
            endDate: dayjs().toISOString(),
        },

        {
            id: 4,
            type: "Last30days",
            value: "Last 30 days",
            starter: false,
            isSelected: false,
            startDate: dayjs()
                .subtract(30, "days")

                .toISOString(),
            endDate: dayjs().toISOString(),
        },
        {
            id: 5,
            type: "Thismonth",
            value: "This month",
            starter: false,
            isSelected: false,
            startDate: dayjs().startOf("week").toISOString(),
            endDate: dayjs().toISOString(),
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
    ],
    isCustomSelected: false,
    // startDate: dayjs()
    //     .startOf("year")
    //     .toISOString(),
    // endDate: dayjs()
    //     .endOf("year")
    //     .toISOString(),

    reportTypes: ["Requirements", "Selected"],
    reportType: ["Requirements"],
    selectedReportType: "Select Report",

    selectedSubReportType: "Select",
    // reportRequirementSubTypes: ["All-Recruiters","Recruiters"],

};

export const reportReducer = (state = initialState, action) => {
    switch (action.type) {

        case types.SET_REPORT_VIEW_TYPE:
            return {
                ...state,
                reportViewType: action.payload,
                selectedSubReportType: "Select",
                selectedReportType: "Choose report type",
            };

        case types.CHANGE_SELECTED_TIME_INTERVAL_REPORT:
            return {
                ...state,
                dateRangeList: newDateRange(state.dateRangeList, action.payload),
                isCustomSelected: false,
                startDate: action.payload.startDate,
                endDate: action.payload.endDate,
            };
        case types.SET_TIME_INTERVAL_REPORT:
            return {
                ...state,
                isCustomSelected: true,
                startDate: action.payload.startDate,
                endDate: action.payload.endDate,
            };
        case types.SET_FISCAL_TIME_INTERVAL_REPORT:
            return {
                ...state,
                dateRangeList: mergeFiscalAndQuarter(
                    state.dateRangeList,
                    action.payload
                ),
                startDate: action.payload.fiscalMapper.fiscalStartDate,
                endDate: action.payload.fiscalMapper.fiscalEndDate,
            };

        //get report by organisation
        case types.GET_ORGANISATION_REPORT_REQUEST:
            return { ...state, fetchingOrganisationReport: true };
        case types.GET_ORGANISATION_REPORT_SUCCESS:
            return {
                ...state,
                fetchingOrganisationReport: false,
                organisationReport: action.payload,
            };
        case types.GET_ORGANISATION_REPORT_FAILURE:
            return {
                ...state,
                fetchingOrganisationReport: false,
                fetchingOrganisationReportError: true,
            };

        //get report by myView
        case types.GET_MY_VIEW_REPORT_REQUEST:
            return { ...state, fetchingMyViewReport: true };
        case types.GET_MY_VIEW_REPORT_SUCCESS:
            return {
                ...state,
                fetchingMyViewReport: false,
                myViewReportData: action.payload,
            };
        case types.GET_MY_VIEW_REPORT_FAILURE:
            return {
                ...state,
                fetchingMyViewReport: false,
                fetchingMyViewReportError: true,
                selectedReportType: "Select Report",
            };

        case types.SET_SELECTED_REPORT_TYPE:
            return {
                ...state, selectedReportType: action.payload,
                selectedSubReportType: "Select",
            };

        case types.SET_SUB_SELECTED_REPORT_TYPE:
            return {
                ...state,
                selectedSubReportType: action.payload,
            };

            case types.GET_SALES_REPORTS_REQUEST:
                    return { ...state, fetchingSalesReports: true };
                  case types.GET_SALES_REPORTS_SUCCESS:
                    return {
                      ...state,
                      fetchingSalesReports: false,
                      reportsSales: action.payload,
                    };
                    case types.GET_SALES_REPORTS_FAILURE:
                      return {
                        ...state,
                        fetchingSalesReports: false,
                        fetchingSalesReportsError: true,
                      };
        default:
         return state;
    }
};

const newDateRange = (dateRange, newDate) =>
    dateRange.map((range) => {
        if (range.id === newDate.id) {
            return { ...range, isSelected: true };
        } else {
            return { ...range, isSelected: false };
        }
    });

const mergeFiscalAndQuarter = (dateRange, newDate) =>
    dateRange.map((date) => {
        console.log(newDate);
        if (date.value === "FY") {
            return {
                ...date,
                startDate: newDate.fiscalMapper.fiscalStartDate,
                endDate: newDate.fiscalMapper.fiscalEndDate,
            };
        } else {
            return date;
        }
    });