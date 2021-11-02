import React, {
  createContext,
  useState,
  useContext,
} from 'react';

const initialState = {
  alarms: [],
  totalAlarmsCount: '',
  activeAlarmsCount: '',
};

const useAlarmState = () => useState({ ...initialState });

const AlarmContext = createContext(null);

export const useGlobalState = () => {
  const value = useContext(AlarmContext);
  if (value === null) {
    throw new Error('Please add initialState');
  }
  return value;
};

export const GlobalStateProvider = ({ children }) => (
  <AlarmContext.Provider value={useAlarmState()}>
    {children}
  </AlarmContext.Provider>
);
