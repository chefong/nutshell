import React from 'react';
import './Input.less';

function Input(props) {
  const { onChange, value, placeholder } = props;

  const handleChange = (e) => {
    const { target: { value } } = e;
    onChange(value);
  };

  return (
    <input
      className="Input"
      type="text"
      placeholder={placeholder}
      onChange={handleChange}
      value={value}
    />
  );
}

export default Input;
