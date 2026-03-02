import React, { Component } from "react";
import { StyledDatePicker } from "../../UI/Antd";
import dayjs from "dayjs";

class EditableDatePicker extends Component {
  render() {
    const {
      name,
      value,
      placeholder,
      defaultValue,

      handleChange,
      width,

      isRequired,
      ...rest
    } = this.props;
    console.log(defaultValue);
    console.log(value);
    return (
      <>
        <StyledDatePicker
          allowClear={false}
          isRequired={isRequired}
          width={width}
          // format="YYYY-MM-DD HH:mm:ss"
          defaultValue={dayjs(defaultValue)}
          onChange={(date, dateString) =>
            handleChange(name, dayjs(dateString))
          }
          value={dayjs(value)}

        // {...rest}
        // onBlur={() => setFieldTouched(field.name, true)}
        />
      </>
    );
  }
}

export default EditableDatePicker;
