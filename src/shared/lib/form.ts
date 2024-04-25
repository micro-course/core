export const parseIntForm = (str: string) => {
  if (str === "") {
    return undefined;
  }
  return parseInt(str, 10);
};

export const parseFloatForm = (str: string) => {
  if (str === "") {
    return undefined;
  }
  return parseFloat(str);
};
