import React, { forwardRef, useId } from 'react';

const Input = forwardRef(function Input({
    label,
    type = "text",
    name,
    className = "",
    ...props
}, ref) {
    const id = useId();

    return (
        <div className="w-full">
            {label && (
                <label 
                    className='mb-2 inline-block text-[var(--text-strong)] pl-1 font-bold text-sm tracking-tight' 
                    htmlFor={id}
                >
                    {label}
                </label>
            )}

            <input 
                type={type} 
                name={name} 
                ref={ref} 
                id={id} 
                className={`
                    w-full px-4 py-3 rounded-[var(--radius)] border text-sm outline-none transition-all
                    
                    /* Theme Colors */
                    bg-slate-200 dark:bg-[#1f1f1f]
                    text-[var(--text-strong)] 
                    placeholder:text-[var(--text-soft)]
                    
                    /* Border & Tactile Shadow */
                    border-[var(--bg-deep)] dark:border-white/10
                    shadow-sm
                    
                    /* Focus State - Retro Focus Glow */
                    focus:border-[var(--accent-focus)] 
                    focus:ring-4 focus:ring-[var(--accent-focus)]/10
                    focus:shadow-[0_4px_12px_rgba(58,141,255,0.15)]

                    /* Specific styling for file inputs */
                    file:mr-4 file:py-1 file:px-3
                    file:rounded-md file:border-0
                    file:text-xs file:font-black
                    file:bg-[var(--bg-deep)] file:text-[var(--text-strong)]
                    file:cursor-pointer hover:file:bg-[var(--accent-primary)]
                    file:transition-colors file:uppercase

                    ${className}
                `} 
                {...props} 
            />
        </div>
    );
});

export default Input;