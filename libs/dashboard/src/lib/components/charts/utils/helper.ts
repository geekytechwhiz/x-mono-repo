export const addEllipsis = (text: string, maxLength: number) => {
  if (text.length > maxLength) {
    return `${text.slice(0, maxLength - 3)}...`;
  }
  return text;
};

export const isTimestampKey = (keyName, timestampKeyArr) => {
  return timestampKeyArr?.includes(keyName);
};
export const getFormatedValue = (val) => {
  if (!isNaN(val) && val.toString().indexOf(".") !== -1) {
    return parseFloat(val).toFixed(2);
  } else {
    return val;
  }
};
export const isInteger = (value) => {
  if (typeof value === "number" && Number.isInteger(value)) {
    return true;
  } else {
    return false;
  }
};
