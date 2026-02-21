import { Heading } from '../components/atoms/Heading';
import { Button } from '../components/atoms/Button';
import { JobCard } from '../components/molecules/JobCard';


export const JobBoardPage = ({ jobs, candidate, onRefresh, onApply, isLoading }) => {
  return (
    <div className="min-vh-100 py-5" style={{ backgroundColor: '#F8F9FA' }}>
      <div className="container" style={{ maxWidth: '1000px' }}>

        <header className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
          <div>
            <Heading text="Posiciones Abiertas" />
            {candidate && (
              <p className="text-muted mb-0">
                Bienvenido, {candidate.firstName} {candidate.lastName}
              </p>
            )}
          </div>
          <div style={{ minWidth: '200px' }}>
            <Button onClick={onRefresh} className="py-2" isLoading={isLoading}>
              Actualizar Lista
            </Button>
          </div>
        </header>

        <main className="d-flex flex-column gap-2">
          {jobs.map((job) => (
            <JobCard
              key={job.id}
              jobId={job.id}
              title={job.title}
              onApply={onApply}
              isRefreshing={isLoading}
            />
          ))}
        </main>

      </div>
    </div>
  );
};