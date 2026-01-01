const Button = ({
    type = "button",
    className = "",
    btnP = false,
    btnD = false,
    btnG = false,
    children,
    ...props
}) => {
    const baseClasses = "btn font-semibold px-3.5 py-2.5 rounded-lg inline-flex items-center gap-2 text-black dark:text-white transition-all justify-center";

    const getVariant = () => {
        if (btnP) return "bg-[var(--accent-primary)] text-white shadow-[0_4px_0_#c75014] active:shadow-none active:translate-y-1";
        if (btnD) return "bg-red-600 text-white shadow-[0_4px_0_#991b1b] active:shadow-none active:translate-y-1";
        if (btnG) return "border border-black/10 dark:border-white/20 text-black dark:text-white bg-transparent hover:bg-black/5";
        return "";
    };

    return (
        <button
            type={type}
            className={`${baseClasses} ${getVariant()} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;