'use client';

/**
 * LoadingButton Component
 * Displays loading state and prevents multiple clicks
 */
export default function LoadingButton({
  children,
  loading = false,
  loadingText = 'Loading...',
  disabled = false,
  onClick,
  className = '',
  variant = 'primary',
  type = 'button',
  ...props
}) {
  const baseStyles = 'px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-widest transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95';
  
  const variants = {
    primary: 'bg-white text-black hover:bg-emerald-400',
    secondary: 'bg-gray-800 text-white border border-white/10 hover:bg-gray-700',
    danger: 'bg-red-500 text-white hover:bg-red-600',
    success: 'bg-emerald-500 text-white hover:bg-emerald-600',
  };

  return (
    <button
      type={type}
      disabled={loading || disabled}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
          {loadingText}
        </span>
      ) : (
        children
      )}
    </button>
  );
}
