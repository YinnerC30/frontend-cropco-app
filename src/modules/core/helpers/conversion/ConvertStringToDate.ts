export const ConvertStringToDate = (date: string) => {
  if (!date) return undefined;
  return new Date(`${date}T00:00:00-05:00`);
};
