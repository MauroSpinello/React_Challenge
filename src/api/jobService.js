import { responseCandidateDTO } from './candidateDTOs';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const EMAIL = import.meta.env.VITE_EMAIL;

export const fetchCandidate = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/candidate/get-by-email?email=${EMAIL}`);
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Error al obtener el candidato');
    }
    const data = await res.json();
    return responseCandidateDTO(data);
  } catch (error) {
    console.error('[fetchCandidate]', error);
    throw error;
  }
};

export const fetchJobs = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/jobs/get-list`);
    if (!res.ok) {
      throw new Error('Error al obtener las posiciones');
    }
    return res.json();
  } catch (error) {
    console.error('[fetchJobs]', error);
    throw error;
  }
};

export const applyToJob = async (payload) => {
  try {
    const res = await fetch(`${BASE_URL}/api/candidate/apply-to-job`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Error al enviar la postulación');
    }
    return res.json();
  } catch (error) {
    console.error('[applyToJob]', error);
    throw error;
  }
};