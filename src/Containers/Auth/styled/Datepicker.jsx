import DatePicker from 'antd/lib/date-picker';
import styled from 'styled-components'

const StyledDatePicker = styled(DatePicker)`
    .ant-input{
        border: none;
        width: 21.875em;
        height: 2.5em;
        margin: 0.3rem 0;
        border-radius: 0.5rem;
        background: rgba(139, 148, 187, 0.8); 
        padding: 0.2rem;
        padding-left: 1rem;
        font-size: 1rem;
        transition: 0.3s all ease-in-out;
    &&:focus{
        outline: none;
        border-radius: 0.5rem;
        background: rgba(56, 66, 151, 0.555); 
        color: #fff;
    }
    &&:active{
        outline: none;
        border-radius: 0.5rem;
        background: rgba(56, 66, 151, 0.555); 
        color: #fff;
    }
    }
`
export default StyledDatePicker;