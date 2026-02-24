import { forwardRef } from 'react';

const Input = forwardRef(({ label, error, className = '', ...props }, ref) => {
    return (
        <div className="flex flex-col gap-1.5 w-full">
            {label && <label className="text-sm font-medium text-charcoal-700 dark:text-charcoal-300">{label}</label>}
            <input
                ref={ref}
                className={`px-4 py-2.5 rounded-lg border bg-white dark:bg-charcoal-950 text-charcoal-900 dark:text-charcoal-50 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500/50 ${error ? 'border-red-500' : 'border-charcoal-200 dark:border-charcoal-800 hover:border-charcoal-300 dark:hover:border-charcoal-700'
                    } ${className}`}
                {...props}
            />
            {error && <span className="text-xs text-red-500">{error}</span>}
        </div>
    );
});

Input.displayName = 'Input';
export default Input;
