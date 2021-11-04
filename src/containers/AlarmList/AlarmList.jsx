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
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

import Alarm from '../../components/Alarm/Alarm';
import useAlarmList from '../../hooks/useAlarmList';
import Loader from '../../components/Loader/Loader';
import AddButton from '../../components/AddButton/AddButton';

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
    handleApiAction({
      message: "Error has ocurred, Can't pause Alarm",
      filteredList: copiedList,
      count: setActiveAlarmCount(
        copiedList,
        'paused',
        true
      ),
      method: 'put',
      endpoint: `/alarms`,
    });
  };
  const deleteAlarmHandler = (id) => {
    const copiedList = [...state.alarms];
    const filteredList = copiedList.filter(
      (alarm) => alarm._id !== id
    );
    toastPending('Deleting Alarm, Please Wait..');
    handleApiAction({
      message: "Error has ocurred, Can't delete Alarm",
      filteredList,
      count: setActiveAlarmCount(
        filteredList,
        'paused',
        true
      ),
      method: 'delete',
      endpoint: `/alarms?id=${id}`,
    });
  };

  const handleApiAction = async ({
    message,
    filteredList,
    count,
    method,
    endpoint,
  }) => {
    try {
      await axios(
        `${process.env.REACT_APP_FAKE_SERVER_URL}${endpoint}`,
        {
          method: method,
          data: filteredList,
        }
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
    } catch (err) {
      toastError(message);
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
      <AddButton />
      <ToastContainer limit={2} />
    </>
  );
};

export default AlarmList;
