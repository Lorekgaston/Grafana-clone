export const setActiveAlarmCount = (list, key, val) => {
  const filteredList = list.filter(
    (obj) => obj[key] !== val
  );
  return Number(filteredList.length);
};

export const triggers = () => {
  const array = [];
  for (let i = 0; i < 100; i++) {
    array.push(`${i}`);
  }
  return array;
};

export const getIndex = (list, key, val) =>
  list.findIndex((obj) => obj[key] === val);

export const handleObject = (stateObj) => {
  let completedForm = { ...stateObj };
  let alarmObj = {};
  for (let values in stateObj) {
    if (completedForm[values].value) {
      Object.assign(alarmObj, {
        [values]: completedForm[values].value,
      });
    }
  }
  completedForm = { ...completedForm, ...alarmObj };
  return completedForm;
};

export const handleGetItemFromStorage = (item) =>
  JSON.parse(sessionStorage.getItem(item));

export const handleSetItemToStorage = (item, data) =>
  sessionStorage.setItem(item, JSON.stringify(data));
