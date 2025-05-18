export const formatSeason = (startDate, endDate) => {
  const startYear = new Date(startDate).getFullYear();
  const endYear = new Date(endDate).getFullYear();
  return `${startYear}/${endYear}`;
};
