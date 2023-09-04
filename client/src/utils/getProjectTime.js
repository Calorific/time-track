export const getProjectTime = records => records?.reduce((total, r) => total + (r.timeSpent * !r.isDeleting), 0) || 0
