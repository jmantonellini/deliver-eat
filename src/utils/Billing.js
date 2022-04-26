export const calculatePrice = (distance = 0) => {
  return ((distance / 100) * 5).toFixed(2);
};
