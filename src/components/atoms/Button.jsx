
export const Button = ({ children, onClick, className = '', type = 'button', isLoading }) => {
  return (
    <button
      type={type}
      className={`btn text-white w-100 ${className}`}
      style={{ backgroundColor: '#1E3A8A', borderColor: '#1E3A8A' }}
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading ? <span className="spinner-border spinner-border-sm" role="status" /> : children}
    </button>
  );
};