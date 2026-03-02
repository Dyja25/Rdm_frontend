import { Table, Empty } from "antd";
import styled from "styled-components";

const MyTable = () => (
  <Table
    locale={{
      emptyText: <Empty description={"We couldn't find relevant data"} />,
    }}
  />
);

const StyledTable = styled(Table)`
  color: ${(props) => props.theme.color};
  background-color: ${(props) => props.theme.backgroundColor};
  margin: ${(props) => props.theme.margin || "0.2rem"};
  margin-top: 13px;


  .ant-table {
    color: ${(props) => props.theme.color};
  }

  .ant-table-thead > tr > th {
    color: ${(props) => props.theme.color};
    background-color: ${(props) => props.theme.backgroundColor};
    font-weight: bold;
  }
  .ant-table-thead > tr > th {
    padding: 0.3125em 0.125em;
    font-size: 0.82rem;
  }
  
  .ant-table-tbody > tr > td {
    padding: 0.3125em 0.125em;
    font-size: 0.75rem;
  }

  .ant-table-thead > tr,
  .ant-table-tbody > tr {
    background-color: ${(props) => props.backgroundColor || ""};
  }
  .ant-table-tbody > tr:hover {
    background-color: ${(props) => props.theme.tableHoverColor};
  }
  .ant-table-tbody > tr:active {
    background-color: ${(props) => props.theme.tableHoverColor};
  }
  .ant-table-tbody > tr:focus {
    background-color: ${(props) => props.theme.tableHoverColor};
  }
  .dwXsDd .ant-table-thead > tr > th,
  .dwXsDd .ant-table-tbody > tr > td {
    padding: 1.3125em 0.5em;
  }
  .ant-table-tbody > tr:hover:not(.ant-table-expanded-row) > td {
    background-color: ${(props) => props.theme.tableHoverColor};
    color: ${(props) => props.theme.tableHoverFontColor};
  }
  .ant-table-filter-trigger {
    position: relative;
    display: flex;
    align-items: center;
    margin: -4px -8px -4px 4px;
    padding: 0 12px;
    color: tomato;
    font-size: 12px;
    border-radius: 2px;
    cursor: pointer;
    transition: all 0.3s;
}
.ant-table-filter-trigger:hover {
  color: tomato;
  background: rgba(0, 0, 0, 0.04);
}
.ant-table-filter-trigger.active {
  color: #1890ff;
}
`;
export default StyledTable;







