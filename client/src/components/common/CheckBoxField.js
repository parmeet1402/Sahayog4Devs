import React from "react";
import PropTypes from "prop-types";
const CheckBoxField = ({name, id, value, content, onChange}) => {
  return (
    <div className="form-group">
      <input
      className="form-check-input"
        type="checkbox"
        onChange={onChange}
        name={name}
        id={id}
        value={value}
      />
      <label className="form-check-label" style={{ marginLeft: "10px" }} htmlFor={id}>
        {content}
      </label>
    </div>
  );
};

CheckBoxField.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};
export default CheckBoxField;
