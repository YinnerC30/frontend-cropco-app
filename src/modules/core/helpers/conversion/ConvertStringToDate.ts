export const ConvertStringToDate = (date: string) => {
  return new Date(`${date}T00:00:00-05:00`);
};
