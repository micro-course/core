export const parseIntOrDefault = <T>(
  value: string,
  defaultValue: T,
): number | T => {
  const result = parseInt(value);
  return isNaN(result) ? defaultValue : result;
};

export const parseFloatOrDefault = <T>(
  value: string,
  defaultValue: T,
): number | T => {
  const result = parseFloat(value);
  return isNaN(result) ? defaultValue : result;
};
