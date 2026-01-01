import React from 'react';

const Icon = ({
    size=8,
    className,
    textColor,
    bgColor,
    children,
    ...props
}) => {

  return (
    <div className={`w-${size} h-${size} rounded-lg grid place-items-center font-extrabold ${textColor} ${bgColor} ${className}`} {...props}>
        {children}
    </div>
  )
}

export default Icon;
