import { JobCard } from '../molecules/JobCard';


export const JobList = ({ jobs, onApply, applyingJobId }) => {
  if (!jobs || jobs.length === 0) {
    return <p className="text-center text-muted mt-4">No hay posiciones abiertas en este momento.</p>;
  }

  return (
    <div className="mt-4">
      <h3 className="fw-light mb-4">Posiciones Abiertas</h3>
      {jobs.map((job) => (
        <JobCard 
          key={job.id} 
          job={job} 
          onApply={onApply} 
          isApplying={applyingJobId === job.id} 
        />
      ))}
    </div>
  );
};