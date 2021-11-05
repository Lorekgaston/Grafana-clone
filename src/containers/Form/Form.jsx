import React, { useEffect, useState } from 'react';

import { Box } from '@mui/system';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { v4 } from 'uuid';
import axios from 'axios';

import { useGlobalState } from '../../context/alarmscontext';
import {
  getIndex,
  handleObject,
  triggers,
} from '../../helpers/helpers';
import {
  toastError,
  toastPending,
} from '../../helpers/toasts';

import TextInput from '../../components/TextInput/TextInput';
import SelectInput from '../../components/SelectInput/SelectInput';

const metricsList = [
  'CPU usage',
  'Memory usage',
  'FS usage',
];
const sourceList = [
  'server 5',
  'server 6',
  'server 7',
  'server 8',
  'server 9',
  'server 10',
];

const URL = process.env.REACT_APP_FAKE_SERVER_URL;

function Form() {
  const [state, setState] = useGlobalState();
  const [formState, setFormState] = useState({
    name: '',
    source: '',
    metric: '',
    trigger: '',
  });

  const changeHandler = (evt) => {
    const { name, value } = evt.target;
    const input = { ...formState[name] };

    input.value = value;

    setFormState({ ...formState, [name]: input });
  };

  const updateAlarmHandler = (udatedAlarm) => {
    let copiedList = [...state.alarms];
    const alarmIndex = getIndex(
      copiedList,
      '_id',
      udatedAlarm._id
    );
    copiedList[alarmIndex] = {
      ...udatedAlarm,
    };
    toastPending('Updating Alarm, Please Wait...');
    handleUpdateAlarm(copiedList);
  };

  const submitHandler = (evt) => {
    evt.preventDefault();

    if (!state.isEditing) {
      addAlarmHandler(handleObject(formState));
    } else {
      updateAlarmHandler(handleObject(formState));
    }
  };

  const handleUpdateAlarm = async (updatedList) => {
    try {
      await axios.put(`${URL}/alarms`, updatedList);
      setTimeout(
        () =>
          setState({
            ...state,
            alarms: updatedList,
            isFormOpen: false,
            isEditing: false,
            currentEditingAlarm: {},
          }),
        2100
      );
    } catch (err) {
      closeFormHandler();
      toastError(`Error, Could not update alarm`);
    }
  };

  const addAlarmHandler = async (newAlarm) => {
    toastPending('Adding a new Alarm, Please wait...');
    try {
      await axios.post(`${URL}/alarms`, newAlarm);
      setTimeout(
        () =>
          setState({
            ...state,
            alarms: [...state.alarms, newAlarm],
            activeAlarmsCount: state.activeAlarmsCount + 1,
            isFormOpen: false,
            isEditing: false,
            currentEditingAlarm: {},
          }),
        2100
      );
    } catch (err) {
      closeFormHandler();
      toastError(`Error, Could not add new alarm`);
    }
  };

  const closeFormHandler = () => {
    setState({
      ...state,
      isFormOpen: false,
      isEditing: false,
      currentEditingAlarm: {},
    });
  };

  const openFormHandler = () => {
    let updatedAlarm = { ...state.currentEditingAlarm };
    if (state.isEditing) {
      return setFormState(updatedAlarm);
    } else {
      return setFormState({
        _id: v4(),
        name: {},
        source: {},
        metric: '',
        trigger: 0,
        paused: false,
        firing: false,
        metricValue: 0,
      });
    }
  };
  useEffect(
    () => openFormHandler(),
    [state.isFormOpen, state.isEditing]
  );

  return (
    <Dialog open={state.isFormOpen}>
      <DialogTitle>Create Alarm</DialogTitle>
      <DialogContent
        sx={{
          pl: 6,
          pr: 6,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box component='form' autoComplete='off'>
          <TextInput
            handleChandge={changeHandler}
            name='name'
            label='Alarm Name'
            value={formState.name.value}
          />
          <SelectInput
            handleChange={changeHandler}
            name='source'
            label='Metric Source'
            value={formState.source.value}
            options={sourceList}
          />
          <SelectInput
            handleChange={changeHandler}
            name='metric'
            label='Metric Type'
            value={formState.metric.value}
            options={metricsList}
          />
          <SelectInput
            handleChange={changeHandler}
            name='trigger'
            label='Trigger percentage'
            value={formState.trigger.value}
            options={triggers()}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={closeFormHandler}
          color='warning'
          variant='outlined'
        >
          Cancel
        </Button>
        <Button
          onClick={(e) => submitHandler(e)}
          color='warning'
          variant='outlined'
        >
          {state.isEditing ? 'Edit' : 'Add'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Form;
