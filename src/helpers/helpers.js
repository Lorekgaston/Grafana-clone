export const setActiveAlarmCount = (list, val) => {
  const filteredList = list.filter(
    (obj) => obj.paused === val
  );
  return filteredList.length;
};
