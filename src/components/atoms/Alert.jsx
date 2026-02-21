export const Alert = ({ message, type = 'danger' }) => {
  if (!message) return null;

  return (
    <div
      role="alert"
      style={{
        position: 'fixed',
        top: '1.5rem',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9999,
        minWidth: '300px',
        maxWidth: '90vw',
      }}
      className={`alert alert-${type} shadow border-0 p-3 text-center`}
    >
      {message}
    </div>
  );
};