import React from 'react';

function Input(props) {
  const { onChange, className, value } = props;

  const handleChange = (e) => {
    const { target: { value } } = e;
    onChange(value);
  };

  return (
    <input type="text" placeholder="Enter a video link to begin" onChange={handleChange} className={className} value={value} />
  );
}

export default Input;
