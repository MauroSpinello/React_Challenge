import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { JobBoardPage } from './pages/JobBoardPage';
import { fetchCandidate, fetchJobs, applyToJob } from './api/jobService';
import { requestApplyJobDTO } from './api/candidateDTOs';
import { Button } from './components/atoms/Button';
import { Alert } from './components/atoms/Alert';

const App = () => {
  const [candidate, setCandidate] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({ message: null, type: 'danger' });

  useEffect(() => {
    if (!notification.message) return;
    const timer = setTimeout(() => setNotification({ message: null, type: 'danger' }), 2000);
    return () => clearTimeout(timer);
  }, [notification]);

  const setError = (message) => setNotification({ message, type: 'danger' });
  const setSuccess = (message) => setNotification({ message, type: 'success' });

  const handleFetchCandidate = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const candidateData = await fetchCandidate();
      setCandidate(candidateData);

      const jobsData = await fetchJobs();
      setJobs(jobsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleFetchCandidate();
  }, []);

  const handleApply = async (jobId, repoUrl) => {
    if (!candidate) return;

    setError(null);
    try {
      const data = await applyToJob(requestApplyJobDTO(candidate, jobId, repoUrl));

      if (data.ok) {
        setSuccess('Postulación enviada con éxito!');
      }
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return (
    <div className="bg-light min-vh-100 font-sans">
      <Alert message={notification.message} type={notification.type} />

      {!candidate ? (
        <div className="container py-5">
          <div className="row justify-content-center mt-5">
            <div className="col-12 col-md-6 col-lg-5">
              <div className="card border-0 shadow-sm p-5 text-center bg-white rounded-4">
                {isLoading ? (
                  <div className="py-4">
                    <span className="spinner-border text-primary" role="status" />
                    <p className="mt-3 text-muted mb-0">Cargando perfil...</p>
                  </div>
                ) : (
                  <>
                    <div className="text-secondary mb-4 opacity-50">
                      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                        <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
                      </svg>
                    </div>
                    <h4 className="fw-normal mb-3" style={{ color: '#334155' }}>No se pudo cargar el perfil</h4>
                    <p className="text-muted mb-4 small">
                      Hubo un problema al obtener tu información. Por favor, verificá tu conexión o intentá nuevamente.
                    </p>
                    <div className="d-flex justify-content-center">
                      <div style={{ width: '160px' }}>
                        <Button onClick={handleFetchCandidate} className="py-2">
                          Reintentar
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <JobBoardPage
          jobs={jobs}
          candidate={candidate}
          onRefresh={handleFetchCandidate}
          onApply={handleApply}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default App;