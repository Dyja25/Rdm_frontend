//calculate percentage by current and prev value
export const calculatePercentage = (current, prev) => {

  const value = ((current - prev) / prev) * 100;
  if (isNaN(value)) {
    return 0;
  } else if (value === Infinity) {
    return 0;
  } else {
    return value;
  }
};

export function elipsize(str, maxLn = 30) {
  if (!str) return "";
  if (str.length <= maxLn) return str;
  return `${str.slice(0, maxLn)}...`;
}
