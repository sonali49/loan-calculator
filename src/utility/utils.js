export const numbersOnly = (val) => {
  const checkNum = /^[0-9\b]+$/;
  return checkNum.test(val);
};
