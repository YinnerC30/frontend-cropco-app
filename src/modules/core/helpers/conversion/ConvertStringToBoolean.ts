export const ConvertStringToBoolean = (value: string): Boolean => {
  if (value === undefined) return false;
  if (value === "true") return true;
  if (value === "false") return false;
  return true;
};
