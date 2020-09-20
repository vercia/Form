import React from 'react';

const Input = (props) => {
  return (
      <input
        type={props.type}
        value={props.value}
        onChange={props.set}
        placeholder={props.placeholder}
        required
      /> 
  );
};

export default Input;
