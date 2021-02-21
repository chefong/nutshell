import React from 'react';
import './Button.less';
import { Button as RSuiteButton } from 'rsuite';
import clsx from 'clsx';

function Button(props) {
  const { appearance, onClick, children, className, loading, disabled } = props;

  const handleClick = () => {
    if (typeof onClick === 'function') onClick();
  };

  return (
    <RSuiteButton
      loading={loading}
      disabled={disabled}
      appearance={appearance}
      onClick={handleClick}
      className={clsx('Button', className)}
    >
      {children}
    </RSuiteButton>
  )
}

export default Button;
