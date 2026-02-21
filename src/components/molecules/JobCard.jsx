import { useState } from 'react';
import { JobActionForm } from '../molecules/JobActionForm';

export const JobCard = ({ jobId, title, onApply, isRefreshing }) => {
  const [repoUrl, setRepoUrl] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    if (!repoUrl.trim()) {
      setError('Por favor, ingresá la URL del repositorio.');
      return;
    }
    try {
      new URL(repoUrl);
    } catch {
      setError('Por favor, ingresá una URL válida (ej: https://github.com/user/repo).');
      return;
    }
    setError('');
    onApply(jobId, repoUrl);
    setRepoUrl('');
  };


  const handleUrlChange = (e) => {
    setRepoUrl(e.target.value);
    if (error) setError('');
  };

  return (
    <div className="card border-0 shadow-sm mb-3">
      <div className="card-body p-4 d-flex flex-column flex-lg-row align-items-lg-center justify-content-between gap-3">
        <div className="flex-grow-1">
          <h4 className="card-title fw-normal mb-0" style={{ color: '#334155' }}>
            {title}
          </h4>
        </div>

        <div className="w-100" style={{ maxWidth: '600px' }}>
          <JobActionForm
            repoUrl={repoUrl}
            onUrlChange={handleUrlChange}
            onSubmit={handleSubmit}
            isLoading={isSubmitting || isRefreshing}
            error={error}
          />
        </div>

      </div>
    </div>
  );
};
