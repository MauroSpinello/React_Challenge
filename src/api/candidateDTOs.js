
export const responseCandidateDTO = (data) => ({
    uuid: data.uuid,
    candidateId: data.candidateId,
    applicationId: data.applicationId,
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
});


export const requestApplyJobDTO = (candidate, jobId, repoUrl) => ({
    uuid: candidate.uuid,
    jobId,
    candidateId: candidate.candidateId,
    repoUrl,
    applicationId: candidate.applicationId,
});
