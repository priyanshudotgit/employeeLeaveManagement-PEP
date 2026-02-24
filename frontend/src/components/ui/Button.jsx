const Button = ({ children, variant = 'primary', className = '', ...props }) => {
    const baseStyle = "px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-emerald-500 hover:bg-emerald-600 text-white shadow-md shadow-emerald-500/20",
        secondary: "bg-charcoal-200 hover:bg-charcoal-300 dark:bg-charcoal-800 dark:hover:bg-charcoal-700 text-charcoal-900 dark:text-charcoal-50",
        danger: "bg-red-500 hover:bg-red-600 text-white shadow-md shadow-red-500/20",
        outline: "border-2 border-charcoal-200 dark:border-charcoal-700 hover:bg-charcoal-100 dark:hover:bg-charcoal-800"
    };

    return (
        <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
            {children}
        </button>
    );
};
export default Button;
