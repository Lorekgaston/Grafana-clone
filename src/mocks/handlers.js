import { rest } from 'msw';
import { v4 } from 'uuid';

import {
  handleSetItemToStorage,
  handleGetItemFromStorage,
} from '../helpers/helpers';

const URL = process.env.REACT_APP_FAKE_SERVER_URL;
const randomBool = () => Math.random() > 0.5;

const fakeData = [
  {
    _id: v4(),
    name: 'My Alarm',
    source: 'server 1',
    metric: 'Memory usage',
    trigger: 20,
    firing: randomBool(),
    paused: true,
    metricValue: 80,
  },
  {
    _id: v4(),
    name: 'Your Alarm',
    source: 'server 2',
    metric: 'FS usage',
    trigger: 80,
    paused: false,
    firing: randomBool(),
    metricValue: 55,
  },
  {
    _id: v4(),
    name: 'Our Alarm',
    source: 'server 3',
    metric: 'CPU usage',
    trigger: 60,
    paused: false,
    firing: randomBool(),
    metricValue: 80,
  },
  {
    _id: v4(),
    name: 'new Alarm',
    source: 'server 4',
    metric: 'CPU usage',
    trigger: 30,
    paused: true,
    firing: randomBool(),
    metricValue: 80,
  },
];

sessionStorage.setItem(
  'alarmList',
  JSON.stringify(fakeData)
);

export const handlers = [
  // Get Alarms List
  rest.get(`${URL}/alarms`, (req, res, ctx) => {
    const list = handleGetItemFromStorage('alarmList');
    const newList = list.map((alarm) => {
      alarm.firing = randomBool();
      if (alarm.firing) {
        alarm.paused = true;
      }
      return alarm;
    });
    handleSetItemToStorage('alarmList', list);
    console.log(newList, list);

    return res(ctx.delay(), ctx.json(list));
  }),
  // Get active/nonPaused alarms count
  rest.get(`${URL}/alarms/count`, (req, res, ctx) => {
    const list = handleGetItemFromStorage('alarmList');
    const count = list.filter((obj) => obj.paused !== true);
    return res(ctx.json(Number(count.length)));
  }),
  // update Alarm
  rest.put(`${URL}/alarms`, (req, res, ctx) => {
    const updateList = req.body;
    console.log(updateList);
    handleSetItemToStorage('alarmList', updateList);
    return res(ctx.json(`user succesfully updated`));
  }),
  // delete Alarm
  rest.delete(`${URL}/alarms`, (req, res, ctx) => {
    const id = req.url.searchParams.get('id');
    const list = handleGetItemFromStorage('alarmList');

    const filteredList = list.filter(
      (obj) => obj._id !== id
    );
    console.log(filteredList, 'delete');
    handleSetItemToStorage('alarmList', filteredList);
    return res(ctx.json(`Alarm succesfully deleted`));
  }),
  // Create new Alarm
  rest.post(`${URL}/alarms`, (req, res, ctx) => {
    const newAlarm = req.body;
    const list = handleGetItemFromStorage('alarmList');
    handleSetItemToStorage('alarmList', [
      ...list,
      newAlarm,
    ]);
    return res(ctx.json('successfully added a new alarm'));
  }),
  // Filter Alarm by Status Active or Pause
  rest.get(`${URL}/filter`, (req, res, ctx) => {
    const key = req.url.searchParams.get('status');
    const list = handleGetItemFromStorage('alarmList');
    const filteredData = list.filter(
      (obj) => !obj.paused === Boolean(key)
    );
    return res(ctx.delay(500), ctx.json(filteredData));
  }),

  // Search Alarm by name
  rest.get(`${URL}/search`, (req, res, ctx) => {
    const name = req.url.searchParams.get('name');
    const list = handleGetItemFromStorage('alarmList');
    const filteredData = list.filter((obj) =>
      obj.name.toLowerCase().includes(name.toLowerCase())
    );

    return res(ctx.delay(500), ctx.json(filteredData));
  }),
];
