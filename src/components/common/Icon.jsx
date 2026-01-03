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

    // <div className="w-10 h-10 bg-gradient-to-br from-[var(--accent-primary)] to-[#ff8a42] rounded-xl flex items-center justify-center shadow-[0_3px_0_#c75014] text-white font-black italic transition-transform active:scale-90">
    //       FS
    // </div>
  )
}

export default Icon;
