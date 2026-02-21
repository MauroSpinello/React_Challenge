import { Input } from '../atoms/Input';
import { Button } from '../atoms/Button';

export const JobActionForm = ({ repoUrl, onUrlChange, onSubmit, isLoading, error }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form className="d-flex flex-column gap-1 w-100" onSubmit={handleSubmit}>
      <div className="d-flex flex-column flex-md-row gap-2 w-100">
        <div className="flex-grow-1">
          <Input
            placeholder="https://github.com/tu-usuario/tu-repo"
            value={repoUrl}
            onChange={onUrlChange}
            disabled={isLoading}
          />
        </div>
        <div style={{ minWidth: '140px' }}>
          <Button type="submit" isLoading={isLoading}>
            Submit
          </Button>
        </div>
      </div>
      {error && (
        <small className="text-danger">{error}</small>
      )}
    </form>
  );
};