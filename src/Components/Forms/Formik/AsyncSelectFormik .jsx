import AsyncSelect from "react-select/async";
import { useField, useFormikContext } from "formik";
import axios from "axios";

const AsyncSelectFormik = ({
  label,
  url,
  optionLabel,
  optionValue,
  placeholder,
  isRequired,
  ...props
}) => {
  const [field, meta] = useField(props);
  const { setFieldValue, setFieldTouched } = useFormikContext();

  const loadOptions = async (inputValue) => {
    if (!inputValue) return [];
    try {
      const res = await axios.get(`${url}/${inputValue}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      });
      return res.data.map((opt) => ({
        label: opt[optionLabel],
        value: opt[optionValue],
      }));
    } catch (err) {
      console.error("Error loading options", err);
      return [];
    }
  };

  const handleChange = (selected) => {
    setFieldValue(field.name, selected ? selected.value : "");
  };

  return (
    <div style={{ flexBasis: "80%" }}>
      {label && <div className="text-xs font-bold">{label}</div>}
      <AsyncSelect
       style={{height:"2rem"}}
        isClearable
        cacheOptions
        defaultOptions
        loadOptions={loadOptions}
        onChange={handleChange}
        placeholder={placeholder}
        onBlur={() => setFieldTouched(field.name, true)}
        classNamePrefix="select"
        {...props}
      />
      {meta.touched && meta.error && (
        <div className="text-[tomato] text-xs">{meta.error}</div>
      )}
    </div>
  );
};

export default AsyncSelectFormik;
