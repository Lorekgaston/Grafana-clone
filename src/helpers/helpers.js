export const setActiveAlarmCount = (list, key, val) => {
  const filteredList = list.filter(
    (obj) => obj[key] !== val
  );
  return Number(filteredList.length);
};
