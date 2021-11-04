import React, { useEffect, useState } from 'react';

import { Box } from '@mui/system';
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';

import { useGlobalState } from '../../context/alarmscontext';
import { setActiveAlarmCount } from '../../helpers/helpers';
import { ToastContainer } from 'react-toastify';
import {
  toastPending,
  toastError,
} from '../../helpers/toasts';
import 'react-toastify/dist/ReactToastify.css';

import Alarm from '../../components/Alarm/Alarm';
import useAlarmList from '../../hooks/useAlarmList';
import Loader from '../../components/Loader/Loader';
import axios from 'axios';

const tableHead = [
  'Name',
  'Source',
  'Metric',
  'Trigger',
  'Status',
  '',
];
const styledTableHead = {
  display: 'grid',
  gridTemplateColumns: 'repeat(5, 217px) auto',
};
const StyledDivider = {
  bgcolor: '#7b8088',
};

const URL = process.env.REACT_APP_FAKE_SERVER_URL;

const AlarmList = () => {
  const [url, setUrl] = useState('');
  const [state, setState] = useGlobalState();
  const [isLoading] = useAlarmList(url);

  const pausedAlarmHandler = (id) => {
    let copiedList = [...state.alarms];
    const alarmIndex = state.alarms.findIndex(
      (obj) => obj._id === id
    );
    copiedList[alarmIndex] = {
      ...copiedList[alarmIndex],
      paused: !copiedList[alarmIndex].paused,
    };
    toastPending(
      `${
        !copiedList[alarmIndex].paused
          ? 'Pausing'
          : 'Activating'
      } Alarm, Please Wait..`
    );
    pauseAlarm(
      copiedList,
      setActiveAlarmCount(copiedList, true)
    );
  };
  const deleteAlarmHandler = (id) => {
    const copiedList = [...state.alarms];
    const filteredList = copiedList.filter(
      (alarm) => alarm._id !== id
    );
    toastPending('Deleting Alarm, Please Wait..');
    deleteAlarm(
      id,
      filteredList,
      setActiveAlarmCount(filteredList, true)
    );
  };

  const deleteAlarm = async (id, filteredList, count) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_FAKE_SERVER_URL}/alarms?id=${id}`
      );
      setTimeout(
        () =>
          setState({
            ...state,
            alarms: filteredList,
            activeAlarmsCount: count,
          }),
        2100
      );
    } catch (error) {
      toastError('Error could not delete alarm!');
    }
  };

  const pauseAlarm = async (updatedList, newCount) => {
    try {
      await axios.put(`${URL}/alarms`, updatedList);
      setTimeout(
        () =>
          setState({
            ...state,
            alarms: updatedList,
            activeAlarmsCount: newCount,
          }),
        2100
      );
    } catch (error) {
      toastError('Error could not delete alarm!');
    }
  };

  useEffect(() => setUrl('alarms'), []);
  return (
    <>
      <Box component='section'>
        <ListItem sx={styledTableHead}>
          {tableHead.map((item, idx) => (
            <ListItemText key={idx}>
              <Typography variant='h6'>{item}</Typography>
            </ListItemText>
          ))}
        </ListItem>
      </Box>
      <Divider sx={StyledDivider} variant='fullWidth' />
      {isLoading ? (
        <Loader />
      ) : (
        <Box component='section'>
          <List>
            {state.alarms.map(({ _id, ...rest }, idx) => (
              <Alarm
                key={idx}
                id={_id}
                {...rest}
                handlePause={pausedAlarmHandler}
                handleDelete={deleteAlarmHandler}
              />
            ))}
          </List>
        </Box>
      )}
      <ToastContainer limit={2} />
    </>
  );
};

export default AlarmList;
